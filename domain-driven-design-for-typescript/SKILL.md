---
name: domain-driven-design-for-typescript
description: Pragmatic, implementation-focused Domain-Driven Design guidance for modern TypeScript (ESM + TS) using class-free modeling, zod-based schemas/types, and assertion-driven error handling. Use when designing or refactoring TypeScript domains with bounded contexts, aggregates, entities, value objects, domain events, and use cases while staying framework-agnostic and practical.
---

# Domain-Driven Design for TypeScript

Implement DDD in TypeScript with a pragmatic style:

- Modern **ESM + TypeScript**
- **No classes** in domain/application (plain objects + functions)
- **Zod schemas** as source of truth, infer types with `z.output<typeof Schema>`
- **Assertions** for invariant violations — always `assert(...)`, never `if (...) throw`
- Framework-agnostic architecture

## Folder architecture

Use bounded-context-first layout with **aggregates owning their entities and events**:

```
<bounded-context>/
  domain/
    index.ts
    errors/
      index.ts
      order-not-found.ts
      order-not-editable.ts
    value-objects/
      index.ts
      money.ts
      address.ts
    aggregates/
      index.ts
      order/
        index.ts
        order.ts                # aggregate root: schema + type + behavior
        order.fixtures.ts       # test fixtures (next to target)
        order-line.ts           # child entity (owned by aggregate)
        events/
          index.ts
          order-created.ts      # events owned by aggregate
          order-confirmed.ts
      product/
        index.ts
        product.ts
        product.fixtures.ts
        events/
          index.ts
          inventory-reserved.ts
    services/
      index.ts
      pricing-service.ts
    ports/
      index.ts
      order-repository.ts
      event-publisher.ts
  application/
    index.ts
    commands/
      index.ts
      place-order.ts
    queries/
      index.ts
      get-order.ts
  infrastructure/
    index.ts
    persistence/
      index.ts
      order-repository-sql.ts
    messaging/
      index.ts
      event-publisher-sqs.ts
  index.ts
```

### Key principles

- **Aggregates own their children**: entities and events live inside their aggregate folder
- **Ports are interfaces only**: `domain/ports/` defines contracts, `infrastructure/` implements them
- **Fixtures are co-located**: `order.fixtures.ts` next to `order.ts`
- **Aggregates exported with plural name**: `export * as orders from "./order/index.js"` to avoid local variable conflicts

## Code conventions

### Function parameters

Use positional arguments for core/required parameters, object for options/dependencies:

```ts
// Core args positional, dependencies/options as object
export const confirmOrder = (
  order: Order,
  params: { transaction: Transaction; now: () => string }
): Order => { ... };

// Simple operations: all positional is fine
export const addMoney = (a: Money, b: Money): Money => { ... };
export const multiplyMoney = (money: Money, quantity: number): Money => { ... };
```

This avoids breaking changes when adding optional parameters while keeping simple functions readable.

## Cross-folder rules

### One concept per file

Never put multiple commands, queries, events, errors, or adapters in the same file.

| Concept      | Location                           | Example                           |
| ------------ | ---------------------------------- | --------------------------------- |
| Error        | `domain/errors/`                   | `order-not-found.ts`              |
| Value object | `domain/value-objects/`            | `money.ts`                        |
| Aggregate    | `domain/aggregates/<name>/`        | `order/order.ts`                  |
| Child entity | `domain/aggregates/<name>/`        | `order/order-line.ts`             |
| Domain event | `domain/aggregates/<name>/events/` | `order/events/order-confirmed.ts` |
| Port         | `domain/ports/`                    | `order-repository.ts`             |
| Command      | `application/commands/`            | `place-order.ts`                  |
| Query        | `application/queries/`             | `get-order.ts`                    |

### Barrel exports

Every folder has an `index.ts` re-exporting its contents:

```ts
// domain/aggregates/order/events/index.ts
export * from "./order-created.js";
export * from "./order-confirmed.js";
```

```ts
// domain/aggregates/order/index.ts
export * from "./order.js";
export * from "./order-line.js";
export * as events from "./events/index.js";
```

```ts
// domain/aggregates/index.ts
export * as orders from "./order/index.js";
export * as products from "./product/index.js";
```

### Namespace imports

Import via namespace, access with dot notation:

```ts
import * as orders from "../aggregates/order/index.js";
import * as errors from "../errors/index.js";

// Usage: orders.Order, orders.events.OrderConfirmed, errors.OrderNotFound
```

### Zod as type definition

Define runtime schema with zod, infer static type, keep them co-located:

```ts
import { z } from "zod";

export type Money = z.output<typeof Money>;
export const Money = z.object({
  amount: z.number().finite().nonnegative(),
  currency: z.enum(["EUR", "USD"]),
});
```

Parse/validate at boundary entry points. Never manually define types that drift from schemas.

### Assertion-driven errors

Use user-provided `assert(condition, error?)` for all invariant checks:

```ts
// Signature: assert(condition: unknown, error?: Error | string): asserts condition

// Good
assert(order.status === "Draft", new OrderNotEditable(order.id));
assert(line.quantity > 0, "Quantity must be positive");

// Wrong
if (order.status !== "Draft") {
  throw new OrderNotEditable(order.id);
}
```

### Error classes

One error per file in `domain/errors/`, with code and context:

```ts
export class OrderNotEditable extends Error {
  readonly code = "order.not-editable";

  constructor(public readonly orderId: string) {
    super(`Order ${orderId} is not editable`);
    this.name = "OrderNotEditable";
  }
}
```

## User-provided primitives

### Assert function

```ts
function assert(condition: unknown, error?: Error | string): asserts condition;
```

### Transaction with emit

```ts
interface Transaction {
  emit<T extends DomainEvent>(event: T): void;
  // ... other transaction methods (commit, run, etc.)
}
```

Commands receive `transaction` and emit events via `transaction.emit(...)`.

## Code examples

For detailed implementation patterns, see:

- **[references/examples.md](references/examples.md)**: Complete code examples for value objects, entities, aggregates, events, ports, commands, and fixtures

## Boundaries and non-goals

This skill **provides**:

- Pragmatic DDD folder structure for TypeScript
- Class-free modeling guidance
- Zod-first schema/type strategy
- Aggregate-owns-children organization
- Assertion-driven error handling
- Barrel export conventions

This skill **does not** provide:

- Framework-specific setup (NestJS, Express, Fastify)
- ORM implementation details (Prisma, TypeORM)
- Event-sourcing infrastructure
- The `assert` or `transaction` implementations (user-provided)

For broader conceptual DDD guidance, rely on the base `domain-driven-design` skill.

## Checklist

- [ ] Bounded context identified and isolated
- [ ] Ubiquitous language in schema/type/function names
- [ ] No classes in domain/application
- [ ] One concept per file
- [ ] Aggregates own their entities and events
- [ ] Barrel `index.ts` in each folder
- [ ] Namespace imports (`import * as`)
- [ ] Zod schemas define structures, types inferred
- [ ] All invariant checks use `assert(...)`
- [ ] Ports as interfaces in `domain/ports/`
- [ ] Fixtures co-located with targets
