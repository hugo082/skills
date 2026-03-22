---
name: domain-driven-design
description: Foundational Domain-Driven Design knowledge for modeling complex business software around business meaning, bounded contexts, ubiquitous language, and domain invariants. Covers strategic design (subdomains, context mapping), tactical design (entities, value objects, aggregates, domain services, repositories, domain events), and architectural alignment patterns (Hexagonal, Clean Architecture, CQRS).
---

# Domain-Driven Design

Domain-Driven Design (DDD) is a software design approach that places business domain understanding at the center of the model.  
Its purpose is to represent business reality in software with enough precision that code, language, and decisions remain aligned over time.

DDD is especially relevant in domains with high complexity, evolving business rules, semantic ambiguity, and collaboration across multiple teams or systems.

## Foundational perspective

DDD is not only a set of coding patterns. It combines:

- **Strategic Design**: deciding where model boundaries exist and how contexts relate.
- **Tactical Design**: implementing domain concepts so invariants and behavior are preserved in code.
- **Collaborative Modeling**: evolving the model through domain knowledge refinement.

A central DDD idea is that there is rarely one universal model for an entire system landscape.  
Different bounded contexts can legitimately use different models for the same word.

## Core concepts

- **Ubiquitous Language**: A shared domain vocabulary used consistently in conversations, documentation, tests, and code.
- **Bounded Context**: A boundary within which one domain model and its language are internally consistent and valid.
- **Subdomains**: classification of domain areas by strategic importance, used to decide where to invest modeling depth.
  - Core Domain: highest strategic differentiation; highest modeling investment.
  - Supporting Subdomain: necessary capabilities that support the core.
  - Generic Subdomain: commodity capabilities often better reused or bought.
- **Entities**: Domain objects defined by identity and continuity over time.
- **Value Objects**: Domain objects defined by attributes and meaning rather than identity, typically immutable and equality-by-value.
- **Aggregates**: Consistency boundaries that enforce invariants through a single modification entry point: the aggregate root.
- **Domain Services**: Domain behavior that is meaningful to the business but does not naturally belong inside one entity or value object.
- **Domain Events**: Past-tense domain facts that represent meaningful business occurrences.
- **Repositories**: Abstractions for loading and persisting aggregate roots while keeping domain logic independent from storage technology.

## Essential DDD ideas

- **Model meaning is contextual**: the same term can carry different semantics in different bounded contexts (polysemy).
- **Invariants drive model structure**: transactional boundaries exist to protect rules that must always hold.
- **Behavior matters as much as data**: domain objects are not only data containers; they embody business rules.
- **Cross-boundary coordination is explicit**: integration between contexts relies on explicit contracts and translations.
- **Domain and infrastructure are different concerns**: storage, transport, and framework details should not redefine domain meaning.

## Related architecture knowledge

DDD commonly aligns with:

- **Hexagonal Architecture (Ports and Adapters)** for isolating domain logic from external systems.
- **Clean Architecture** for dependency direction toward business rules.
- **CQRS** when read/write concerns diverge significantly and justify separate models.

## Progressive disclosure: what to read and when

- Read `references/strategic-design.md` for bounded contexts, subdomains, and context maps.
- Read `references/tactical-design.md` for entities, value objects, aggregates, repositories, services, and events.
- Read `references/architecture-patterns.md` for Hexagonal, Clean Architecture, and CQRS application guidance.
- Read `references/brainstorming.md` for event storming and domain discovery workshops.
- Read `references/review.md` for DDD-oriented code/design review criteria and common pitfalls.
