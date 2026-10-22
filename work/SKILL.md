---
name: work
description: Implement user-requested software changes, verify the result, and deliver reviewable work. Use when the user asks to implement a feature, fix a bug, refactor code, or complete a task or issue.
---

## Inputs and context

Accept a direct request, a task or issue identifier, or a link. When a work item is referenced, read its description, relevant discussion, linked context, and dependencies.

## Working approach

Carry out the user-requested action autonomously within its scope. A slice label, missing design document, approval record, or workflow status does not impose an additional gate on the user's request. Use existing plans and designs as context, not mandatory prerequisites to invoking this skill.

- Understand the desired outcome and relevant code before changing it.
- Keep changes cohesive, reviewable, and focused on the requested outcome. Do not expand the scope to unrelated work.
- When a design term has more than one reading, state the reading you build in your first reply.
- Surface genuine blockers or consequential unresolved decisions when they prevent credible progress. Ask for the missing information rather than inventing it; do not require a separate planning ceremony.

## Delivery and verification

- Keep a clear, atomic change history.
- Run the repo's full check command, not a subset.
- For a user-visible change, run it in the real app and capture before and after screenshots.
- After the change works, have a sub-agent verify the requested behavior and a UX/UI sub-agent review the full feature lifecycle, including hover and focus states. Fix their findings, then take the final screenshots.
- Post the screenshots on the PR as one annotated image built and pushed with [`scripts/evidence`](scripts/evidence) (`--help` for the spec).
- Finish with the branch rebased on the latest `origin/main`, pushed, and a PR open. Check the PR state before each push; when it is merged, branch from `main` and open a new PR.
- The work is done when every CI check on the PR's head commit is green, or each failing check is shown with log evidence to fail on `main` too. Answer every review comment with a fix or a reply.
- Report unavailable or unrun checks explicitly.
- Summarize what changed, how it was verified, remaining limitations, every change made outside the repo, and where to review the result.
