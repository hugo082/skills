---
name: system-architecture
description: Takes requirements, inspects codebase, and outlines system architecture. Reach a shared understanding of the system we want to build. Use when user wants to architect a feature or refactor the system.
---

## Goal

Given these requirements and this existing codebase, how do components interact to satisfy them?
**Allowed vocabulary**: services, endpoints, request/response payloads, schemas, entities, queues, topics, stores, third-party APIs, auth boundaries, retries, idempotency.
**Forbidden nouns:** class names, function/method names, file paths, directory layout, types, interfaces, call stacks. Those belong to program design. If you're writing `UserRepository.findByEmail`, you've leaked.
 

## Deliverable

**Component inventory** — critically, split into what already exists and is reused vs what is new. Do not design greenfield architectures that ignore what's already there.

**API contracts**: endpoint shapes, request/response payloads, error semantics

**Data model**: at the entity/relationship level (not full DDL)

**Event/queue topology**: if applicable

**Sequence flows for each key acceptance criterion**: this creates the traceability link back to the requirements

**Decision records**: for each non-obvious choice, the alternatives considered and why they were rejected (mini-ADRs). This is what makes the architecture reviewable rather than just readable

**Failure/consistency posture**: what happens on partial failure, idempotency, retries

The template is available in `templates/prd.md`.

## Process

Interview the user relentlessly until you reach a shared understanding. Map this as a **design tree**: every decision branches into the decisions that hang off it.

Work the tree in **rounds**. The **frontier** is every decision whose prerequisites are already settled — the questions you can ask _now_ without guessing at answers you haven't heard yet. Ask the whole frontier in one round: number each question and give your recommended answer. Then wait for the user's answers before the next round.

Each question should be formatted like so:

```
❓ **Q<N>** - **<question title>**: <question body, might be multiple paragraphs, including multiple choices>

➡️ <your recommended answer>
```

Each round the user answers reshapes the tree — settled decisions push the frontier outward and unblock questions that depended on them. Recompute the frontier and ask the next round. A question whose answer depends on another question still open in this round belongs to a _later_ round, not this one.

Finding _facts_ is your job, never the user's. When a frontier question needs a fact from the environment (filesystem, tools, etc.), dispatch a sub-agent to find it — don't ask the user for anything you could look up yourself. Don't block on it: a running exploration is an unsettled prerequisite, so only the questions downstream of it wait for the sub-agent to report — ask the rest of the frontier now. The _decisions_ are the user's — put each to them and wait.

The session is done when the frontier is empty: every branch of the design tree visited, nothing left silently assumed. Do not act on it until the user confirms you have reached a shared understanding.

## Exit criteria
 
1. Every acceptance criterion from the PRD traces through at least one flow. Verify this mechanically — list AC numbers, check coverage.
2. Contracts pass the two-independent-agents test.
3. Every new component has a documented argument against reuse.
4. The user has reviewed and approved the Decisions section specifically.

## Failure modes to watch in yourself
 
- **Greenfield blindness**: proposing new services/tables that duplicate existing ones. The Existing-reused inventory is the guard; do it first, not last.
- **Speculative scale**: abstraction layers, caches, or queues justified by traffic that isn't in the PRD's constraints. If the PRD doesn't demand it, it's a Non-goal violation.
- **Hollow vagueness**: "a service will handle notifications" is not architecture. Every component needs contracts.

## Wrapping up

Use the template in `./templates/architecture.md`. Never reference any ID/prose from the current conversation, the output should be standalone.
