import { spawnSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

export interface AddedSinceOption {
  readonly addedSince: { readonly lines: Record<string, number[]> } | { readonly error: string };
}

const SOURCE = /\.(?:[cm]?[jt]sx?|vue|svelte|astro)$/u;

function git(cwd: string, args: readonly string[]): string {
  const result = spawnSync("git", args, { cwd, encoding: "utf8", maxBuffer: 1 << 30 });
  if (result.status !== 0)
    throw new Error(
      `git ${args.join(" ")} failed: ${result.error?.message ?? result.stderr?.trim()}`,
    );
  return result.stdout;
}

function compute(base: string, cwd: string): Record<string, number[]> {
  const root = git(cwd, ["rev-parse", "--show-toplevel"]).trim();
  const mergeBase = git(root, ["merge-base", base, "HEAD"]).trim();
  const added: Record<string, number[]> = {};
  let current: number[] | undefined;
  for (const line of git(root, [
    "diff",
    "-U0",
    "--no-color",
    "--no-ext-diff",
    "--src-prefix=a/",
    "--dst-prefix=b/",
    mergeBase,
  ]).split("\n")) {
    if (line.startsWith("+++ ")) {
      const path = line.slice(6);
      current = line === "+++ /dev/null" || !SOURCE.test(path) ? undefined : [];
      if (current) added[resolve(root, path)] = current;
      continue;
    }
    const hunk = /^@@ -\S+ \+(\d+)(?:,(\d+))? @@/u.exec(line);
    if (!hunk || !current) continue;
    const start = Number(hunk[1]);
    const count = hunk[2] === undefined ? 1 : Number(hunk[2]);
    for (let offset = 0; offset < count; offset++) current.push(start + offset);
  }
  for (const path of git(root, ["ls-files", "--others", "--exclude-standard"]).split("\n")) {
    if (!SOURCE.test(path)) continue;
    const absolute = resolve(root, path);
    const count = readFileSync(absolute, "utf8").split("\n").length;
    added[absolute] = Array.from({ length: count }, (_, index) => index + 1);
  }
  return added;
}

/**
 * The `addedSince` option of no-comments: the lines added since the merge base of `base` and HEAD.
 * Call it in the lint config: a git spawn inside the lint process fails with ENOMEM on Linux.
 */
export function addedSince(base: string, cwd: string = process.cwd()): AddedSinceOption {
  try {
    return { addedSince: { lines: compute(base, cwd) } };
  } catch (error) {
    return { addedSince: { error: error instanceof Error ? error.message : String(error) } };
  }
}
