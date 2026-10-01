---
name: work
description: <on a rocket>
---

Your input ∈ {inline text, `#N`, GitHub URL}. Always load issues with comments → `gh issue view <number-or-url> --comments`. Resolve issue numbers and dependencies in the issue's repository.

## Slice readiness gate

Before creating a branch, PR, or implementation changes for a slice issue, inspect its **Next action**, **Design handoff**, comments, and native dependencies. Apply this gate to issues identified as slices by the issue or parent context, including briefs from `/v-slices`. Do not require labels that the repository does not define. Standalone work requests outside this slice workflow do not acquire a program-design requirement; still respect their stated constraints and blockers.

Proceed only when all of the following are true:

- **The next action is implementation.** A request to prepare a design, review it, or obtain prerequisite evidence is not an implementation assignment.
- **The current design is accessible and explicitly approved.** Open the exact revision linked from the issue and its required artifacts. Check the approval record names that revision; neither a ready label, plan approval, nor approval of an older design is enough.
- **Prerequisites are available.** Check required capabilities and evidence against the current checkout and environment. Native dependencies track ordering, but a closed prerequisite issue or stable unimplemented contract does not prove readiness. No unresolved prerequisite result may determine the behavior or contracts being implemented.
- **The handoff is complete.** Scope, acceptance criteria, contracts, and executable verification commands with setup and expected results are available, with no unresolved blockers affecting the work. Checks clearly identified as implementation deliverables need not already exist.

If a check fails or readiness is ambiguous, stop before implementation. State the missing transition and the specific next action: `/program-design`, review or approval of the current revision, publication of inaccessible artifacts, or prerequisite resolution. Do not silently combine design and implementation, invent approval, or satisfy another slice as incidental work. Autonomy below begins only after this gate passes.

If implementation reveals a material change to the approved design or a new blocker, pause the affected work and return it for design revision and approval rather than continuing under stale approval.

## Implementation workflow

<task>
  Git branch → create draft PR → use **atomic conventional commits** → push after every commits.
  Once done: run the verifications → monitor CI is green → move PR as ready to review.
  Work autonomously.
  Match repo conventions (error style, DI, naming, coding style)
</task>
