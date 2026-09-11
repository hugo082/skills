# <Issue Name> - Diagnostic

## Diagnosis state
[UNTRACED or TRACED. Set it before you write anything else.

TRACED — the mechanism was established, by this investigation or by work
already done. Every section below applies.

UNTRACED — the mechanism was not established: the wrong behavior was seen
during other work and not chased, or this investigation ran and did not
reach a mechanism. Fill Observed, Expected and Noticed in. Delete Root
Cause Understanding, Ruled out and Suggested Fixes — an empty heading
invites the next reader to fill it with a guess. One lead may go under
Observed, labeled HYPOTHESIS. Do NOT open an investigation only to fill
this template: a diagnostic is filed at the confidence already held.

Promote UNTRACED to TRACED in place when the mechanism is established.
Do not open a second issue.]

## Observed
[Factual, reproducible observations only — actual outputs, status codes, log
lines, screenshots, trace IDs. No interpretation, no causal language. If it
contains the word "because", it belongs in Root Cause, not here.]

## Expected
[The correct behavior, with its authority: the PRD acceptance criterion,
architecture contract, or documented behavior that defines it. If no
authority exists, say so explicitly and state the reasonable-behavior
argument — "the reporter assumed X" is context, not an authority. The
Observed/Expected delta is the bug definition; both sides must be concrete
enough that a third party could confirm the delta.]

## Noticed in
[The pull request, issue, or session where this surfaced, and what was being
done at the time. State the confidence that source reached, in its own
words. If the source later weakened or withdrew the finding, that belongs
here — not in a comment nobody grooms from.]

## Reproduction
[Minimal steps or command to trigger the issue, with environment/config
preconditions, and observed frequency (always / intermittent at ~N%).
If not reproducible, state that explicitly plus what was tried — this
changes the confidence ceiling of everything below.]

## Impact & regression window
[Who/what is affected and how badly. When it started, and if bisected:
the commit/deploy/config change it correlates with. "Unknown" is a valid
value; a guess presented as a finding is not.]

## Root Cause Understanding
[TRACED only. The causal mechanism from trigger to observed symptom, stated
so it could be proven wrong. Each causal claim backed by evidence: trace ID,
Axiom query + result, log excerpt, code reference (file:line). Label
confidence explicitly: CONFIRMED (reproduced the mechanism) vs HYPOTHESIS
(consistent with evidence, not demonstrated). An unevidenced mechanism is a
hypothesis and must be labeled as one.]

## Ruled out
[TRACED only. Plausible causes investigated and eliminated, each with the
evidence that eliminated it. Prevents the design session from re-opening
dead ends. Empty section = the first plausible cause was accepted without
differential diagnosis — treat that as a red flag.]

## Verification criterion
[The observable condition that will hold when the bug is fixed — a command,
query, or test and its expected output. Written now, fix-agnostic, so the
design session inherits it as an acceptance criterion rather than defining
success after choosing a solution.]

## Suggested Fixes
[TRACED only. Candidate fixes, each tied to the root cause mechanism it
addresses, with a one-line tradeoff (blast radius, effort, risk). These are
inputs to the design session, not decisions — do not rank them as if one was
chosen, and include "do nothing / accept" when it's defensible.]
