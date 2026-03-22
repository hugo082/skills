# Brainstorming and Domain Discovery

Use this guide to run collaborative workshops that uncover domain knowledge and convert it into useful Domain-Driven Design (DDD) models.

## Goals

- Discover **business events**, commands, policies, and hotspots.
- Build a shared **Ubiquitous Language** with domain experts.
- Identify candidate **Bounded Contexts** and ownership boundaries.
- Surface key **invariants**, risks, and integration points.
- Prioritize what to model first (especially the **core domain**).

---

## Workshop Formats (choose based on maturity)

### 1) Big Picture Event Storming

Use when starting from scratch, or when many teams/systems interact.

**Output:**

- End-to-end event flow of the business process
- Pain points, bottlenecks, unknowns
- Candidate context boundaries

### 2) Process-Level Event Storming

Use when one process is selected (e.g., onboarding, checkout, claims).

**Output:**

- Detailed commands/events/policies
- External dependencies and timing constraints
- Candidate aggregates and invariants

### 3) Design-Level Session

Use when implementing a specific use case.

**Output:**

- Aggregate boundaries
- Invariants and state transitions
- Domain events + application orchestration plan

---

## Roles

- **Facilitator**: keeps pace, enforces language discipline, resolves ambiguity.
- **Domain Experts**: source of business truth, edge cases, and intent.
- **Engineers/Architects**: translate discoveries into models and constraints.
- **Product/Operations (optional)**: adds policy, compliance, SLA, and outcome context.

---

## Preparation Checklist

- Define workshop scope with one sentence:
  - _“From customer request submission to payout completion.”_
- Gather participants with decision authority.
- Prepare a visible timeline canvas (physical or digital).
- Pick a concrete scenario (real, recent, representative).
- Bring current pain points and known failures.
- Timebox: 90–180 minutes per session.

---

## Canonical Event Storming Legend

Use consistent notation to reduce confusion:

- **Domain Event** (past tense): `OrderPlaced`, `ClaimApproved`
- **Command** (imperative): `PlaceOrder`, `ApproveClaim`
- **Policy/Rule**: “When X happens and condition Y is true, do Z”
- **Actor**: user or external system triggering commands
- **Read Model / View**: information needed for decisions
- **External System**: payment gateway, ERP, KYC provider, etc.
- **Hotspot**: ambiguity, conflict, risk, or major unknown

---

## Event Storming Flow (facilitator playbook)

### Step 1: Capture domain events first

Ask: **“What happened in the business?”**  
Write events in past tense and place them on a timeline.

Rules:

- Prefer business language over technical jargon.
- Split coarse events into meaningful sub-events where needed.
- Keep chronology accurate enough for causal reasoning.

### Step 2: Add commands and actors

For each event, ask: **“What command caused this?”** and **“Who/what issued it?”**

### Step 3: Add policies and decision points

Ask:

- “What rule decides whether this proceeds?”
- “What conditions trigger retries, escalations, or rejection?”

Document deterministic rules and discretionary decisions separately.

### Step 4: Surface read models and data needs

Ask:

- “What information must be visible to make this decision?”
- “Where does that information come from, and how fresh must it be?”

### Step 5: Mark hotspots

Flag:

- Terminology conflicts (polysemes)
- Unclear ownership
- Unknown edge cases
- Integration fragility
- SLA or compliance risks

### Step 6: Propose bounded context candidates

Group events/commands by:

- language consistency
- business capability
- team ownership
- consistency requirements

### Step 7: Validate with scenario replay

Replay 2–3 realistic scenarios end-to-end:

- happy path
- high-risk path
- failure/recovery path

Refine terminology and boundaries in real time.

---

## Domain Discovery Prompts

Use these prompts to deepen model quality.

### Language and meaning

- “Does this term mean the same thing for all participants?”
- “Where does this word become ambiguous?”
- “What business term are we avoiding because code uses another one?”

### Invariants and consistency

- “What must always be true after this action?”
- “What cannot be allowed, even under concurrency?”
- “Can this rule be eventually consistent, or must it be immediate?”

### Ownership and boundaries

- “Which team owns this decision end-to-end?”
- “Which changes can happen independently without breaking others?”
- “Where do we need translation instead of shared models?”

### Failure and recovery

- “What happens when this external system is unavailable?”
- “How do we prevent duplicate actions?”
- “What compensating action is needed if step N fails after N-1 succeeded?”

### Value and prioritization

- “Which part is core domain vs supporting/generic?”
- “If we model only one area this sprint, where is highest leverage?”

---

## From Workshop to DDD Artifacts

Convert outputs within 24 hours while context is fresh.

## 1) Ubiquitous Language draft

Create a glossary with:

- canonical term
- definition
- context where valid
- known synonyms to avoid

## 2) Bounded Context map (draft)

For each candidate context:

- responsibilities
- owned model terms
- upstream/downstream dependencies
- integration pattern hypotheses (ACL, conformist, OHS, etc.)

## 3) Tactical model candidates

For priority use cases:

- candidate aggregates
- invariants per aggregate
- key entities/value objects
- domain events and handlers

## 4) Risk register

Track hotspots with owner + next action:

- unresolved ambiguity
- integration uncertainty
- policy/compliance gaps
- data quality concerns

---

## Lightweight Session Agenda (120 minutes)

- 0–10: scope + rules
- 10–35: events timeline (high level)
- 35–60: commands/actors/policies
- 60–80: hotspots and conflicts
- 80–100: context boundary proposals
- 100–115: scenario replay and corrections
- 115–120: decisions, owners, next steps

---

## Facilitation Rules That Improve Outcomes

- Enforce **past tense** for events and **imperative** for commands.
- Interrupt technical solutioning early; return to business meaning.
- Prefer many small, concrete examples over abstract debate.
- If disagreement persists, record both interpretations and test with scenarios.
- Keep unresolved items visible; ambiguity hidden is ambiguity multiplied.

---

## Common Workshop Pitfalls

- Starting with entities/tables instead of events.
- Mixing multiple domains into one giant session.
- Letting technical terms replace domain terms.
- Ignoring failures and only mapping happy paths.
- Jumping directly to microservices before boundary evidence exists.
- Treating first map as final; discovery is iterative.

---

## Definition of Done for a Discovery Session

A session is done when you have:

- A coherent event timeline for scoped process(es)
- Clear candidate bounded contexts with rationale
- Top invariants identified for at least one core flow
- Explicit hotspots with owners and follow-up actions
- A glossary draft that engineers and experts both accept

If any of these are missing, schedule a focused follow-up session within the same week.
