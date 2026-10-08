---
name: program-design
description: Takes requirements, codebase, system architecture, and outlines program design.
---

## Inputs

Accept inline scope, a task or issue identifier, or a link. For a referenced work item, read its description, relevant discussion, dependencies, and referenced PRD, architecture, and existing design sections. Check its intended next action and any recorded approval; do not replace an approved design unless a revision is requested or new evidence requires one.

Publication and lifecycle rules below apply only when designing an issue.

## Precondition (hard gate)

Establish the design scope: a feature, a named slice, or another explicit unit of work. If a slice plan is supplied, read the selected scope's outcome, dependencies, verification criteria, and open decisions.

If the selected slice is a design brief or roadmap summary, establish its behavior, acceptance criteria, constraints, exclusions, and verification expectations from the supplied requirements, architecture, and repository before designing its code shape. Compare prerequisite assumptions with the current repository and available evidence, not just issue status. Classify each prerequisite: a stable contract not yet implemented permits design ahead of implementation; an unresolved result that determines behavior or contracts blocks the affected design. List blockers in the design under Design blockers; do not fill the blocked part with a guess.

Locate and fully read the system architecture for system-wide constraints, and read the PRD acceptance criteria relevant to the selected scope. If the architecture doc doesn't exist, stop; offer `/system-architecture` or accept an explicit waiver. Do not reverse-engineer architecture from conversation memory.

Also read the relevant parts of the codebase.

## Goal

Within the selected scope, what is the shape of the code — before any bodies are written? Do not design out-of-scope flows or add speculative signatures and stubs for future work.
The core rule: signatures yes, bodies no. **If you write a loop, a conditional with business logic, or a data transformation, you are implementing.** Stop and delete it.

Allowed: type definitions, interfaces, function signatures, doc comments, constants, stubbed bodies that only `throw new Error("not implemented")`, wiring that is pure declaration (route table entries pointing at stub handlers).

Produce the design, then present it for review. Ask questions only when the required inputs leave a blocking scope or prerequisite decision unresolved, or the architecture doc underdetermines a code-level choice. For decisions, present the options with tradeoffs; for missing prerequisite evidence, name the result needed before the affected design can proceed.

If the design requires changing a shared contract or architectural decision, surface the change and obtain approval before proceeding with the affected design.

## Keep the document current

Create the design document from `./templates/design.md` as soon as the scope is established. Replace each bracketed placeholder with what is already known from the requirements, architecture, and codebase, or with `TBD`.
Keep the document where the user asked. When no location was given, use the scratchpad and, on confirmation, ask where to move it. For issue-based design, the issue handoff below says how to share it.
Fill the sections in place as you design them. After each review round, update the document before replying: settle `TBD`s, apply the requested changes, record resolved decisions, and move cleared items out of Design blockers.
End each message with the document's location and a one-line note of what changed in it.

## Deliverable

**Scope and implementation context**: the outcome, included behavior and acceptance criteria, explicit exclusions, prerequisites, relevant constraints, and shared contracts. Write out the relevant content; references such as "see architecture Flow-3" are not a substitute.

**Type definitions and interfaces** — in TypeScript this can and should be actual compiling code: types, function signatures, stubbed bodies (throw new Error("not implemented")). Run the type checker on the stubs before presenting.

**File/module layout**: the tree, and which module owns which responsibility

**Dependency direction**: who imports whom, where the boundaries are, what's injected vs constructed

**Call stacks for the scoped flows**: describe each flow's behavior and map it to "handler → validator → service → repository", made concrete with the actual names

**Error handling strategy per layer**: thrown vs returned, where translation happens

**Test surface and verification**: which units get tested at which boundary, what gets mocked, and executable verification commands with required setup and expected results for the scoped acceptance criteria. Convert the issue's verification targets into these checks. Identify tests or fixtures that must be added during implementation; do not imply planned checks already exist.

## Exit criteria

1. For every function introduced or changed within this scope, its signature and doc comment settle the code-shape decisions needed to implement it. Doc comments describe what and why, not step-by-step how.
2. No signature uses `unknown`, `any`, or a bare `object` where the design has already decided the shape.
3. Every acceptance criterion, constraint, and shared contract the implementation needs is written out in the design; no section points the reader to the PRD, architecture, slice plan, or conversation.
4. Every architecture flow covered by this scope is described in the design and maps to a concrete call stack. Out-of-scope flows need no speculative design.
5. No function body contains logic.
6. User has explicitly reviewed and approved the current design revision.

## Wrapping up

The final revision of the document is the deliverable; do not rewrite it from scratch at the end. Run the exit criteria against it.

### Issue handoff

For issue-based design, update the same issue; do not create a separate implementation issue.

1. **Share one canonical design.** Make the design and supporting artifacts accessible to the next agent, with enough version information to distinguish the reviewed content from later changes. Avoid independently maintained copies.
2. **Make the handoff discoverable.** Record the current design reference, review status, blockers, and intended next action in the work item. Preserve the outcome, scope, acceptance criteria, and dependency relationships. If sharing is unavailable, provide the draft and state what remains to be shared rather than claiming the handoff is complete.
3. **Present the design for review.** Do not approve your own proposal, infer design approval from the slice plan, or implement as part of this design task. When the user approves, record who approved which design and supporting artifacts in the shared context.
4. **Keep changes and approval aligned.** Mark material design changes as distinct from the previously reviewed version and present them for review.
