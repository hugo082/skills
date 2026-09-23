# <Feature name> — PRD

## Problem

[What is broken or missing in the user's world today. Not the feature — the pain.]

## Outcome

[The change in the user's world when this ships. One paragraph. If you can't
state it without describing the feature, the problem isn't understood yet.]

## Actors & scenarios

[Who is involved and what they are trying to do.]

**<actor name>** · <concrete scenarios, not personas>

### Primary journey (happy path)

[The primary actor's goal and the typical steps from starting point to successful
outcome, in user terms. Establish this before secondary scenarios and edge cases.]

## Acceptance criteria

[Numbered list, grouped by priority. Every criterion must be externally observable
and testable as a black box. Use a time or other bound only where relevant and
supported by an agreed requirement. Include accepted fallback behaviors here.

Every AC needs a MoSCoW priority, a short product rationale, reach, and frequency.
Use evidence or user-confirmed context; label assumptions and unknowns rather than
inventing percentages. Reach/frequency do not override severe product risks.
Do not include engineering estimates or complexity scores.

Must Have = required for launch/core outcome/compliance.
Should Have = important, but droppable if the engineering timeline requires it.
Could Have = optional, considered only if Engineering confirms trivial effort.
Won't Have = outside this release; record in Non-goals, not as a launch gate.
Include only the priority groups that have agreed criteria.]

### <Must Have / Should Have / Could Have>

**AC-<N>** When <actor> does <action>, <observable result> [within <agreed bound>].

- **Priority:** <Must Have / Should Have / Could Have> — <product rationale>
- **Reach:** <affected users, segment, or supported share; label assumptions/unknowns>
- **Frequency:** <how often this scenario occurs; label assumptions/unknowns>

## Non-goals

[Explicit, non-empty list of adjacent outcomes excluded from this release.
These are Won't Have, not launch acceptance gates. This section prevents scope
invention in later stages. Plain bullets suffice unless an AC was already discussed;
for those, retain its ID and metadata using the format below. Do not invent rejected
criteria just to populate a tier. Deferred outcomes can also appear in Follow-ups.]

**AC-<N>** <Previously discussed observable behavior, now excluded.>

- **Priority:** Won't Have — <reason for exclusion from this release>
- **Reach:** <affected users, segment, or supported share; label assumptions/unknowns>
- **Frequency:** <how often this scenario occurs; label assumptions/unknowns>

## Constraints

[Regulatory, performance, compatibility, budget — facts the solution must
respect, phrased without prescribing the solution.]

## Assumptions

[Agreed edge-case defaults and other assumptions, with their basis and confirmation
status. Link accepted default behaviors to their AC IDs. Keep unconfirmed proposals
clearly labeled and out of agreed requirements; silence is not approval. Record any
unsupported reach/frequency assumptions here. Do not silently assume away significant
product risks.]

## Open questions

[Non-blocking ambiguities that remain. It is acceptable — often correct — to finish
stage 1 with open questions, as long as they don't block the core outcome, launch
scope, significant product risks, or testable acceptance criteria.]

## Follow-ups

[Outcomes explicitly postponed beyond this release, so they are not lost. One bullet
each, in user vocabulary. They remain out of scope even when listed here; reference
the Non-goals entry or AC ID where applicable. Permanent exclusions stay only in
Non-goals. When this PRD closes, each bullet becomes a `followup` issue.]
