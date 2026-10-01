# <What this slice makes possible or proves>

<!--
This is a design brief, not an implementation work order. Keep it concise and
remove empty sections. Restate the slice's acceptance criteria and critical
constraints; link to upstream context rather than duplicating entire documents.
All links and repository paths must be accessible from GitHub and a fresh clone.
Do not invent file layouts, signatures, line estimates, or verification commands.
If missing evidence blocks design, state that blocker and change Next action to
obtaining the evidence rather than presenting this slice as design-ready.
-->

## Next action

Prepare the program design for this slice.
Do not implement until the design is explicitly approved and implementation prerequisites are satisfied.

## Read first

1. <PRD path or permalink>, sections <...>
   Explains <relevant intent and requirements>.
2. <Architecture path or permalink>, sections <...>
   Defines <applicable boundaries and contracts>.
3. <Repository paths and symbols>
   Existing behavior and conventions relevant to this slice.

## Outcome

<What becomes possible, or what uncertainty is resolved.>
<Why this is a useful separate checkpoint.>

## Path

<Entry point → relevant system behavior → observable exit.>
Describe behavior, not speculative modules or function names.

## Scope and acceptance criteria

Included:

- <Observable behavior.>
- <Required failure behavior and safety constraints.>

Complete when:

- <Given / when / then, or another falsifiable criterion.>
- <Relevant PRD criterion ID, with its actual requirement stated.>

Excluded:

- <What this slice must not introduce or change.>

## Constraints and prerequisites

- <Established architectural contract that must be preserved.>
- <Prerequisite capability or result this slice requires.>
- <Whether it exists, has a stable agreed contract, or remains unresolved.>

Use native issue dependencies to track blocking issues.

## Verification targets

- <Observable evidence that proves the outcome.>
- <Negative case or failure condition that must be exercised.>
- <Required environment, fixture, or external access, when known.>

## Questions for design

- <Implementation choice the designer should resolve.>
- <Missing evidence that blocks the affected design, if any.>

<!--
After program design, add a Design handoff section linking to the one canonical
current revision and its approval record. Update Next action to review the design.
Only after explicit approval and prerequisite checks may it become implementation.
Keep this issue; do not create a second implementation issue or copy the design
into several independently maintained locations.
-->
