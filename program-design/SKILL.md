---
name: program-design
description: Takes requirements, codebase, system architecture, and outlines program design.
---

## Precondition (hard gate)

Establish the design scope: a feature, a named slice, or another explicit unit of work. If a slice plan is supplied, read the selected scope's outcome, dependencies, and verification criteria. A slice plan is not required.

Locate and fully read the system architecture for system-wide constraints, and read the PRD acceptance criteria relevant to the selected scope. If the architecture doc doesn't exist, stop; offer `/system-architecture` or accept an explicit waiver. Do not reverse-engineer architecture from conversation memory.

Also read the relevant parts of the codebase: existing conventions (error handling style, DI patterns, module boundaries, naming, DDD, coding style) bind this design. Upstream documents are inputs to producing the design, not prerequisites for consuming it.

## Goal

Within the selected scope, what is the shape of the code — before any bodies are written? Do not design out-of-scope flows or add speculative signatures and stubs for future work.
The core rule: signatures yes, bodies no. **If you write a loop, a conditional with business logic, or a data transformation, you are implementing.** Stop and delete it.

Allowed: type definitions, interfaces, function signatures, doc comments, constants, stubbed bodies that only `throw new Error("not implemented")`, wiring that is pure declaration (route table entries pointing at stub handlers).

This stage is not primarily a dialogue. Produce the design, then present it for review. Ask questions only where the architecture doc genuinely underdetermines a code-level choice — and when it does, present the options with tradeoffs rather than an open-ended question.

If the design requires changing a shared contract or architectural decision, surface the change and obtain approval before proceeding with the affected design. Do not silently resolve a system-wide decision locally.

## Deliverable

**Scope and implementation context**: the outcome, included behavior and acceptance criteria, explicit exclusions, prerequisites, relevant constraints, and shared contracts. Write out the relevant content; references such as "see architecture Flow-3" are not a substitute. The design and repository must contain everything needed to implement this scope.

**Type definitions and interfaces** — in TypeScript this can and should be actual compiling code: types, function signatures, stubbed bodies (throw new Error("not implemented")). This is enforcement-by-construction: the design compiles or it doesn't

**File/module layout**: the tree, and which module owns which responsibility

**Dependency direction**: who imports whom, where the boundaries are, what's injected vs constructed

**Call stacks for the scoped flows**: describe each flow's behavior and map it to "handler → validator → service → repository", made concrete with the actual names

**Error handling strategy per layer**: thrown vs returned, where translation happens

**Test surface and verification**: which units get tested at which boundary, what gets mocked, and executable verification commands with expected results for the scoped acceptance criteria

## Exit criteria

1. **The cold-agent test**: an agent with only the design and repository can implement the scoped work without reading the PRD, architecture, slice plan, or conversation. For every function introduced or changed within this scope, its signature and doc comment must settle the code-shape decisions needed to implement it. Audit the design and stubs against this test explicitly before presenting.
2. Every architecture flow covered by this scope is described in the design and maps to a concrete call stack. Out-of-scope flows need no speculative design.
3. No function body contains logic.
4. User has reviewed and approved.

## Failure modes to watch in yourself

- **Pseudo-implementation**: "stub" bodies that sketch the algorithm in comments so detailed they're code with the serial numbers filed off. Doc comments describe *what and why*, not *how step by step*.
- **Anemic interfaces**: signatures so generic (`process(input: unknown): unknown`) that every real decision is deferred to implementation. Types should carry the design.
- **Convention drift**: inventing a new error-handling or DI pattern when the repo already has one. Match the codebase unless the design doc explicitly argues for a change.

## Wrapping up

Use the template in `./templates/design.md` for the selected scope. Produce a standalone handoff: carry the relevant acceptance criteria, constraints, shared contracts, code shape, and verification expectations in the design itself. Do not require the reader to consult upstream documents or conversation history.
