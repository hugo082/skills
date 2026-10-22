---
name: work
description: Implement user-requested software changes, verify the result, and deliver reviewable work. Use when the user asks to implement a feature, fix a bug, refactor code, or complete a task or issue.
---

**Done is a PR with green CI, every review comment answered, and an
atomic commit history.** A passing local run is not done.

**No gates.** Do not wait on a slice label, design document, approval
record, or workflow status. Use existing plans and designs as context.

## Read the request

- Work item referenced → read its description, discussion, linked
  context, and dependencies.
- Design term with more than one reading → state the reading you build
  in your first reply.
- Missing information blocks progress → ask. Do not invent it.

**Scope is the request.** Do not expand it to unrelated work.

## Build

- Commit as you go. History does not need to be clean yet.
- Run the repo's full check command, not a subset.

## Verify

**Run verification in a sub-agent, never in the main session.**

**User-visible change → run it in the real app.**

1. Capture before screenshots.
2. Verify the requested behavior.
3. Review the full feature lifecycle, including hover and focus states.
4. Fix the findings.
5. Capture the final after screenshots.

## Deliver

- Rebase on the latest `origin/main`, push, and open a PR.
- PR already merged → never push to its branch. Branch from `main` and
  open a new PR.
- Post the screenshots on the PR as one annotated image built and pushed
  with [`scripts/evidence`](scripts/evidence):

```bash
scripts/evidence --help               # image spec
```

## Finish

- **CI** — every check on the PR's head commit is green, or each failing
  check is shown with log evidence to fail on `main` too. Not: checks
  pass locally.
- **Reviews** — every review comment has a fix or a reply.
- **History** — after the last change, a sub-agent rewrites the branch
  into atomic commits, never the main session. One logical change per
  commit, with a message that names it. No fixup, WIP, or review-round
  commits. Push with `--force-with-lease`; the CI check above applies
  to the rewritten head.

## Report

Final message:

```
## <one-line what changed>

**PR:** <link>
**CI:** green | <each failing check + log evidence it fails on main>

### Changes
<what changed>

### Verification
<checks run, real-app steps, link to the evidence image>

### Not run
<checks that were unavailable or not run, or "none">

### Limitations
<remaining limitations, or "none">

### Outside the repo
<every change made outside the repo, or "none">
```
