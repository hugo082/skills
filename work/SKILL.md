---
name: work
description: <on a rocket>
---

Your input ∈ {inline text, `#N`, GitHub URL}. Always load issues with comments → `gh issue view <number-or-url> --comments`. Resolve issue numbers and dependencies in the issue's repository.

## Slice readiness gate

Before creating a branch, PR, or implementation changes for a slice issue, inspect its **Next action**, **Design handoff**, comments, and native dependencies. Apply this gate to issues identified as slices by the issue or parent context, including briefs from `/v-slices`. Do not require labels that the repository does not define. Standalone work requests outside this slice workflow do not acquire a program-design requirement; still respect their stated constraints and blockers.

Proceed only when all of the following are true:

- **The next action is implementation.** A request to prepare or review a design is not an implementation assignment. If the issue is waiting only on prerequisites for an already-approved design, recheck them. When evidence confirms they are available, the design is unchanged, and all other checks below pass, update **Next action** to implementation. This readiness-only transition does not require redesign or duplicate approval; it must not bypass an unresolved design decision.
- **The current design is accessible and explicitly approved.** Open the exact revision linked from the issue and its revision-pinned artifacts. Check the approval record names that complete revision; treat a design comment edited after approval as ambiguous rather than trusting its unchanged permalink. Neither a ready label, plan approval, nor approval of an older design is enough.
- **Prerequisites are available.** Check required capabilities and evidence against the current checkout and environment. Native dependencies track ordering, but a closed prerequisite issue or stable unimplemented contract does not prove readiness. No unresolved prerequisite result may determine the behavior or contracts being implemented.
- **The handoff is complete.** Scope, acceptance criteria, contracts, and executable verification commands with setup and expected results are available, with no unresolved blockers affecting the work. Checks clearly identified as implementation deliverables need not already exist.

If a check fails or readiness is ambiguous, stop before implementation. State the missing transition and the specific next action: `/program-design`, review or approval of the current revision, publication of inaccessible artifacts, or prerequisite resolution. Do not silently combine design and implementation, invent approval, or satisfy another slice as incidental work. Autonomy below begins only after this gate passes.

If implementation reveals a material change to the approved design, pause the affected work and return it for design revision and approval rather than continuing under stale approval. For readiness-only blockers, such as an unavailable test environment, record the blocker and pause affected work while preserving the approved revision. Recheck readiness when it is resolved; do not require redesign unless the resolution changes the design.

## Implementation workflow

<task>
  Git branch → create draft PR → use **atomic conventional commits** → push after every commits.
  Once done: run the verifications → monitor CI is green → move PR as ready to review.
  Work autonomously.
  Match repo conventions (error style, DI, naming, coding style)
</task>
