# no-comments

Rejects every comment that does not match a form on the keep list. The keep list is adapted from Comment Sicko in cursor/plugins pstack. The rule checks the form. `comment-reviewer.md` judges the content.

Kept: tool directives and shebangs, a license header before the first code, comments that contain a marker (`SAFETY:`, `EXTERNAL:` for a constraint that the repository cannot change), and JSDoc on an exported symbol (or a member of one, or a Vue macro prop) with at most `maxJsdocLines` prose lines. Contract tags (`@param`, `@returns`, `@throws`, `@typeParam`, `@template`, `@deprecated`, `@see`) do not count toward the limit.

Rejected kinds: `in-body`, `module`, `banner`, `jsdoc-private`, `jsdoc-oversized`. Consecutive `//` lines are one comment. An issue number alone is not a reason to keep a comment.

```json
"anti-slop-overlay/no-comments": ["error", { "markers": ["SAFETY", "EXTERNAL"], "jsdoc": "public", "maxJsdocLines": 3 }]
```

Each rejection has a suggestion that deletes the comment. Only `--fix-suggestions` applies it, so a `--fix` hook never deletes comments.

`comments.mjs --help` documents the script:

- `--diff <ref>` or `--staged`: the comments on added lines.
- `<path>...`: every comment under the paths.
- `--check`: the gate. It also fails on an added disable directive for this rule.
- `--fix <path>...`: deletes the rejected comments under the paths.

The script prints one line per comment group: line, kind, owner symbol, prose line count, text.

Rollout on a repository that has comments:

1. Measure with `comments.mjs --all <src>`.
2. Gate the diff in pre-commit and CI, with the lint rule off.
3. Clean up one directory at a time: run the reviewer, add markers to the comments it keeps, then run `--fix`.
4. Set the rule to `error` when the inventory has no rejected kind left.
