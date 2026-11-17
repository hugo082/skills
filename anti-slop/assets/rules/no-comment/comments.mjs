#!/usr/bin/env node
import { spawnSync } from "node:child_process";
import { existsSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { createRequire } from "node:module";
import { tmpdir } from "node:os";
import { dirname, join, matchesGlob, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const USAGE = `Usage: comments.mjs [scope] [mode] [options]

Prints one line per comment group, grouped by file: line, kind, owner symbol,
prose line count, text. The lint rule with addedSince is the gate; this script
is the inventory and the cleanup.

Scope (one):
  --diff <ref>     Comments on lines added since the merge base of <ref> and HEAD,
                   including uncommitted and untracked files.
  <path>...        Every comment under these paths.

Mode:
  --fix            Delete rejected comments under <path>... (not with --diff).

Options:
  --all                Also list directives and license headers in the inventory.
  --options <json>     no-comments rule options, e.g. '{"markers":["SAFETY"],"maxJsdocLines":3}'.
  --ignore <glob>      Ignore pattern, repeatable.
  --width <n>          Truncate comment text to n characters (default 160).
  --oxlint <bin>       Oxlint binary. Defaults to OXLINT_BIN, then oxlint or vite-plus from the repository.`;

const PLUGIN_DIR = resolve(dirname(fileURLToPath(import.meta.url)), "../..");
const HIDDEN_BY_DEFAULT = new Set(["directive", "license"]);
const SOURCE = /\.(?:[cm]?[jt]sx?|vue|svelte|astro)$/u;

function parseArguments(argv) {
  const parsed = {
    paths: [],
    ignores: [],
    width: 160,
    all: false,
    fix: false,
  };
  for (let index = 0; index < argv.length; index++) {
    const argument = argv[index];
    const value = () => {
      const next = argv[++index];
      if (next === undefined) fail(`${argument} needs a value`);
      return next;
    };
    if (argument === "--diff") parsed.diff = value();
    else if (argument === "--fix") parsed.fix = true;
    else if (argument === "--all") parsed.all = true;
    else if (argument === "--options") parsed.options = JSON.parse(value());
    else if (argument === "--ignore") parsed.ignores.push(value());
    else if (argument === "--width") parsed.width = Number(value());
    else if (argument === "--oxlint") parsed.oxlint = value();
    else if (argument === "--help" || argument === "-h") {
      console.log(USAGE);
      process.exit(0);
    } else if (argument.startsWith("--")) fail(`unknown option ${argument}`);
    else parsed.paths.push(argument);
  }
  if ((parsed.diff !== undefined) === parsed.paths.length > 0)
    fail("give exactly one scope: --diff <ref> or paths");
  if (parsed.fix && parsed.paths.length === 0) fail("--fix takes paths, not --diff");
  return parsed;
}

function fail(message) {
  console.error(`comments.mjs: ${message}\n\n${USAGE}`);
  process.exit(2);
}

function git(root, args) {
  const result = spawnSync("git", args, { cwd: root, encoding: "utf8", maxBuffer: 1 << 30 });
  if (result.status !== 0) fail(`git ${args.join(" ")} failed: ${result.stderr.trim()}`);
  return result.stdout;
}

function resolveOxlint(root, explicit) {
  const candidate = explicit ?? process.env.OXLINT_BIN;
  if (candidate) return resolve(root, candidate);
  const fromRoot = createRequire(join(root, "package.json"));
  for (const resolveFrom of [fromRoot, viaPackage(fromRoot, "vite-plus")]) {
    if (!resolveFrom) continue;
    try {
      return join(dirname(resolveFrom.resolve("oxlint/package.json")), "bin", "oxlint");
    } catch {}
  }
  fail("cannot find oxlint: install oxlint or vite-plus, or pass --oxlint <bin>");
}

function viaPackage(require, name) {
  try {
    return createRequire(require.resolve(`${name}/package.json`));
  } catch {
    return null;
  }
}

function addedLines(root, base, untracked) {
  const added = new Map();
  let file;
  for (const line of git(root, [
    "diff",
    "-U0",
    "--no-color",
    "--no-ext-diff",
    "--src-prefix=a/",
    "--dst-prefix=b/",
    base,
  ]).split("\n")) {
    if (line.startsWith("+++ ")) {
      file = line === "+++ /dev/null" ? undefined : line.slice(6);
      if (file) added.set(file, new Set());
      continue;
    }
    const hunk = /^@@ -\S+ \+(\d+)(?:,(\d+))? @@/u.exec(line);
    if (hunk && file) {
      const start = Number(hunk[1]);
      const count = hunk[2] === undefined ? 1 : Number(hunk[2]);
      for (let offset = 0; offset < count; offset++) added.get(file).add(start + offset);
    }
  }
  for (const path of untracked) {
    const count = readFileSync(join(root, path), "utf8").split("\n").length;
    added.set(path, new Set(Array.from({ length: count }, (_, index) => index + 1)));
  }
  return added;
}

function scopeOf(root, parsed) {
  if (parsed.paths.length > 0) return { files: parsed.paths, added: null };
  const base = git(root, ["merge-base", parsed.diff, "HEAD"]).trim();
  const untracked = git(root, ["ls-files", "--others", "--exclude-standard"])
    .split("\n")
    .filter((path) => SOURCE.test(path));
  const added = addedLines(root, base, untracked);
  const files = [...added.keys()].filter(
    (path) => SOURCE.test(path) && existsSync(join(root, path)),
  );
  return { files, added };
}

function runOxlint(root, parsed, files, inventory) {
  const directory = mkdtempSync(join(tmpdir(), "no-comments-"));
  const config = join(directory, "oxlintrc.json");
  const plugin = join(PLUGIN_DIR, "index.ts");
  const options = { ...parsed.options, ...(inventory ? { inventory: true } : {}) };
  writeFileSync(
    config,
    JSON.stringify({
      plugins: [],
      categories: { correctness: "off" },
      jsPlugins: [{ name: "anti-slop-overlay", specifier: plugin }],
      rules: { "anti-slop-overlay/no-comments": ["warn", options] },
      ignorePatterns: ["**/node_modules/**"],
    }),
  );
  const args = [resolveOxlint(root, parsed.oxlint), "-c", config, "--format", "json"];
  if (!inventory) args.push("--fix-suggestions");
  const result = spawnSync(process.execPath, [...args, ...files], {
    cwd: root,
    encoding: "utf8",
    maxBuffer: 1 << 30,
  });
  rmSync(directory, { recursive: true, force: true });
  const start = result.stdout.indexOf("{");
  if (start === -1)
    fail(`oxlint produced no report: ${result.stderr.trim() || result.stdout.trim()}`);
  const report = JSON.parse(result.stdout.slice(start));
  const fatal = report.diagnostics.filter(
    (diagnostic) => !diagnostic.code?.includes("no-comments"),
  );
  if (fatal.length > 0)
    fail(`oxlint failed: ${fatal.map((diagnostic) => diagnostic.message).join("; ")}`);
  return report.diagnostics;
}

function toEntries(diagnostics) {
  return diagnostics.map((diagnostic) => {
    const [kind, owner, lines, span, ...text] = diagnostic.message.split("\t");
    const line = diagnostic.labels[0]?.span.line ?? 1;
    return {
      file: diagnostic.filename,
      line,
      endLine: line + Number(span),
      kind,
      owner,
      lines: Number(lines),
      text: text.join("\t"),
    };
  });
}

function inScope(entry, added) {
  if (!added) return true;
  const lines = added.get(entry.file);
  if (!lines) return false;
  for (let line = entry.line; line <= entry.endLine; line++) if (lines.has(line)) return true;
  return false;
}

function truncate(text, width) {
  return text.length > width ? `${text.slice(0, width - 1)}…` : text;
}

function printInventory(entries, width) {
  const counts = new Map();
  for (const entry of entries) counts.set(entry.kind, (counts.get(entry.kind) ?? 0) + 1);
  const summary = [...counts]
    .sort((left, right) => right[1] - left[1])
    .map(([kind, count]) => `${kind} ${count}`);
  console.log(
    `${entries.length} comment groups${summary.length > 0 ? `: ${summary.join(", ")}` : ""}`,
  );
  let file;
  for (const entry of entries) {
    if (entry.file !== file) {
      file = entry.file;
      console.log(file);
    }
    const owner = entry.owner === "" ? "-" : entry.owner;
    console.log(
      `  ${entry.line} ${entry.kind} ${owner} ${entry.lines}L | ${truncate(entry.text, width)}`,
    );
  }
}

function main() {
  const parsed = parseArguments(process.argv.slice(2));
  const root = git(process.cwd(), ["rev-parse", "--show-toplevel"]).trim();
  const ignores = [`${relative(root, PLUGIN_DIR)}/**`, ...parsed.ignores];
  const ignored = (path) => ignores.some((pattern) => matchesGlob(path, pattern));
  const scope = scopeOf(root, parsed);
  const files = scope.added ? scope.files.filter((path) => !ignored(path)) : scope.files;
  const added = scope.added;

  if (parsed.fix) {
    runOxlint(root, parsed, files, false);
    console.log(
      "Deleted the rejected comments that oxlint could fix. Run the formatter, then the inventory again.",
    );
    return;
  }

  const entries =
    files.length === 0
      ? []
      : toEntries(runOxlint(root, parsed, files, true)).filter(
          (entry) => !ignored(entry.file) && inScope(entry, added),
        );
  entries.sort((left, right) => left.file.localeCompare(right.file) || left.line - right.line);

  printInventory(
    entries.filter((entry) => parsed.all || !HIDDEN_BY_DEFAULT.has(entry.kind)),
    parsed.width,
  );
}

main();
