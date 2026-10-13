---
name: research
description: Answer a research questions document by documenting how the current system and its dependencies work, with evidence and without knowledge of the planned change. Use when the user asks to answer research questions or to document how part of the codebase works today.
---

## Inputs

A research questions document, a path to one, or questions given inline. Read only that document and what its context pointers name. Do not open the PRD, feature request, tracking issue, task, or other planning documents, even when they are present in the repository or linked from the worktree.

## Goal

Document the system as it exists today: what exists, where it lives, how it works, how parts interact, and how it is tested.
**Forbidden:** recommendations, critique, improvements, root cause analysis, proposed changes, and `diff` blocks.

Sources: code, tests, configuration, git history, external documentation, and dependency source. When documentation does not settle how a black-box dependency behaves, write and run a learning test: a throwaway program in the scratchpad that exercises the behavior. Record the program and its output in the document. Change no repository file and commit nothing.

## Deliverable

The research document from `./templates/research.md`:

- Frontmatter with the repository, branch, and commit the research describes.
- The questions, each mapped to the findings that answer it or to Open questions.
- Findings organized by concept, not by question or file. Title each finding with the takeaway it asserts ("Sessions persist before the daemon acknowledges the write"), not a topic label ("Session storage") or the question restated.
- Under each finding, its testing patterns: test locations, approach, mocks, and fixtures. State `None` when no tests exist.
- Code references covering the researched area, grouped by area, each group marked exhaustive or partial.
- Open questions: only what the sources could not answer, each with what was tried.

Cite every claim with a `file:line` range, a documentation URL, or a learning test. Show structure with tables, Mermaid diagrams, call trees, file trees, component trees, type signatures, endpoint shapes, and pseudocode, each placed beside the prose it supports.

## Keep the document current

Create the document from the template before investigating. Keep it where the user asked. When no location was given, use the scratchpad.
Fill findings in place as evidence arrives. Apply follow-up questions and corrections by rewriting every section they affect. The document reads as one current account of the system, with no question log or revision history.
End each message with the document's location and a one-line note of what changed in it.

## Exit criteria

- Every question maps to at least one finding or to an Open question.
- Every claim carries a citation.
- Every finding states its testing patterns or `None`.
- No recommendation, critique, proposed change, or `diff` block appears.
- The frontmatter commit is the commit the findings were read from.
- The repository is unchanged.

## Wrapping up

The final revision of the document is the deliverable; do not rewrite it from scratch at the end. Run the exit criteria against it. Never reference any ID/prose from the current conversation, the output should be standalone.
