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
- Surface genuine blockers or consequential unresolved decisions when they prevent credible progress. Ask for the missing information rather than inventing it; do not require a separate planning ceremony.

## Delivery and verification

- Keep a clear, atomic change history and make the result reviewable.
- Run the relevant checks and verify the requested behavior. Where automated review or CI is used, inspect its results and address failures caused by the change. Report unavailable or unrun checks explicitly.
- Summarize what changed, how it was verified, remaining limitations, and where to review the result.
