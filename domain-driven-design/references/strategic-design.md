# Strategic Design in Domain-Driven Design

Strategic Design defines **where models apply**, **who owns them**, and **how they integrate**.  
Use it to avoid one oversized, ambiguous model and to preserve clarity as teams and systems grow.

## Objectives

- Identify the **Core Domain** and invest where differentiation matters most.
- Split the system into explicit **Bounded Contexts** with clear ownership.
- Make integration explicit through **Context Maps** (not implicit dependencies).
- Keep language precise with a context-specific **Ubiquitous Language**.
- Reduce coupling and organizational friction.

---

## 1) Subdomains: where to invest effort

Classify the business domain into subdomains before deep modeling.

### Core Domain

The part that creates strategic advantage and should receive your best modeling effort.

- Highest product/engineering attention
- Rich domain model and close expert collaboration
- Strong language precision and boundary protection

### Supporting Subdomain

Necessary capabilities that support the core but are not differentiators.

- Keep clean and maintainable
- Avoid over-investing in sophisticated modeling unless justified

### Generic Subdomain

Commodity capabilities that are widely available.

- Prefer buy/adopt over custom building
- Focus on integration quality, not novelty

### Practical heuristic

If a capability does **not** improve competitive advantage, avoid turning it into a modeling masterpiece.

---

## 2) Bounded Contexts: where a model is valid

A **Bounded Context** is an explicit boundary where a specific model and language are consistent and valid.

Inside a context:

- Terms have one clear meaning.
- Invariants and rules are coherent.
- Model and code evolve together.

Across contexts:

- Same word can mean different things.
- Direct model reuse is dangerous.
- Translation is usually required.

### Signals you need separate contexts

- The same term has conflicting meanings (polysemes).
- Different teams own different business decisions.
- Different consistency rules or release cadence exist.
- One model is becoming full of conditional logic for “special cases.”

### Boundary design checklist

- [ ] What business capability does this context own end-to-end?
- [ ] Which terms are canonical inside this boundary?
- [ ] Which invariants must hold immediately here?
- [ ] Which data is local truth vs externally sourced?
- [ ] Which team is accountable for this context?

---

## 3) Ubiquitous Language at strategic level

Ubiquitous Language (UL) is context-specific, not global.

### Rules

- Name terms with domain experts, not only engineers.
- Use the same terms in code, docs, events, and conversations.
- Track synonyms and banned alternatives.
- Resolve ambiguity by qualifying terms per context (e.g., `BillingAccount`, `IdentityAccount`).

### Polyseme handling

When a term has multiple meanings:

1. Acknowledge the conflict explicitly.
2. Assign each meaning to its context.
3. Use translation at boundaries.
4. Avoid forcing one “universal” object.

---

## 4) Context Maps: how contexts relate

A **Context Map** documents relationships between bounded contexts and integration rules.  
It is both a technical and organizational artifact.

## Common relationship patterns

### Partnership

Two teams coordinate closely and evolve together.

Use when:

- Joint success depends on tight alignment.

Risk:

- Coordination overhead and schedule coupling.

### Customer/Supplier

Downstream (customer) depends on upstream (supplier), with influence on upstream priorities.

Use when:

- One context provides capabilities to another with active collaboration.

Risk:

- Supplier overload if too many customers compete.

### Conformist

Downstream adopts upstream model as-is.

Use when:

- Speed and low translation cost matter more than local model purity.

Risk:

- Downstream loses conceptual control and may inherit poor upstream design.

### Anti-Corruption Layer (ACL)

A translation boundary that protects your model from external semantics.

Use when:

- Preserving local model integrity is important.
- External model is legacy/noisy/misaligned.

Risk:

- Added implementation effort, but usually worth it for core domains.

### Open Host Service (OHS)

A well-defined published interface/protocol for integration.

Use when:

- Multiple consumers need stable access to capabilities.

Risk:

- Versioning and backward compatibility burden.

### Published Language

Shared contract format for communication between contexts.

Use when:

- Integration needs stable, explicit schema/terms.

Risk:

- Drift if governance is weak.

### Shared Kernel

A carefully shared subset of model/code between two contexts.

Use when:

- Shared concepts are small, stable, and collaboratively governed.

Risk:

- Hidden coupling and change coordination pain if it grows.

---

## 5) Integration principles across contexts

- Prefer **explicit contracts** (events/APIs/schemas) over shared internals.
- Translate at boundaries; do not leak foreign concepts into core model.
- Define ownership of each integration contract.
- Version contracts intentionally.
- Monitor semantic drift with regular cross-team reviews.

### Event integration guidance

- Domain events are local facts inside a context.
- Integration events are boundary contracts for other contexts.
- Include enough data in cross-context events to avoid synchronous callback coupling when possible.

---

## 6) Organizational alignment (Conway-aware design)

Strategic Design fails if team boundaries contradict context boundaries.

### Align for effectiveness

- Assign one owning team per bounded context.
- Minimize cross-team changes for routine evolution.
- Put strongest domain experts on Core Domain contexts.
- Establish clear escalation for cross-context contract conflicts.

### Governance cadence (lightweight)

- Monthly context map review for drift.
- Explicit ownership list for each context and contract.
- Decision log for boundary changes and rationale.

---

## 7) Step-by-step strategic design workflow

1. Identify business capabilities and classify subdomains (core/supporting/generic).
2. Run discovery workshops (event storming/process mapping).
3. Draft candidate bounded contexts.
4. Define context-specific ubiquitous language.
5. Map relationships with context map patterns.
6. Choose integration styles (ACL, conformist, OHS, etc.).
7. Validate with real scenarios and failure paths.
8. Assign team ownership and evolution rules.
9. Review and refine boundaries iteratively.

---

## 8) Strategic quality checks

A strong strategic design usually shows:

- [ ] Core domain clearly identified and prioritized.
- [ ] Context boundaries explicit and understandable.
- [ ] Polysemes resolved through contextual naming.
- [ ] Context map documented with relationship rationale.
- [ ] Integration contracts explicit and owned.
- [ ] Team ownership aligned to boundaries.
- [ ] Boundary evolution process in place.

---

## 9) Common strategic mistakes and fixes

### Mistake: One model for the whole enterprise

**Impact:** semantic conflicts, massive coupling, slow change.  
**Fix:** split by bounded contexts and add translation.

### Mistake: Treating all subdomains equally

**Impact:** underinvestment in core, waste in generic areas.  
**Fix:** invest heavily only in core; simplify/buy where appropriate.

### Mistake: Shared kernel overuse

**Impact:** hidden coupling and release lockstep.  
**Fix:** keep shared kernel tiny or replace with explicit contracts.

### Mistake: Conformist in core domain

**Impact:** core decisions constrained by external model.  
**Fix:** introduce ACL to protect local model.

### Mistake: Context maps not maintained

**Impact:** architecture drift and integration surprises.  
**Fix:** periodic map reviews and ownership governance.

---

## 10) Deliverables from strategic design

Produce these artifacts as minimum output:

1. **Subdomain classification**
   - Core, Supporting, Generic with rationale

2. **Bounded Context catalog**
   - Responsibility, language scope, owner team

3. **Context Map**
   - Relationships and integration patterns

4. **Contract inventory**
   - Events/APIs/schemas, owners, versioning policy

5. **Risk list**
   - Ambiguities, coupling hotspots, migration concerns

Keep these artifacts concise, current, and tied to real business decisions.
