---
name: program-design
description: Takes requirements, codebase, system architecture, and outlines program design.
---

## Inputs

Accept inline scope, an issue number (`#N`), or a GitHub issue URL. For an issue, load its body and comments with `gh issue view <number-or-url> --comments`, inspect its native dependencies, and read the referenced PRD, architecture, and existing design sections. Use the issue's repository when resolving numbers and links. Check its next action and any recorded approval; do not replace an approved design unless a revision is requested or new evidence requires one.

An issue is not required for standalone design. The issue publication and lifecycle rules below apply only when designing an issue.

## Precondition (hard gate)

Establish the design scope: a feature, a named slice, or another explicit unit of work. If a slice plan is supplied, read the selected scope's outcome, dependencies, verification criteria, and open decisions. A slice plan is not required.

If the selected slice is a design brief or roadmap summary, establish its behavior, acceptance criteria, constraints, exclusions, and verification expectations from the supplied requirements, architecture, and repository before designing its code shape. Compare prerequisite assumptions with the current repository and available evidence, not just issue status. No separate expanded-slice document is required. Distinguish stable prerequisites that are not yet implemented from unresolved prerequisite results that determine behavior or contracts: the former may permit design ahead of implementation; the latter block the affected design until resolved. Surface those blockers rather than guessing or presenting an incomplete handoff as ready.

Locate and fully read the system architecture for system-wide constraints, and read the PRD acceptance criteria relevant to the selected scope. If the architecture doc doesn't exist, stop; offer `/system-architecture` or accept an explicit waiver. Do not reverse-engineer architecture from conversation memory.

Also read the relevant parts of the codebase: existing conventions (error handling style, DI patterns, module boundaries, naming, DDD, coding style) bind this design. Upstream documents are inputs to producing the design, not prerequisites for consuming it.

## Goal

Within the selected scope, what is the shape of the code — before any bodies are written? Do not design out-of-scope flows or add speculative signatures and stubs for future work.
The core rule: signatures yes, bodies no. **If you write a loop, a conditional with business logic, or a data transformation, you are implementing.** Stop and delete it.

Allowed: type definitions, interfaces, function signatures, doc comments, constants, stubbed bodies that only `throw new Error("not implemented")`, wiring that is pure declaration (route table entries pointing at stub handlers).

This stage is not primarily a dialogue. Produce the design, then present it for review. Ask questions only when the required inputs leave a blocking scope or prerequisite decision unresolved, or the architecture doc genuinely underdetermines a code-level choice. For decisions, present the options with tradeoffs rather than an open-ended question; for missing prerequisite evidence, identify the result needed before the affected design can proceed.

If the design requires changing a shared contract or architectural decision, surface the change and obtain approval before proceeding with the affected design. Do not silently resolve a system-wide decision locally.

## Deliverable

**Scope and implementation context**: the outcome, included behavior and acceptance criteria, explicit exclusions, prerequisites, relevant constraints, and shared contracts. Write out the relevant content; references such as "see architecture Flow-3" are not a substitute. The design and repository must contain everything needed to implement this scope.

**Type definitions and interfaces** — in TypeScript this can and should be actual compiling code: types, function signatures, stubbed bodies (throw new Error("not implemented")). This is enforcement-by-construction: the design compiles or it doesn't

**File/module layout**: the tree, and which module owns which responsibility

**Dependency direction**: who imports whom, where the boundaries are, what's injected vs constructed

**Call stacks for the scoped flows**: describe each flow's behavior and map it to "handler → validator → service → repository", made concrete with the actual names

**Error handling strategy per layer**: thrown vs returned, where translation happens

**Test surface and verification**: which units get tested at which boundary, what gets mocked, and executable verification commands with required setup and expected results for the scoped acceptance criteria. Convert the issue's verification targets into these checks. Identify tests or fixtures that must be added during implementation; do not imply planned checks already exist.

## Exit criteria

1. **The cold-agent test**: an agent with only the design and repository can implement the scoped work without reading the PRD, architecture, slice plan, or conversation. For every function introduced or changed within this scope, its signature and doc comment must settle the code-shape decisions needed to implement it. Audit the design and stubs against this test explicitly before presenting.
2. Every architecture flow covered by this scope is described in the design and maps to a concrete call stack. Out-of-scope flows need no speculative design.
3. No function body contains logic.
4. User has explicitly reviewed and approved the current design revision. Until then, it is a proposal awaiting review, not an implementation-ready handoff.

## Failure modes to watch in yourself

- **Pseudo-implementation**: "stub" bodies that sketch the algorithm in comments so detailed they're code with the serial numbers filed off. Doc comments describe _what and why_, not _how step by step_.
- **Anemic interfaces**: signatures so generic (`process(input: unknown): unknown`) that every real decision is deferred to implementation. Types should carry the design.
- **Convention drift**: inventing a new error-handling or DI pattern when the repo already has one. Match the codebase unless the design doc explicitly argues for a change.

## Wrapping up

Use the template in `./templates/design.md` for the selected scope. Produce a standalone handoff: carry the relevant acceptance criteria, constraints, shared contracts, code shape, and verification expectations in the design itself. Do not require the reader to consult upstream documents or conversation history.

### Issue handoff

For issue-based design, update the same issue; do not create a separate implementation issue.

1. **Publish one canonical design revision.** Follow the repository's document convention. If none exists, post the design as a new issue comment and use its permalink. For a repository document, push it and link to its exact commit revision. Any referenced stubs, types, or other artifacts must also be accessible to a cold agent; local-only files are not a handoff. Do not maintain separate copies in the issue body, comments, and repository.
2. **Make review the next action.** Add or update a **Design handoff** section in the issue body with the current design link, revision identifier (commit or newly published comment), and approval status. Set **Next action** to review that revision. Preserve the issue's outcome, scope, acceptance criteria, and dependency relations. Surface unresolved blockers and do not call a partial design complete. If publication is unavailable, provide the draft and state that the issue handoff is incomplete.
3. **Wait for explicit approval.** Present the proposal and stop; do not approve your own design, infer approval from the slice plan, or start implementation. When the user approves, record who approved which revision and a link to the approval record in the issue. If approval was given outside GitHub, record that explicit approval on the issue so the next agent does not need the conversation.
4. **Check implementation prerequisites.** Only set **Next action** to implement the approved design when required capabilities and prerequisite results are available and no relevant blockers remain. Otherwise keep the approved design and name the missing prerequisite as the next action. A stable contract can permit design ahead of implementation; it does not make the dependency available.
5. **Keep revisions and approval aligned.** Do not silently edit an approved design in place. Publish material changes as a new revision, point the issue to it, and return the next action to review. Prior approval does not authorize changed behavior, contracts, or scope.

A cold implementation agent must be able to identify the exact current design, its approval, and prerequisite status from the issue without searching for an unspecified "latest design" in comments. Issue closure alone is not evidence that a required capability is present in the checkout.
