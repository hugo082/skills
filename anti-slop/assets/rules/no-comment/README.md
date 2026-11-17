# no-comments

Rejects every comment that does not match a form on the keep list. The keep list is adapted from Comment Sicko in cursor/plugins pstack. The rule checks the form. `comment-reviewer.md` judges the content.

Kept: tool directives and shebangs, a license header before the first code, comments that contain a marker (`SAFETY:`, `EXTERNAL:` for a constraint that the repository cannot change), and JSDoc on an exported symbol (or a member of one, or a Vue macro prop) with at most `maxJsdocLines` prose lines. Contract tags (`@param`, `@returns`, `@throws`, `@typeParam`, `@template`, `@deprecated`, `@see`) do not count toward the limit.

Rejected kinds: `in-body`, `module`, `banner`, `jsdoc-private`, `jsdoc-oversized`. Consecutive `//` lines are one comment. An issue number alone is not a reason to keep a comment.

```json
"anti-slop-overlay/no-comments": ["error", { "markers": ["SAFETY", "EXTERNAL"], "jsdoc": "public", "maxJsdocLines": 3 }]
```

`addedSince` makes the rule the diff gate: it reports only the comments on lines added since the merge base of a ref and HEAD (uncommitted and untracked files included), and an added directive that disables the rule. Compute it in the lint config, because a git spawn inside the lint process fails with ENOMEM on Linux:

```ts
import { addedSince } from "<overlay>/rules/no-comment/added-lines.ts";
// in the rule options:
...addedSince(process.env.NO_COMMENTS_BASE ?? "origin/<default-branch>"),
```

In CI, HEAD is the merge commit of the pull request: set `NO_COMMENTS_BASE=HEAD^1` and check out with `fetch-depth: 2`. A ref that git cannot resolve fails the lint.

Each rejection has a suggestion that deletes the comment. Only `--fix-suggestions` applies it, so a `--fix` hook never deletes comments.

`comments.mjs` is the inventory (`--diff <ref>` or `<path>...`, one line per comment group: line, kind, owner symbol, prose line count, text) and the cleanup (`--fix <path>...`). `--help` gives the options.

Rollout on a repository that has comments:

1. Measure with `comments.mjs --all <src>`.
2. Set the rule to `error` with `addedSince`.
3. Clean up one directory at a time: run the reviewer, add markers to the comments it keeps, then run `--fix`.
4. Remove `addedSince` when the inventory has no rejected kind left.
