---
name: system-architecture
description: Takes requirements, inspects codebase, and outlines system architecture. Reach a shared understanding of the system we want to build. Use when user wants to architect a feature or refactor the system.
---

## Goal

Given these requirements and this existing codebase, how do components interact to satisfy them?
**Allowed vocabulary**: services, endpoints, request/response payloads, schemas, entities, queues, topics, stores, third-party APIs, auth boundaries, retries, idempotency.
**Forbidden nouns:** class names, function/method names, file paths, directory layout, types, interfaces, call stacks. If one appears in your draft (`UserRepository.findByEmail`), rewrite the sentence at the component and contract level.

## Deliverable

**Component inventory** — inspect the codebase and list the existing components this feature reuses first; then list the new ones, each with the reason no existing component could absorb it. For each component, state its responsibility, ownership boundary (which data and decisions it controls), and relevant allowed/forbidden dependencies on other components. These are component-level constraints, not imports, dependency injection, or file layout.

**API contracts**: endpoint shapes, request/response payloads, error semantics

**Data model**: at the entity/relationship level (not full DDL)

**Event/queue topology**: if applicable

**Shared constraints and invariants**: behavioral rules that multiple components or flows must preserve, including security and compatibility constraints where applicable. State each rule, which components enforce it, and which flows it constrains. Derive these from requirements and existing system constraints; do not invent security or rollout requirements as boilerplate.

**Sequence flows for each key acceptance criterion**, referenced by AC number

**Decision records**: for each non-obvious choice, the alternatives considered and why they were rejected (mini-ADRs)

**Failure/consistency posture**: what happens on partial failure, idempotency, retries

The template is available in `templates/architecture.md`.

## Process

### Keep the document current

Create the architecture document from `./templates/architecture.md` before the first question round. Replace each bracketed placeholder with what is already known from the requirements and codebase, or with `TBD`.
Keep the document where the user asked. When no location was given, use the scratchpad and, on confirmation, ask where to move it.
After the first draft, edit the document only to apply a settled decision: an answered question, an accepted recommendation, or a requested change. Leave it unchanged on clarifying questions, pushback, and open discussion.
Apply each settled decision before asking the next round by rewriting every section it affects: settle `TBD`s, add or edit components, contracts, and flows, and record the choice in Decisions. The document reads as one current architecture, with no question log or revision history.
Keep the template headings. Title every subsection with the takeaway it asserts ("Exports run after the order commits"), not a topic label ("Exports").
End each message with the document's location and a one-line note of what changed in it.

### Ask open decisions

Ask only decisions the requirements and codebase leave open. Send every such question whose prerequisites are already settled in one message, numbered, each with your recommended answer. Hold back any question whose wording, options, or recommendation depends on the answer to another question in the same round or on an answer you don't have yet. Wait for the user's answers before asking more.

Each question should be formatted like so:

```
❓ **Q<N>** - **<question title>**: <question body, might be multiple paragraphs, including multiple choices>

➡️ <your recommended answer>
```

Read the supplied research document fully. Take current-system facts from it, and inspect the codebase only for what it does not cover. Look up facts before asking. Ask the user only for context you cannot access, and for design decisions.

Stop asking when no open decision remains. Present the architecture for review and do not proceed until the user confirms it.

## Exit criteria

1. Every acceptance criterion from the PRD traces through at least one flow. Verify this mechanically — list AC numbers, check coverage.
2. Every contract states request shape, response shape, error semantics, and auth requirements.
3. Every component appears in at least one contract or flow.
4. Every new component has a documented argument against reuse.
5. No component, cache, queue, or abstraction layer exists that no acceptance criterion or constraint requires.
6. **Cross-flow consistency**: verify that all flows agree on shared contracts, ownership boundaries, component dependency constraints, and invariants. For flows touching the same state, check their interaction, including relevant concurrency and partial-failure cases, not just each flow in isolation. Record the check alongside the flows; unresolved conflicts block approval.
7. Every item in the PRD's Deferred to architecture section is resolved in Decisions, Contracts, Shared constraints and invariants, or Open questions.
8. The user has reviewed and approved the Decisions section specifically.

## Wrapping up

The final revision of the document is the deliverable; do not rewrite it from scratch at the end. Run the exit criteria against it. Never reference any ID/prose from the current conversation, the output should be standalone.
