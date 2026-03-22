# DDD Review Guide

Use this guide to review design and code through a Domain-Driven Design lens. Focus on model clarity, boundary integrity, and business-rule correctness before style-level concerns.

## How to use this review

1. Review from **domain language and behavior** outward to infrastructure.
2. Prioritize findings by impact:
   - **Critical**: violates core invariants or boundary contracts.
   - **Major**: introduces coupling or model drift likely to create defects.
   - **Minor**: naming/structure issues with low immediate risk.
3. For each issue, include:
   - Observed behavior
   - Violated DDD principle
   - Concrete change request
   - Optional follow-up test scenario

---

## 1) Ubiquitous Language checks

- [ ] Domain terms in code match terms used by domain experts.
- [ ] Important domain concepts appear in type/function names (not hidden in generic names like `Manager`, `Util`, `Helper`).
- [ ] Ambiguous/polysemous terms are scoped to bounded contexts (e.g., `BillingAccount` vs `IdentityAccount`).
- [ ] Language is consistent across domain code, tests, ADRs, and API contracts.

**Red flags**

- Generic technical names replacing business concepts.
- Same term used with different meanings in one module.
- Domain expert vocabulary appears in tickets/docs but not in code.

---

## 2) Bounded Context and ownership checks

- [ ] Boundaries between contexts are explicit in module/package structure.
- [ ] Cross-context interactions happen through explicit interfaces/adapters.
- [ ] No direct leakage of one context’s internal model into another.
- [ ] Upstream/downstream relationship is clear (Customer/Supplier, Conformist, ACL, etc.).
- [ ] Team ownership and change boundaries align with code boundaries.

**Red flags**

- Shared “common domain” package containing unrelated context models.
- Copy-pasted integration logic spread across services.
- A single model forced to satisfy conflicting business meanings.

---

## 3) Aggregate and invariant checks

- [ ] Aggregates enforce business invariants internally.
- [ ] State changes happen through aggregate behavior methods (not arbitrary setters).
- [ ] Aggregate boundaries are small and justified by transactional consistency needs.
- [ ] References to other aggregates use identity (ID), not object graph traversal.
- [ ] Invariants are tested with both happy-path and failure scenarios.

**Red flags**

- “Anemic” entities with all rules in application services.
- Huge aggregates with many child collections and cross-links.
- Invariants enforced only in controllers/handlers, not in domain model.

---

## 4) Entity and Value Object checks

- [ ] Entities have stable identity and lifecycle semantics.
- [ ] Value Objects are immutable and equality-by-value.
- [ ] Value Objects encapsulate validation and domain-specific operations.
- [ ] Primitive obsession is reduced via meaningful Value Objects (`Money`, `Email`, `PolicyPeriod`, etc.).

**Red flags**

- Mutable Value Objects.
- Business validations duplicated in many call sites.
- Entities compared by mutable attributes rather than identity.

---

## 5) Domain services, application services, and orchestration checks

- [ ] Domain services contain domain logic that does not naturally belong to one aggregate.
- [ ] Application services orchestrate use cases (load aggregate, invoke behavior, persist, publish events).
- [ ] Application layer does not contain core business rules that belong in domain objects.
- [ ] Transaction boundaries are explicit and aligned with aggregate consistency boundaries.

**Red flags**

- Application service with long `if/else` business decision trees.
- Domain service doing persistence/transport concerns directly.
- “God service” coordinating many unrelated subdomains.

---

## 6) Domain events and integration checks

- [ ] Domain events represent meaningful past facts (named in past tense).
- [ ] Event emission is tied to successful state transition, not controller timing.
- [ ] Event payloads fit usage:
  - Internal domain events: minimal and local.
  - Cross-context integration events: include required data to avoid tight query coupling.
- [ ] Event ordering/idempotency/retry behavior is considered where needed.
- [ ] Side effects are eventually consistent when crossing aggregate/context boundaries.

**Red flags**

- Events used as command substitutes (“DoXNowEvent”).
- Chattiness: too many low-value events.
- Missing deduplication/idempotency strategy in consumers.

