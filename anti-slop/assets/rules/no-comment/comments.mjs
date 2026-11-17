#!/usr/bin/env node
import { spawnSync } from "node:child_process";
import { existsSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { createRequire } from "node:module";
import { tmpdir } from "node:os";
import { dirname, join, matchesGlob, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const USAGE = `Usage: comments.mjs [scope] [mode] [options]

Scope (one):
  --diff <ref>     Comments on lines added since the merge base of <ref> and HEAD,
                   including uncommitted and untracked files.
  --staged         Comments on lines added in the index.
  <path>...        Every comment under these paths.

Mode:
  (default)        Inventory: one line per comment group, grouped by file.
  --check          Exit 1 when the scope holds a rejected comment, or an added
                   directive that disables no-comments.
  --fix            Delete rejected comments under <path>... (not with --diff or --staged).

Options:
  --all                Also list directives and license headers in the inventory.
  --options <json>     no-comments rule options, e.g. '{"markers":["SAFETY"],"maxJsdocLines":3}'.
  --ignore <glob>      Ignore pattern, repeatable.
  --width <n>          Truncate comment text to n characters (default 160).
  --oxlint <bin>       Oxlint binary. Defaults to OXLINT_BIN, then oxlint or vite-plus from the repository.`;

const PLUGIN_DIR = resolve(dirname(fileURLToPath(import.meta.url)), "../..");
const ALLOWED = new Set(["directive", "jsdoc-public", "license", "marker"]);
const HIDDEN_BY_DEFAULT = new Set(["directive", "license"]);
const SOURCE = /\.(?:[cm]?[jt]sx?|vue|svelte|astro)$/u;
const DISABLES_NO_COMMENTS = /(?:eslint|oxlint)-disable(?:-next-line|-line)?(?:\s+([^*]*))?/u;
const GUIDANCE = {
  "in-body": "make the code say it (rename, extract, type); the reason goes in the commit or PR",
  module: "delete, or name an external constraint with a marker",
  banner: "delete; split the file or name the parts",
  "jsdoc-private": "JSDoc is for the public API only",
  "jsdoc-oversized": "shorten to the contract; rationale goes in the commit, PR or design docs",
};

function parseArguments(argv) {
  const parsed = {
    paths: [],
    ignores: [],
    width: 160,
    all: false,
    check: false,
    fix: false,
    staged: false,
  };
  for (let index = 0; index < argv.length; index++) {
    const argument = argv[index];
    const value = () => {
      const next = argv[++index];
      if (next === undefined) fail(`${argument} needs a value`);
      return next;
    };
    if (argument === "--diff") parsed.diff = value();
    else if (argument === "--staged") parsed.staged = true;
    else if (argument === "--check") parsed.check = true;
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
  const scopes = [parsed.diff !== undefined, parsed.staged, parsed.paths.length > 0].filter(
    Boolean,
  ).length;
  if (scopes !== 1) fail("give exactly one scope: --diff <ref>, --staged, or paths");
  if (parsed.fix && parsed.paths.length === 0) fail("--fix takes paths, not --diff or --staged");
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

function addedLines(root, diffArguments, untracked) {
  const added = new Map();
  let file;
  for (const line of git(root, [
    "diff",
    "-U0",
    "--no-color",
    "--no-ext-diff",
    ...diffArguments,
  ]).split("\n")) {
    if (line.startsWith("+++ ")) {
      file = line === "+++ /dev/null" ? undefined : line.slice(6);
      if (file) added.set(file, { lines: new Set(), text: [] });
      continue;
    }
    const hunk = /^@@ -\S+ \+(\d+)(?:,(\d+))? @@/u.exec(line);
    if (hunk && file) {
      const start = Number(hunk[1]);
      const count = hunk[2] === undefined ? 1 : Number(hunk[2]);
      for (let offset = 0; offset < count; offset++) added.get(file).lines.add(start + offset);
      continue;
    }
    if (file && line.startsWith("+")) added.get(file).text.push(line.slice(1));
  }
  for (const path of untracked) {
    const text = readFileSync(join(root, path), "utf8").split("\n");
    added.set(path, { lines: new Set(text.map((_, index) => index + 1)), text });
  }
  return added;
}

function scopeOf(root, parsed) {
  if (parsed.paths.length > 0) return { files: parsed.paths, added: null };
  let diffArguments;
  let untracked = [];
  if (parsed.staged) diffArguments = ["--cached"];
  else {
    diffArguments = [git(root, ["merge-base", parsed.diff, "HEAD"]).trim()];
    untracked = git(root, ["ls-files", "--others", "--exclude-standard"])
      .split("\n")
      .filter((path) => SOURCE.test(path));
  }
  const added = addedLines(root, diffArguments, untracked);
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
  const lines = added.get(entry.file)?.lines;
  if (!lines) return false;
  for (let line = entry.line; line <= entry.endLine; line++) if (lines.has(line)) return true;
  return false;
}

function addedDisables(added) {
  const found = [];
  for (const [file, { text }] of added ?? []) {
    for (const line of text) {
      const match = DISABLES_NO_COMMENTS.exec(line);
      if (!match) continue;
      const rules = (match[1] ?? "")
        .split(/[\s,]+/u)
        .filter((rule) => rule !== "" && rule !== "--");
      if (rules.length === 0 || rules.some((rule) => rule.endsWith("no-comments")))
        found.push(`${file}: ${line.trim()}`);
    }
  }
  return found;
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

  if (!parsed.check) {
    printInventory(
      entries.filter((entry) => parsed.all || !HIDDEN_BY_DEFAULT.has(entry.kind)),
      parsed.width,
    );
    return;
  }

  const rejected = entries.filter((entry) => !ALLOWED.has(entry.kind));
  const disables = addedDisables(added);
  for (const entry of rejected) {
    const owner = entry.owner === "" ? "" : ` (${entry.owner})`;
    console.log(
      `${entry.file}:${entry.line} ${entry.kind}${owner}: ${GUIDANCE[entry.kind] ?? "delete"}`,
    );
  }
  for (const disable of disables)
    console.log(`${disable}: do not disable no-comments; delete the comment instead`);
  if (rejected.length > 0 || disables.length > 0) process.exit(1);
}

main();
