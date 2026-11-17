---
name: anti-slop
description: Install or update anti-slop in a repository, the dmmulroy/anti-slop Oxlint rules plus this overlay of extra rules (no-comments with its gate and Haiku reviewer). Use when adding anti-slop to a repository, picking up a new upstream or overlay version, or migrating an existing installation.
---

# anti-slop

Two layers, side by side in the repository:

- **Upstream**: [dmmulroy/anti-slop](https://github.com/dmmulroy/anti-slop).
- **Overlay**: `assets/` of this skill, a separate Oxlint plugin `anti-slop-overlay` that imports only `@oxlint/plugins`. It was tested with upstream `13909c9e` and oxlint 1.85.0.

Neither skill is added to the repository.

## Install or update

1. **Upstream.** Make sure that the upstream anti-slop plugin is installed and current. If it is not, install or update it with [its skill](https://github.com/dmmulroy/anti-slop/tree/main/skills/install-anti-slop).
2. **Overlay.**
   - Fresh install: copy `assets/` to a directory that fits the repository's tooling layout, such as next to the upstream plugin.
   - Existing overlay: merge this skill's files into the installed ones three-way. The base is `https://raw.githubusercontent.com/hugo082/skills/<revision>/anti-slop/assets/<path>` at the revision recorded by the last install. Keep local edits. Ask the user when both sides changed the same behavior.
   - In both cases, copy each agent file (`assets/rules/*/*-reviewer.md`) with `<overlay>` replaced by the installed path, to `.claude/agents/`, or to the equivalent for another harness, with a small model.
   - Add the overlay directory to the lint and format ignore patterns, and register its `index.ts` in `jsPlugins` under the name `anti-slop-overlay`.
3. **Rules.**
   - For each overlay rule, follow `assets/rules/<rule>/README.md` for options and rollout.
   - Wire the `comments.mjs --staged --check` gate into pre-commit, and `--diff origin/<default-branch> --check` into CI.
   - Keep the `no-comments` `markers` a superset of the markers of upstream `require-safety-comment-for-type-assertion`.
   - Make sure that no hook runs `--fix-suggestions`.
4. **Agent instructions.** Add this line to `AGENTS.md`, `CLAUDE.md` or the equivalent: `No comments except directives, SAFETY:/EXTERNAL: markers and ≤3-line JSDoc on exports; run the comment-reviewer agent before a PR.` When the repository owns a workflow skill that ends in a PR, add the reviewer call there. Otherwise, tell the user where it belongs.
5. **Verify.**
   - Run the repository's lint and typecheck (`vp check` for Vite+).
   - Run `comments.mjs --all` on the source tree: it must load the plugin and give a baseline per kind.
   - Run `--diff HEAD --check` on a scratch file that has a narration comment: it must exit 1.
   - Report findings in owned source. Fix them only when the user asked for a cleanup, and never by suppressing rules or lowering severities.
6. **Record.** In the install commit message, record the skill revision (`git ls-remote https://github.com/hugo082/skills HEAD`) and the local deviations. That skill revision is the base of the next overlay update.
