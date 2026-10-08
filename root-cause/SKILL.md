---
name: root-cause
description: Investigate a bug or incident and produce a diagnostic with evidence-backed root cause, reproduction, impact, and candidate fixes. Use when the user asks why something is broken, to debug or diagnose an issue, or to find the root cause.
---

## Inputs

- Accept an inline problem description, a task or issue identifier, or a link.
- For a referenced work item, read its description, relevant discussion, and linked evidence.

## Goal

Find the root cause of the issue. Use every relevant source you have access to: traces, logs, databases, code, and reproduction runs.

## Keep the document current

Create the diagnostic from `./templates/diagnostic.md` before investigating. Fill Observed, Expected, and Noticed in from the inputs; mark the rest `TBD`. Set Diagnosis state to `UNTRACED`.
Keep the document where the user asked. When no location was given, use the scratchpad and, on confirmation, ask where to move it.
Update the document as evidence arrives: add each reproduction attempt, each eliminated cause under Ruled out with its evidence, and each causal claim under Root Cause Understanding with its evidence and a `CONFIRMED` or `HYPOTHESIS` label. Promote Diagnosis state to `TRACED` when the mechanism is established.
End each message with the document's location and a one-line note of what changed in it.

## Deliverable

The diagnostic, with every section of `./templates/diagnostic.md` filled per its bracketed instructions. Cite evidence for every causal claim: trace ID, query and result, log excerpt, or `file:line`.

## Exit criteria

- Diagnosis state is `TRACED`, or it is `UNTRACED` with Root Cause Understanding, Ruled out, and Suggested Fixes deleted.
- Observed contains no causal language.
- Expected names its authority, or states that none exists.
- Every causal claim carries evidence and a confidence label.
- Verification criterion is a command, query, or test with its expected output.

## Wrapping up

The final revision of the document is the deliverable; do not rewrite it from scratch at the end. Run the exit criteria against it.
