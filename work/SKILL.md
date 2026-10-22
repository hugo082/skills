---
name: work
description: Implement user-requested software changes, verify the result, and deliver reviewable work. Use when the user asks to implement a feature, fix a bug, refactor code, or complete a task or issue.
---

**Done is a PR with green CI and every review comment answered.** A
passing local run is not done.

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

- Make atomic commits.
- Run the repo's full check command, not a subset.

## Verify

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
