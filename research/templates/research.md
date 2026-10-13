---
repository: <name>
branch: <branch>
commit: <full sha the findings were read from>
date: <YYYY-MM-DD>
---

# Research — <area researched, not the planned change>

## Summary

[Two to four paragraphs: how the researched area works today, its key data flows,
and how its parts relate. Facts only.]

## Questions

[Each question from the research questions document, verbatim, with the findings
that answer it.]

- **RQ-1** <question> → Findings 1, 3
- **RQ-2** <question> → Open questions

## Findings

### 1. <Takeaway the finding asserts>

[How it works, concept first, with citations woven in as ranges
(`src/app.ts:57-80`). Place each table, diagram, call tree, file tree, signature,
or pseudocode block beside the prose it supports. Current state only: no `diff`
blocks.]

#### Testing patterns

[Test locations, approach (unit, integration, end-to-end), mocks, fixtures, and
helpers. `None` when no tests exist.]

### 2. <Takeaway>

...

## Learning tests

[For each black-box behavior settled by running code: the question it answers,
the program, its output, and the conclusion. Omit when none were run.]

## Code references

### <Area>

[Exhaustive or partial.]

- `path/to/file.ts:28-36` — <what is there>
- `path/to/directory/` — <what it contains>

## Open questions

[What the sources could not answer, each with what was tried. `None` when all
questions are answered.]
