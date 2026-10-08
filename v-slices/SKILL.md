---
name: v-slices
description: Sequence the work into meaningful, verifiable vertical slices. Use when the user wants to split a task into smaller, more manageable pieces.
---

## Goal

Sequence the implementation into the smallest useful set of end-to-end runnable checkpoints. What does each slice make possible or prove, how will it be verified, and why is it worth completing separately?

## Inputs

Work from the supplied goal, requirements, documents, and relevant codebase context. Identify missing decisions that prevent credible slicing; do not invent their answers.

## Slicing rules

A slice is a meaningful completion checkpoint: a thin path from entry point to exit point through the relevant parts of the system, runnable and verifiable when it lands. Do not add unrelated layers just to touch the entire architecture.

- **Split by outcome, risk, or review complexity, not predicted line count.** A separate slice must offer a useful demonstration, resolve a distinct uncertainty, or isolate reasoning that would otherwise be too difficult to review coherently. Explain why each boundary is useful. Merge adjacent slices that have no meaningful separate checkpoint.
- **Cover the agreed scope with as few slices as stay coherent.** Do not turn every implementation task into a slice.
- **One slice may land through several small, coherent, reviewable changes.** Keep intermediate changes safe to land; the slice is complete only when its end-to-end verification passes. If the combined outcome is too complex to understand or verify, split it at a meaningful behavioral boundary.
- **Prove uncertain wiring, not wiring that already works.** Start with a walking skeleton only when new or uncertain integration needs proving: the thinnest runnable path through real plumbing, with a hardcoded result where appropriate. Keep it focused on wiring. When extending an established path, start with the smallest useful behavior instead.
- **Order by risk, respecting dependencies.** Front-load the slices that could falsify the approach (novel integration, uncertain third-party behavior, tricky consistency). Deprioritize mechanical work.
- **Each slice ends runnable and verifiable.** Include the tests, failure handling, and safety constraints required for its stated outcome. Do not defer those essentials to a generic "hardening" slice.

## Deliverable

Produce a concise roadmap of the whole agreed scope and one design brief per slice using `./templates/slice.md`. Use progressive detail: prepare the next or explicitly selected slice for design; keep later briefs concise until earlier results can inform them.

### Roadmap

For each slice, briefly state:

- **Outcome and boundary:** what becomes possible or what uncertainty is resolved, and why this is a separate checkpoint.
- **Path:** the end-to-end behavior exercised, from entry point to exit point.
- **Dependencies:** prerequisites, including other slices where needed.
- **Verification target:** the observable result that will prove completion. Exact commands belong in program design unless already known.
- **Open decisions:** known unresolved questions; distinguish blockers from details that can be settled later. Omit this field when there are none.

Keep later entries concise but understandable without conversation history. Account for every agreed requirement in the roadmap and list any exclusion explicitly.

### Slice issues

Each slice is a separate issue using `./templates/slice.md`. Restate its outcome, behavioral scope, acceptance criteria, critical constraints, and verification targets. Link to the relevant PRD and architecture sections for context and rationale, and name repository paths and symbols that explain existing behavior. Do not invent upstream documents when none were supplied; identify missing context that blocks design.

Every reference must resolve to a path, permalink, or issue the next agent can open. Make dependencies and blocking relationships explicit. State the capability or evidence needed, distinguishing stable prerequisites not yet implemented from unresolved results that determine the design.

For the next or selected slice, check that the issue, its referenced documents, and the repository name the behavior, acceptance criteria, constraints, and verification targets the designer needs. Do not specify files, signatures, line estimates, or implementation steps. Keep later issues brief; do not fill the template with speculative detail or empty sections.

Every slice needs concrete, observable verification targets, including relevant failure behavior. Include exact commands and setup only when known; identify planned checks as planned.

Set **Next action** to prepare the program design, not implement. Record questions for the designer and mark missing evidence or decisions that block affected design. Do not label a blocked slice design-ready. When blocked, make obtaining the missing decision or evidence the next action.

Before a later slice enters design, refresh its brief using earlier results. Revisit boundaries and dependencies if those results change the plan; do not preserve obsolete slices just because they were listed upfront.

## Exit criteria

- Every slice's Path spans entry point to exit point; none is a layer or a module.
- No slice exists only to meet a diff size, and no slice combines unrelated outcomes.
- No brief contains file layouts, signatures, line estimates, or implementation steps.
- Every slice has a falsifiable, observable verification target.
- Every agreed requirement, safety behavior, and known fact appears in the roadmap or a brief.
- No implementation was written.

## Wrapping up

Present the roadmap and issue briefs for review. When publishing is requested or authorized, create or update one issue per slice using `./templates/slice.md`; otherwise return the briefs without posting. Do not create duplicate issues when revising a plan.
