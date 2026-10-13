---
name: research-questions
description: Turn a feature request or PRD into objective questions about how the current system works, for a researcher who will not see the request. Use when the user wants research questions or a research plan before designing a change.
---

## Inputs

Accept a feature request, a PRD, a task or issue identifier, or a link. For a referenced work item, read its description, relevant discussion, and linked documents.

## Goal

Write the questions a researcher must answer about the system as it exists today. The researcher reads only this document: never the request, the PRD, or the issue.

Questions are descriptive: what exists, where it lives, how it works, how parts interact, how dependencies behave, and how each area is tested today.
**Forbidden:** the feature name, requirements, the intended change, and normative phrasing ("should", "would we", "need to", "how do we", "how can we", "what's the best way"). If one appears in your draft, rewrite the question as "how does it work".

Look up file locations, packages, and libraries in the codebase before writing a question. Name where to look when known: "In `packages/billing`, how is an invoice total computed from line items?", "How do the WorkOS docs describe updating a user?".

When the work may touch a user interface, include questions on the design system used in that area: component library, colors, typography, spacing, theming.

Write between 2 and 8 questions, sized to the task. Exceed 8 only for the largest tasks or when the user asks.

## Deliverable

The research questions document from `./templates/research-questions.md`:

- Numbered questions `RQ-<N>`, each answerable from the codebase, its history, external documentation, or a learning test.
- Context pointers: links, repositories, libraries, and paths named in the inputs, copied verbatim. Leave out any pointer whose name or text reveals the change.

## Keep the document current

Create the document as soon as you have read the inputs. Keep it where the user asked. When no location was given, use the scratchpad and, on confirmation, ask where to move it.
After presenting it for review, edit the document only to apply a settled decision: an added, removed, or reworded question, or a requested change. Leave it unchanged on clarifying questions, pushback, and open discussion.
End each message with the document's location and a one-line note of what changed in it.

## Exit criteria

- No question, pointer, or title names the feature, a requirement, or an intended change.
- No question uses normative phrasing.
- Every question is answerable without the inputs.
- Every area the change will likely touch is covered by at least one question, including how it is tested.
- The user has reviewed and approved the questions.

## Wrapping up

The final revision of the document is the deliverable; do not rewrite it from scratch at the end. Run the exit criteria against it. Never reference any ID/prose from the current conversation, the output should be standalone.
