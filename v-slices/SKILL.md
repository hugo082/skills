---
name: v-slices
description: Sequence the work into meaningful, verifiable vertical slices. Use when the user wants to split a task into smaller, more manageable pieces.
---

## Goal

Sequence the implementation into the smallest useful set of end-to-end runnable checkpoints. What does each slice make possible or prove, how will it be verified, and why is it worth completing separately?

## Inputs

Work from the supplied goal, requirements, documents, and relevant codebase context. No particular upstream artifact or workflow is required. Identify missing decisions that prevent credible slicing; do not invent their answers.

## Slicing rules

A slice is a meaningful completion checkpoint: a thin path from entry point to exit point through the relevant parts of the system, runnable and verifiable when it lands. Not a layer, not a module, not "the database part". Do not add unrelated layers just to touch the entire architecture.

- **Split by outcome, risk, or review complexity, not predicted line count.** A separate slice must offer a useful demonstration, resolve a distinct uncertainty, or isolate reasoning that would otherwise be too difficult to review coherently. Explain why each boundary is useful. Merge adjacent slices that have no meaningful separate checkpoint.
- **Keep the plan small without imposing a slice-count cap.** Cover the agreed scope, but do not turn every implementation task into a slice. Do not hide the same long task list under milestone headings. A small change may need only one slice; genuinely distinct outcomes may need more.
- **Separate completion from diff size.** One slice may land through several small, coherent, reviewable changes. These are implementation steps, not additional planning checkpoints. Keep intermediate changes safe to land; the slice is complete only when its end-to-end verification passes. If the combined outcome is too complex to understand or verify, split it at a meaningful behavioral boundary.
- **Prove uncertain wiring, not wiring that already works.** Start with a walking skeleton only when new or uncertain integration needs proving: the thinnest runnable path through real plumbing, with a hardcoded result where appropriate. Keep it focused on wiring. When extending an established path, start with the smallest useful behavior instead.
- **Order by risk, respecting dependencies.** Front-load the slices that could falsify the approach (novel integration, uncertain third-party behavior, tricky consistency) so re-steering happens while it is cheap. Deprioritize mechanical work.
- **Each slice ends runnable and verifiable.** Include the tests, failure handling, and safety constraints required for its stated outcome. Do not defer those essentials to a generic "hardening" slice.

## Deliverable

Produce a concise roadmap of the whole agreed scope and one design brief per slice using `./templates/slice.md`. These are assignments to prepare a program design, not implementation-ready work orders. Use progressive detail: prepare the next or explicitly selected slice for design; keep later briefs concise until earlier results can inform them.

### Roadmap

For each slice, briefly state:

- **Outcome and boundary:** what becomes possible or what uncertainty is resolved, and why this is a separate checkpoint.
- **Path:** the end-to-end behavior exercised, from entry point to exit point.
- **Dependencies:** prerequisites, including other slices where needed. Do not imply that sequenced slices are independent.
- **Verification target:** the observable result that will prove completion. Exact commands belong in program design unless already known.
- **Open decisions:** known unresolved questions; distinguish blockers from details that can be settled later. Omit this field when there are none.

Keep later entries concise but understandable without conversation history. Account for the agreed requirements in the roadmap and state any exclusions explicitly; deferred detail is not deferred scope.

### Slice issues

Each slice is a separate issue using `./templates/slice.md`. Restate its outcome, behavioral scope, acceptance criteria, critical constraints, and verification targets. Link to the relevant PRD and architecture sections for context and rationale, and name repository paths and symbols that explain existing behavior. Do not invent upstream documents when none were supplied; identify missing context that blocks design.

All references must be accessible to a cold agent with GitHub and a fresh clone: pushed repository files, issues, or comment permalinks. Do not rely on local-only files or conversation history. Use native issue dependencies to track blocking issues, and describe the capability or evidence needed in the issue. Distinguish stable prerequisites not yet implemented from unresolved results that determine the design.

For the next or selected slice, check that the issue, its referenced documents, and the repository provide enough context to prepare the program design without this conversation. This is the **design-ready cold-agent test**, not a requirement to specify files, signatures, line estimates, or implementation steps. Keep later issues brief; do not fill the template with speculative detail or empty sections.

Every slice needs concrete, observable verification targets, including relevant failure behavior. Include exact commands and setup only when known; identify planned checks as planned. Program design must supply executable verification commands before implementation.

Set **Next action** to prepare the program design, not implement. Record questions for the designer and mark missing evidence or decisions that block affected design. Do not label a blocked slice design-ready. When blocked, make obtaining the missing decision or evidence the next action. Planning approval does not approve a program design or authorize implementation.

Before a later slice enters design, refresh its brief using earlier results. Revisit boundaries and dependencies if those results change the plan; do not preserve obsolete slices just because they were listed upfront.

## Failure modes to watch in yourself

- **Horizontal slices in disguise**: "S2: the persistence layer" is a layer, not a slice. Every slice's Path must span entry to exit.
- **Micro-slices**: splitting one coherent outcome solely to meet an estimated diff size, or promoting every test and implementation step into its own checkpoint.
- **Oversized bundles**: minimizing the slice count by combining unrelated outcomes or accepting unreviewable diffs. Fewer slices are useful only while each remains coherent and verifiable.
- **Premature detail**: producing program designs or implementation work orders while slicing. A design brief defines what to prove and where to find context, not how to implement it.
- **Vague verification**: every slice needs a falsifiable, observable completion target. Deferring commands to program design must not defer deciding what success means.
- **Hidden scope or context**: a shorter plan must not drop requirements, safety work, or facts needed to understand its checkpoints.
- **Implementing anyway**: writing "just the first slice" to be helpful. Present the plan for review; implementation follows the selected slice's program design, explicit approval, and prerequisite checks.

## Wrapping up

Present the roadmap and issue briefs for review. When publishing is requested or authorized, create or update one issue per slice using `./templates/slice.md`; otherwise return the briefs without posting. Follow repository conventions for parent links, dependencies, and labels. Do not create duplicate issues when revising a plan. Recommend `/program-design` for the next design-ready issue, not `/work`.
