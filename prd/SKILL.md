---
name: prd
description: Interview the user to create a PRD. Reach a shared understanding on the problem we are solving and for whom. Use when user wants to create a PRD.
---

## Goal

Our current step is to create the product requirements. What problem are we solving, for whom, and how will we observe that it's solved?
Allowed vocabulary: user vocabulary only. Actors, behaviors, outcomes, constraints.
**Forbidden nouns:** endpoint, service, schema, table, queue, database, API, component, class, module, cron, webhook — and their synonyms. If one of these appears in your draft, you have leaked into stage 2. Rewrite the sentence in terms of what the user observes.

Exception: a constraint may reference existing systems as boundary conditions ("must work inside the existing WhatsApp conversation flow") because that is a fact about the world, not a design decision.

## Deliverable

Problem statement and the user outcome (not the feature description — the change in the user's world)
Actors and their jobs/scenarios
Acceptance criteria phrased as externally observable behavior ("when X does Y, Z happens within N seconds"), each independently testable
Explicit non-goals — this is the highest-leverage section, because it's what stops from inventing scope later
Open questions the agent could not resolve

## Process

Interview the user relentlessly until you reach a shared understanding. Map this as a **design tree**: every decision branches into the decisions that hang off it.

Work the tree in **rounds**. The **frontier** is every decision whose prerequisites are already settled — the questions you can ask _now_ without guessing at answers you haven't heard yet. Ask the whole frontier in one round: number each question and give your recommended answer. Then wait for the user's answers before the next round.

Each question should be formatted like so:

```
❓ **Q1** - **<question title>**: <question body, might be multiple paragraphs, including multiple choices>

➡️ <your recommended answer>
```

Each round the user answers reshapes the tree — settled decisions push the frontier outward and unblock questions that depended on them. Recompute the frontier and ask the next round. A question whose answer depends on another question still open in this round belongs to a _later_ round, not this one.

Finding _facts_ is your job, never the user's. When a frontier question needs a fact from the environment (filesystem, tools, etc.), dispatch a sub-agent to find it — don't ask the user for anything you could look up yourself. Don't block on it: a running exploration is an unsettled prerequisite, so only the questions downstream of it wait for the sub-agent to report — ask the rest of the frontier now. The _decisions_ are the user's — put each to them and wait.

The session is done when the frontier is empty: every branch of the design tree visited, nothing left silently assumed. Do not act on it until the user confirms you have reached a shared understanding.

Suppress agreeableness. If the stated problem is vague, say so. If the proposed outcome doesn't obviously serve the stated user, challenge it. If a simpler outcome would satisfy the same need, propose it.

Do not invent requirements. If the user didn't ask for it and it isn't logically entailed by what they asked for, it belongs in a question ("do you also need X?"), not in the document.

## Exit criteria

Do not declare the stage done until:

1. The user has explicitly confirmed: "yes, that's the problem."
2. Every acceptance criterion could become a black-box test.
3. The Non-goals section is non-empty. An empty non-goals section means the boundary was never probed.
4. No forbidden vocabulary appears in the document.

## Failure modes to watch in yourself

- **Premature solutioning**: describing the feature's mechanism instead of the user's outcome. The tell is forbidden vocabulary.
- **Requirement padding**: adding plausible requirements (audit logs, admin dashboards, i18n) nobody asked for. If tempted, ask instead.
- **Compliance drift**: after several rounds of user pushback, agreeing with everything. The user wants a thought partner; keep flagging real problems even late in the dialogue.

## Wrapping up

Use the template in `./templates/prd.md`
