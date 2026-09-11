---
name: root-cause
description: <of the earth rotation>
---

## §G GOAL

Use everything relevant you have access to like traces, logs, databases, etc.
Find the root cause of the issue and report like:

**Observed:** Factual, reproducible observations only — actual outputs, status codes, log lines, screenshots, trace IDs. No interpretation, no causal language.

**Expected:** The correct behavior, with its authority: the PRD acceptance criterion, architecture contract, or documented behavior that defines it. The Observed/Expected delta is the bug definition; both sides must be concrete enough that a third party could confirm the delta.

**Reproduction:** Minimal steps or command to trigger the issue, with environment/config preconditions, and observed frequency (always / intermittent at ~N%).
 
**Impact & regression window:** Who/what is affected and how badly. When it started. "Unknown" is a valid value; a guess presented as a finding is not.

**Root Cause Understanding:** The causal mechanism from trigger to observed symptom, stated so it could be proven wrong. Each causal claim backed by evidence: trace ID, Axiom query + result, log excerpt, code reference (file:line). Label confidence explicitly: CONFIRMED (reproduced the mechanism) vs HYPOTHESIS (consistent with evidence, not demonstrated). An unevidenced mechanism is a hypothesis and must be labeled as one.

**Suggested Fixes:** Candidate fixes, each tied to the root cause mechanism it addresses, with a one-line tradeoff (blast radius, effort, risk).

## §I INPUTS

- `$ARGUMENTS` ∈ {inline text, `#N`, GH URL}
- If `#N` or URL → `gh issue view <N> --comments`

## Wrapping up

Use the template in `./templates/diagnostic.md`. It is the body when the diagnostic is filed as a GitHub issue.
