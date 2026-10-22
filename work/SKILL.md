---
name: work
description: Implement user-requested software changes, verify the result, and deliver reviewable work. Use when the user asks to implement a feature, fix a bug, refactor code, or complete a task or issue.
---

## Inputs and context

When a work item is referenced, read its description, discussion, linked context, and dependencies.

## Scope

- Do not wait on a slice label, design document, approval record, or workflow status. Use existing plans and designs as context.
- Do not expand the scope to unrelated work.
- When a design term has more than one reading, state the reading you build in your first reply.
- Ask for missing information that blocks progress; do not invent it.

## Delivery and verification

- Make atomic commits.
- Run the repo's full check command, not a subset.
- For a user-visible change, run it in the real app and capture before and after screenshots.
- Verify the requested behavior and review the full feature lifecycle in the real app, including hover and focus states. Fix the findings, then take the final screenshots.
- Post the screenshots on the PR as one annotated image built and pushed with [`scripts/evidence`](scripts/evidence) (`--help` for the spec).
- Finish with the branch rebased on the latest `origin/main`, pushed, and a PR open. Never push to a merged PR's branch; branch from `main` and open a new PR.
- The work is done when every CI check on the PR's head commit is green, or each failing check is shown with log evidence to fail on `main` too. Answer every review comment with a fix or a reply.
- Summarize what changed, how it was verified, checks that were unavailable or not run, remaining limitations, every change made outside the repo, and where to review the result.
