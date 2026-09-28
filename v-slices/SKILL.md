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

Use progressive detail: a concise roadmap of the whole agreed scope, followed by an execution-ready description of the next slice. Do not fully specify distant slices before earlier results can inform them.

### Roadmap

For each slice, briefly state:

- **Outcome and boundary:** what becomes possible or what uncertainty is resolved, and why this is a separate checkpoint.
- **Path:** the end-to-end behavior exercised, from entry point to exit point.
- **Dependencies:** prerequisites, including other slices where needed. Do not imply that sequenced slices are independent.
- **Verification target:** the observable result that will prove completion. Exact commands may wait until the slice is prepared for execution.
- **Open decisions:** known unresolved questions; distinguish blockers from details that can be settled later. Omit this field when there are none.

Keep later entries concise but understandable without conversation history. Account for the agreed requirements in the roadmap and state any exclusions explicitly; deferred detail is not deferred scope.

### Next slice

Expand only the next slice to execute (or the slice the user explicitly selects). Include:

- Its outcome, path, prerequisites, and the reason for its boundary.
- The behavior to build, relevant acceptance criteria and constraints, and explicit exclusions.
- An executable verification command, required setup, and expected result. Identify any checks or fixtures that must be added as part of the slice; do not imply that planned checks already exist.
- Open decisions, with blockers clearly marked. Do not present a blocked slice as execution-ready or invent missing decisions or commands.

This description and the repository must be enough to build and prove the slice without reading the conversation. Self-contained does not mean implementation-complete: function signatures and a full program design are not required.

Before a later slice enters execution, expand it to the same standard using what earlier slices revealed. Revisit boundaries and dependencies if those results change the plan; do not preserve obsolete slices just because they were listed upfront.

## Failure modes to watch in yourself

- **Horizontal slices in disguise**: "S2: the persistence layer" is a layer, not a slice. Every slice's Path must span entry to exit.
- **Micro-slices**: splitting one coherent outcome solely to meet an estimated diff size, or promoting every test and implementation step into its own checkpoint.
- **Oversized bundles**: minimizing the slice count by combining unrelated outcomes or accepting unreviewable diffs. Fewer slices are useful only while each remains coherent and verifiable.
- **Premature detail**: producing execution specifications for the entire roadmap instead of preparing the next slice.
- **Vague verification**: the next slice needs an executable check and expected result; later slices still need a concrete, observable completion target.
- **Hidden scope or context**: a shorter plan must not drop requirements, safety work, or facts needed to understand its checkpoints.
- **Implementing anyway**: writing "just the first slice" to be helpful. Present the plan for review and approval before implementation.
