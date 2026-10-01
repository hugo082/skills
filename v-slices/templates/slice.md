# <What this slice makes possible or proves>

<!--
This is a design brief, not an implementation work order. Keep it concise and
remove empty sections. Restate the slice's acceptance criteria and critical
constraints; link to upstream context rather than duplicating entire documents.
All references must be accessible through the shared project context and its
configured tools. Adapt these sections to the work item's supported format.
Do not invent file layouts, signatures, line estimates, or verification commands.
If missing evidence blocks design, state that blocker and change Next action to
obtaining the evidence rather than presenting this slice as design-ready.
-->

## Next action

Prepare the program design for this slice.
This brief requests design, not implementation; a later explicit user request may choose a different next action.

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

Make blocking relationships discoverable using the project's tracking conventions.
If the tool has no dependency fields, describe the relationships here.

## Verification targets

- <Observable evidence that proves the outcome.>
- <Negative case or failure condition that must be exercised.>
- <Required environment, fixture, or external access, when known.>

## Questions for design

- <Implementation choice the designer should resolve.>
- <Missing evidence that blocks the affected design, if any.>

<!--
After program design, record a Design handoff, using these sections or equivalent
fields, that identifies the canonical current design and its approval status.
Update Next action to review the design.
Record approval and outstanding prerequisites before recommending implementation.
This describes the handoff status, not a gate on later user-directed work.
Keep this issue; do not create a second implementation issue or copy the design
into several independently maintained locations.
-->
