---
name: program-design
description: Takes requirements, codebase, system architecture, and outlines program design.
---

## Precondition (hard gate)

Locate and fully read the system architecture (and skim the PRD for acceptance criteria numbers). If the architecture doc doesn't exist, stop; offer `/system-architecture` or accept an explicit waiver. Do not reverse-engineer architecture from conversation memory.

Also read the relevant parts of the codebase: existing conventions (error handling style, DI patterns, module boundaries, naming, DDD, coding style) bind this design.

## Goal

Inside each component, what is the shape of the code — before any bodies are written?
The core rule: signatures yes, bodies no. **If you write a loop, a conditional with business logic, or a data transformation, you are implementing.** Stop and delete it.

Allowed: type definitions, interfaces, function signatures, doc comments, constants, stubbed bodies that only `throw new Error("not implemented")`, wiring that is pure declaration (route table entries pointing at stub handlers).

This stage is not primarily a dialogue. Produce the design, then present it for review. Ask questions only where the architecture doc genuinely underdetermines a code-level choice — and when it does, present the options with tradeoffs rather than an open-ended question.

## Deliverable

**Type definitions and interfaces** — in TypeScript this can and should be actual compiling code: types, function signatures, stubbed bodies (throw new Error("not implemented")). This is enforcement-by-construction: the design compiles or it doesn't

**File/module layout**: the tree, and which module owns which responsibility

**Dependency direction**: who imports whom, where the boundaries are, what's injected vs constructed

**Call stacks for the key flows**: "handler → validator → service → repository" made concrete with the actual names

**Error handling strategy per layer**: thrown vs returned, where translation happens

**Test surface**: which units get tested at which boundary, what gets mocked

## Exit criteria

1. **The fresh-context test**: a competent developer — or a fresh agent with no conversation history — could implement any single function from its signature plus doc comment without asking a question. If implementing a function would require making a design decision, the design is not done. Audit the stubs against this test explicitly before presenting.
2. Every architecture flow maps to a call stack.
3. No function body contains logic.
4. User has reviewed and approved.

## Failure modes to watch in yourself

- **Pseudo-implementation**: "stub" bodies that sketch the algorithm in comments so detailed they're code with the serial numbers filed off. Doc comments describe *what and why*, not *how step by step*.
- **Anemic interfaces**: signatures so generic (`process(input: unknown): unknown`) that every real decision is deferred to implementation. Types should carry the design.
- **Convention drift**: inventing a new error-handling or DI pattern when the repo already has one. Match the codebase unless the design doc explicitly argues for a change.

## Wrapping up

Use the template in `./templates/design.md`. Always prefer to wrap the design as verticale slices via the `/v-slices` skill. A sliced design reuses the same design template for each slice.
