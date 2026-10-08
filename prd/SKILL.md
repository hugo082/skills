---
name: prd
description: Interview the user to create a PRD. Reach a shared understanding on the problem we are solving and for whom. Use when user wants to create a PRD.
---

## Goal

Write the product requirements. Answer three questions: what problem are we solving, for whom, and how will we observe that it's solved.
Use user vocabulary only: actors, behaviors, outcomes, constraints.
**Forbidden nouns:** endpoint, service, schema, table, queue, database, API, component, class, module, cron, webhook — and their synonyms. If one appears in your draft, rewrite the sentence in terms of what the user observes. A constraint may still name an existing system as a boundary condition ("must work inside the existing WhatsApp conversation flow").

Do not include implementation plans, complexity scores, or engineering estimates in the PRD.

## Deliverable

- Problem statement and the user outcome (not the feature description — the change in the user's world)
- Actors and their jobs/scenarios, with the primary user journey explicit
- Acceptance criteria phrased as externally observable behavior ("when X does Y, Z happens within N seconds"), each independently testable and tagged with priority, reach, and frequency
- Explicit non-goals: adjacent outcomes the user could reasonably expect but that this release excludes
- Constraints, agreed defaults and assumptions, and non-blocking open questions

## Guidance

### Keep the document current

Create the PRD from `./templates/prd.md` before the first question round. Replace each bracketed placeholder with what is already known, or with `TBD`.
Keep the PRD where the user asked. When no location was given, use the scratchpad and, on confirmation, ask where to move it.
After each round of answers, update the document before asking the next round: settle `TBD`s, add or edit acceptance criteria, record accepted defaults in Assumptions, move rejected scope to Non-goals, and remove `(proposed)` markers the user accepted.
End each message with the document's location and a one-line note of what changed in it.

### Establish the happy path first

Define the primary actor, their goal, the problem today, and the typical successful end-to-end journey. Confirm this path with the user before raising any edge case or error state.

Ask only decisions that materially change the core outcome, launch scope, or significant product risks. Send every such question whose prerequisites are already settled in one message, numbered, each with your recommended answer. Hold back questions that depend on an answer you don't have yet. Wait for the user's answers before asking more.

Each question should be formatted like so:

```
❓ **Q<N>** - **<question title>**: <question body, might be multiple paragraphs, including multiple choices>

➡️ <your recommended answer>
```

Look up facts from the filesystem and available tools before asking. Ask the user only for context you cannot access, and for product decisions.

### Default routine edge cases; discuss material risks

Once the happy path is settled, present a short batch of relevant edge cases with a proposed graceful-degradation behavior for each, in user terms. For example: "If the action cannot complete, tell the user it failed and let them try again." Invite the user to accept the defaults as a batch or override the ones worth discussing. List them as `- **<edge case>** → <default behavior>` under one question, not one question per edge case.

Mark each proposed default `(proposed)` until the user accepts it, individually or as a batch. Record accepted defaults in Assumptions and express any required observable behavior as acceptance criteria. Do not add unrelated capabilities under the guise of defaults.

Safety, privacy, compliance, irreversible-loss, and core-outcome risks are never batch defaults. Ask the user about each one as its own question, and rate it by severity, not by reach or frequency.

### Prioritize by product impact

Tag **every acceptance criterion** with:

- **Priority** — one of the four MoSCoW tiers below, with a short product rationale.
- **Reach** — who or what share of users/sessions is affected, such as "all users" or a named segment.
- **Frequency** — how often the scenario occurs, such as "daily", "per purchase", or "rarely".

Use available evidence or user-confirmed context. Mark unsupported reach/frequency as "unknown" or explicitly label an assumption; never invent percentages. Unknown metadata alone need not trigger another interview round unless it could change a material scope decision.

| Priority        | Product meaning                                                                                                     |
| --------------- | ------------------------------------------------------------------------------------------------------------------- |
| **Must Have**   | Required for launch, the core outcome, or compliance. Explain what fails without it.                                |
| **Should Have** | Important value, but droppable if the engineering timeline requires it.                                             |
| **Could Have**  | Nice to have; does not affect the core outcome or launch.                                                           |
| **Won't Have**  | Explicitly outside this release's scope. Record in Non-goals, not as a launch acceptance gate.                      |

Do not manufacture a criterion for every tier or mark everything Must Have by default. If an already-discussed criterion is marked Won't Have, keep its ID, reach, frequency, and rationale under Non-goals. Other non-goals can stay plain bullets. Put outcomes postponed to a later release in Follow-ups as well; put permanent exclusions in Non-goals only.

### Confirm and stop

When the core outcome is testable and no unresolved decision blocks launch scope or a significant product risk: summarize the problem, primary journey, priorities, agreed defaults, and non-goals, and ask the user to confirm. Put remaining non-blocking unknowns in Open questions. Declare the PRD complete only after the user confirms.

If the stated problem is vague, say so. If the proposed outcome doesn't obviously serve the stated user, challenge it. If a simpler outcome would satisfy the same need, propose it.

Add a requirement the user did not ask for only when it is logically entailed by what they asked for, or when it materially affects the agreed outcome or a significant risk. In the second case, propose it as a `(proposed)` default for confirmation; otherwise omit it.

### Optional sanity check in dialogue

If a requested low-reach edge case appears to demand disproportionate engineering work, flag it as a concern to validate with Engineering, not as an estimate or a fact. Explain the product tradeoff and suggest a simpler user-visible or manual alternative. Keep technical estimates and speculative complexity claims out of the final PRD.

## Exit criteria

Do not declare the stage done until:

- The user has explicitly confirmed the problem, primary journey, priorities, defaults, and scope boundary.
- Every in-scope acceptance criterion could become a black-box test and has a priority with product rationale, reach, and frequency. Unknowns and assumptions are labeled.
- The Non-goals section is non-empty. Won't Have criteria, if any, are excluded from launch acceptance gates.
- No unresolved question blocks the core outcome, launch scope, or a significant product risk; non-blocking questions are recorded.
- No forbidden vocabulary appears in the document except the existing-system boundary-condition exception above; no implementation plans or engineering estimates appear.
- No requirement appears that the user did not ask for or accept as a default.
- Every challenge raised during the dialogue is resolved or recorded in Open questions.

## Wrapping up

The final revision of the document is the deliverable; do not rewrite it from scratch at the end. Run the exit criteria against it. Never reference any ID/prose from the current conversation, the output should be standalone.