---

## 7) Repository and persistence boundary checks

- [ ] Repository abstractions are defined at domain boundary (or close to application boundary by architecture choice).
- [ ] Repository operations are aggregate-oriented (`findById`, `save`) rather than table-centric CRUD leakage.
- [ ] ORM/query details do not leak into domain entities/value objects.
- [ ] Lazy-loading behavior does not accidentally bypass invariant checks.

**Red flags**

- Domain entities with ORM annotations tightly coupling business model and persistence model (unless intentionally accepted and controlled).
- Repositories returning persistence DTOs directly to domain.
- Multiple partial saves inside one aggregate state transition.

---

## 8) Architecture pattern alignment checks (Hexagonal / Clean / CQRS)

- [ ] Domain core remains independent from delivery/persistence frameworks.
- [ ] Ports/adapters boundaries are explicit where hexagonal style is used.
- [ ] Command and query concerns are separated when CQRS is applied.
- [ ] Read model shortcuts do not bypass critical write-side invariants.

**Red flags**

- Framework concerns imported into core domain module.
- CQRS introduced with no clear pain point (unnecessary complexity).
- “Clean architecture” layering present in folders only, not in dependency direction.

---

## 9) Test strategy checks (DDD-focused)

- [ ] Domain tests validate invariants and behaviors at aggregate level.
- [ ] Value Objects have focused tests for validation/equality/operations.
- [ ] Context integration tests verify translation and anti-corruption rules.
- [ ] Event-driven flows include idempotency and ordering-related tests.
- [ ] Test names use ubiquitous language.

**Red flags**

- Mostly controller/integration tests with little domain behavior coverage.
- Snapshot-heavy tests that miss business rule intent.
- Invariant failures discovered only in end-to-end tests.

---

## Common pitfalls and corrective actions

| Pitfall                     | Why it hurts                                                  | Corrective action                                                   |
| --------------------------- | ------------------------------------------------------------- | ------------------------------------------------------------------- |
| Anemic domain model         | Business logic drifts to services, hard to protect invariants | Move behavior into aggregates/entities/VOs                          |
| Overgrown aggregates        | High contention, complex transactions, poor scalability       | Split by true consistency boundaries; use events between aggregates |
| One model for all contexts  | Semantic conflicts and coupling                               | Define bounded contexts and explicit translations                   |
| DTO = Domain object         | Transport concerns pollute domain model                       | Map DTOs at boundaries                                              |
| Premature microservices     | Distributed complexity before model clarity                   | Start modular monolith with context boundaries                      |
| Event overproduction        | Operational noise and accidental coupling                     | Emit only meaningful domain facts                                   |
| Ignoring domain experts     | Model diverges from real business                             | Re-establish collaborative modeling loops                           |
| Overengineering simple CRUD | Cost without proportional value                               | Use lighter patterns where domain is simple                         |

---

## Review comment templates

### Critical issue

- **Finding:** Invariant `<X>` can be bypassed by `<path>`.
- **DDD principle:** Aggregate must enforce invariants internally.
- **Request:** Move rule into `<Aggregate.method>` and block invalid transition.
- **Suggested test:** `shouldReject<Transition>When<Condition>`.

### Major issue

- **Finding:** `<ContextA>` model leaks into `<ContextB>` through `<dependency>`.
- **DDD principle:** Bounded contexts require explicit translation.
- **Request:** Introduce adapter/ACL mapping at boundary.

### Minor issue

- **Finding:** Name `<TechnicalName>` obscures domain meaning.
- **DDD principle:** Preserve ubiquitous language in code.
- **Request:** Rename to `<DomainTerm>` and update tests/docs.

---

## Quick merge gate (DDD)

Approve only when all are true:

- [ ] Core invariants are enforced in domain model.
- [ ] Ubiquitous language is consistent and clear.
- [ ] Boundary crossings are explicit and translated.
- [ ] Infrastructure concerns do not contaminate core domain behavior.
- [ ] Tests demonstrate key domain rules and failure cases.
