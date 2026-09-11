---
name: v-slices
description: Sequence the work into independent vertical slices. Use when the user wants to split a task into smaller, more manageable pieces.
---

## Goal

Sequence the implementation as end-to-end runnable increments. What does each slice prove, and how do I run it? In what order, and in what end-to-end runnable increments, does this get built?

## Deliverable

A slice is a thin path through the **entire** system — entry point to exit point — that can be run and verified when it lands. Not a layer, not a module, not "the database part". Horizontal plans (all repositories, then all services, then all handlers) are exactly what this stage exists to prevent.

Slice properties:

- **Slice 1 is a walking skeleton**: the thinnest possible path touching every layer — request in, hardcoded response out, through the real routing/service/persistence plumbing. It proves the wiring, not the logic.
- **~100–300 lines per slice.** A slice estimated above ~300 lines must be split before the plan is presented. The whole point is that a human can honestly review each diff.
- **Each slice ends runnable**, with an explicit verification command whose expected output is stated in advance.
- **Risk-ordered**: front-load the slices that would falsify the design (novel integration, uncertain third-party behavior, tricky consistency) so re-steering happens while it's cheap. Deprioritize the mechanical ones.

## Failure modes to watch in yourself

- **Horizontal slices in disguise**: "S2: the persistence layer" is a layer, not a slice. Every slice's Path must span entry to exit.
- **Fat slice 1**: cramming real logic into the skeleton because it feels trivial. The skeleton proves plumbing; logic comes later.
- **Vague verification**: a slice whose Verify line can't be executed verbatim will not get verified.
- **Implementing anyway**: writing "just the first slice" to be helpful. The plan review gate exists precisely because you are anchored on your own plan.
- **Non-exhaustive**: if understanding a slice requires remembering this conversation, the slicing is not done.
