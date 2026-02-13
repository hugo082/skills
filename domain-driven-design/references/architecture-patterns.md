# Architecture Patterns for Domain-Driven Design

Use this reference to apply architecture patterns that **protect the domain model** and keep business logic independent from frameworks, transport, and persistence details.

## Why architecture matters in DDD

A strong domain model can still fail in practice if architecture leaks technical concerns into business logic.  
These patterns help preserve:

- **Model integrity** (business rules enforced in domain code)
- **Boundary clarity** (explicit dependencies and translations)
- **Change resilience** (replace infrastructure without rewriting domain)
- **Scalability options** (evolve read/write and integration strategies safely)

---

## 1) Hexagonal Architecture (Ports and Adapters)

Hexagonal Architecture organizes the system around the domain core, with external actors and technologies connected through ports and adapters.

### Intent

- Keep domain/application logic independent from UI, database, messaging, and external services.
- Make side effects pluggable.
- Enable testability through adapter substitution.

### Core concepts

- **Inside (core):**
  - Domain model (entities, value objects, aggregates, domain services, domain events)
  - Application services/use cases (orchestration)
- **Ports (interfaces):**
  - Inbound ports: use-case contracts exposed to drivers (HTTP, CLI, jobs)
  - Outbound ports: dependencies required by core (repositories, event bus, gateways)
- **Adapters (implementations):**
  - Inbound adapters: controllers, consumers, schedulers
  - Outbound adapters: SQL repository, message broker publisher, external API client

### Dependency rule

Dependencies point **toward the core**.  
Core must not import infrastructure frameworks.

### Practical guidance

- Define outbound contracts near domain/application boundaries.
- Keep framework annotations/configuration out of domain classes.
- Map DTOs to domain objects at adapter boundaries.
- Keep transaction handling in application layer, not controllers.

### Common mistakes

- Calling ORM APIs directly from aggregates.
- Putting use-case orchestration in controllers.
- Treating adapters as business-logic hosts.
- “Hexagonal folder structure” without true dependency inversion.

---

## 2) Clean Architecture (Concentric Layers)

Clean Architecture and Hexagonal are highly compatible. Clean emphasizes dependency direction through concentric layers.

### Typical layers

1. **Entities / Domain**  
   Pure business rules and invariants.
2. **Use Cases / Application**  
   Coordinates domain operations to satisfy user goals.
3. **Interface Adapters**  
   Converts between external formats and internal models.
4. **Frameworks & Drivers**  
   Web framework, DB, broker, external APIs.

### Dependency rule

Inner layers know nothing about outer layers.  
Outer layers depend on inner layers via interfaces.

### Where DDD elements fit

- Entities/VO/Aggregates/Domain Services -> Domain layer
- Application services/command handlers -> Use case layer
- Repositories (interfaces) -> Domain or application boundary
- Repository implementations -> Infrastructure layer
- Controllers/API schemas -> Interface adapters

### Practical guidance

- Keep policy/business decisions in inner layers.
- Keep technical details replaceable.
- Use mappers at boundaries to prevent leakage.
- Keep cross-context translation in adapters/ACL components.

### Common mistakes

- Injecting framework-specific types into domain constructors.
- Over-layering simple modules with no real complexity.
- Circular dependencies between application and infrastructure.
- Treating “service” classes as generic utility buckets.

---

## 3) CQRS (Command Query Responsibility Segregation)

CQRS separates write responsibilities (commands) from read responsibilities (queries).  
It is optional and should be introduced only when justified.

### Intent

- Optimize write model for invariants and consistency.
- Optimize read model for query performance and UX needs.
- Reduce tension between transactional domain model and reporting needs.

### Write side (commands)

- Handles intent to change state.
- Loads aggregate, enforces invariants, persists, emits events.
- Must remain authoritative for business rules.

### Read side (queries)

- Returns projections optimized for consumption.
- Can denormalize and precompute views.
- Must not bypass write-side business invariants by performing writes.

### Event-driven projection flow

1. Command succeeds on write model.
2. Domain/integration events are published.
3. Read model projectors consume events.
4. Query views are updated (eventual consistency).

### When CQRS is a good fit

- High read/write asymmetry.
- Complex reporting/dashboard requirements.
- Independent scaling requirements for reads/writes.
- Need for explicit task-based command model.

### When to avoid/limit CQRS

- Simple CRUD domains with low complexity.
- Small teams without operational bandwidth.
- No real read/write divergence.

### Common mistakes

- Introducing CQRS because it is trendy.
- Treating events as commands.
- Ignoring idempotency and replay concerns in projectors.
- Allowing stale-read hazards without UX mitigation.

---

## Combining patterns in DDD systems

Most robust DDD systems use:

- **Hexagonal/Clean** to isolate domain from technology.
- **CQRS selectively** where read/write concerns genuinely diverge.
- **Context mapping + ACL** between bounded contexts.

Suggested progression:

1. Start with modular monolith + clear bounded contexts.
2. Apply Hexagonal/Clean dependency discipline.
3. Add CQRS to specific high-value contexts if needed.
4. Split services only when boundaries and operational benefits are proven.

---

## Architecture decision checklist (DDD-aligned)

- [ ] Are domain invariants enforced inside aggregates/domain services?
- [ ] Does dependency direction point inward toward domain?
- [ ] Are adapters responsible for mapping, not business policy?
- [ ] Are repositories aggregate-oriented and infrastructure-hidden?
- [ ] Is CQRS applied only where it provides measurable benefit?
- [ ] Are read model staleness and consistency expectations explicit?
- [ ] Are cross-context integrations translated through clear boundaries (ACL/OHS/etc.)?

---

## Rule of thumb

Choose the **simplest architecture that preserves model integrity**.  
In DDD, architecture is successful when the domain language and invariants stay clear even as frameworks, databases, and integrations evolve.
