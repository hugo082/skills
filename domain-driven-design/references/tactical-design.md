# Tactical Design (DDD)

Use this guide to implement domain models that preserve business meaning and enforce invariants in code.

## Scope

This reference covers:

- Entities
- Value Objects
- Aggregates and Aggregate Roots
- Domain Services
- Domain Events
- Repositories

Use these building blocks after defining strategic boundaries (bounded contexts, subdomains, context map).

---

## 1) Entities

An **Entity** is defined by identity and continuity over time.

### When to model as Entity

Use an Entity when:

- The concept has a stable identity (`OrderId`, `CustomerId`, `PolicyId`).
- You must track lifecycle/state transitions.
- Two objects with same attributes can still be different business objects.

### Rules

- Compare by identity, not by full attribute set.
- Protect internal consistency with behavior methods, not public mutable fields.
- Keep invariants local to the entity/aggregate boundary.

### Good practices

- Use explicit IDs (typed IDs preferred).
- Expose intention-revealing methods (`approve()`, `cancel()`, `assignAdjuster()`).
- Prevent invalid transitions at method boundaries.

---

## 2) Value Objects

A **Value Object (VO)** is defined by attributes and meaning, not identity.

### When to model as Value Object

Use a VO when:

- Identity is irrelevant.
- Replacement by equal value preserves meaning.
- Immutability simplifies correctness.

Examples: `Money`, `EmailAddress`, `Address`, `DateRange`, `Percentage`.

### Rules

- Make immutable by default.
- Compare by value (all relevant attributes).
- Validate at creation time.
- Encapsulate domain operations (`Money.add`, `DateRange.overlaps`).

### Heuristic

Default to Value Objects unless lifecycle identity is required.

---

## 3) Aggregates and Aggregate Roots

An **Aggregate** is a consistency boundary.  
The **Aggregate Root** is the only entry point for modifications inside that boundary.

### Purpose

- Enforce invariants that must hold transactionally.
- Control state transitions.
- Limit concurrency conflicts by keeping boundaries small.

### Rules

1. Modify aggregate internals only through the root.
2. Persist/load aggregate as one transaction unit.
3. Reference other aggregates by ID only (not object references).
4. Cross-aggregate rules should usually be eventually consistent via events.

### Aggregate sizing guideline

Put objects in the same aggregate only if they must be atomically consistent at commit time.

### Common anti-patterns

- Massive aggregates containing too many relations.
- Invariants enforced outside root (controller/service/database trigger only).
- Direct mutation of child entities from outside.

---

## 4) Domain Services

A **Domain Service** hosts domain logic that does not naturally belong to one entity/VO.

### Use when

- The business rule spans multiple aggregates.
- The operation is domain-significant and stateless.
- Logic does not fit a single aggregate root cleanly.

### Keep separate from Application Services

- **Domain Service**: business decision logic.
- **Application Service**: orchestration (load, invoke domain behavior, save, publish events).

### Example responsibilities

- Risk scoring policy over multiple domain objects.
- Pricing rule composition requiring multiple sources.
- Eligibility decisions crossing aggregate boundaries.

---

## 5) Domain Events

A **Domain Event** records a meaningful fact that already happened in the domain.

Examples: `OrderPlaced`, `ClaimApproved`, `PaymentCaptured`.

### Event qualities

- Named in past tense.
- Immutable.
- Carry business meaning, not technical lifecycle noise.
- Emitted as consequence of successful state transition.

### Payload guidance

- Internal events: minimal payload (usually IDs + essential facts).
- Cross-context integration events: include enough data to avoid tight callback coupling.

### Reliability concerns

- Ensure idempotent consumers.
- Define ordering expectations where causality matters.
- Plan retry/poison-message handling for asynchronous processing.

### Avoid

- Event-per-field-change noise.
- Using events as commands (`DoXNowEvent`).
- Emitting events before transaction outcome is certain.

---

## 6) Repositories

A **Repository** provides aggregate persistence abstraction while keeping domain model storage-agnostic.

### Intent

- Offer collection-like access to aggregate roots.
- Isolate domain from ORM/SQL/document-store specifics.

### Typical contract

- `findById(id)`
- `save(aggregate)`
- Optional domain-oriented queries needed by use cases

### Rules

- Define repository interface in domain (or at clear application boundary, by architecture choice).
- Return aggregates/domain types, not persistence DTOs.
- Keep query and mapping details in infrastructure adapters.
- Avoid leaking transaction/session behavior into domain logic.

---

## 7) Invariants-first tactical workflow

1. List business invariants (“must always be true”).
2. Choose aggregate boundaries that can enforce those invariants.
3. Model entities/VOs inside each boundary.
4. Add behavior methods for all meaningful state transitions.
5. Emit domain events on significant transitions.
6. Implement repository interfaces and infrastructure adapters.
7. Add tests for invariant protection and failure scenarios.

---

## 8) Practical decision matrix

- **Needs identity over time?** → Entity
- **Pure descriptive concept?** → Value Object
- **Needs atomic consistency with related objects?** → Same Aggregate
- **Rule spans aggregates but is domain logic?** → Domain Service (+ events)
- **Meaningful past business fact occurred?** → Domain Event
- **Need persistence abstraction for aggregate root?** → Repository

---

## 9) Tactical quality checklist

- [ ] Ubiquitous language appears in type/method names.
- [ ] Value Objects are immutable and validated.
- [ ] Aggregates are small and invariant-focused.
- [ ] Root is sole write entry point.
- [ ] Cross-aggregate references are by ID.
- [ ] Domain Services contain only genuine cross-entity domain logic.
- [ ] Domain Events are meaningful, past-tense, and not chatty.
- [ ] Repository contracts are aggregate-oriented and storage-agnostic.
- [ ] Infrastructure concerns do not leak into core domain model.
- [ ] Tests prove invariants and invalid transition rejection.

---

## 10) Common pitfalls and corrections

- **Anemic domain model** → Move business rules into entities/aggregates/VOs.
- **Overgrown aggregate** → Split by true transactional invariants.
- **Mutable VO** → Make immutable; reconstruct on change.
- **DTO as domain model** → Map at boundaries; keep domain pure.
- **Repository as generic CRUD table gateway** → Refocus around aggregate roots.
- **Event overproduction** → Emit only business-significant events.
- **Application service doing domain decisions** → Move decisions to domain model/service.
