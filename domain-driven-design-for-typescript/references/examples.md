# DDD TypeScript Code Examples

## Value Objects

Immutable objects defined by attributes, not identity.

```ts
// domain/value-objects/money.ts
import { z } from "zod";
import { assert } from "radashi";

export const Currency = z.enum(["EUR", "USD"]);
export type Currency = z.output<typeof Currency>;

export const Money = z.object({
  amount: z.number().finite().nonnegative(),
  currency: Currency
});
export type Money = z.output<typeof Money>;

export const createMoney = (input: z.input<typeof Money>): Money =>
  Money.parse(input);

export const addMoney = (a: Money, b: Money): Money => {
  assert(a.currency === b.currency, "Currencies must match");
  return { amount: a.amount + b.amount, currency: a.currency };
};

export const multiplyMoney = (money: Money, quantity: number): Money => {
  assert(quantity >= 0, "Quantity must be non-negative");
  return { amount: money.amount * quantity, currency: money.currency };
};
```

```ts
// domain/value-objects/address.ts
import { z } from "zod";

export const Address = z.object({
  street: z.string().min(1),
  city: z.string().min(1),
  postalCode: z.string().min(1),
  country: z.string().length(2)
});
export type Address = z.output<typeof Address>;
```

```ts
// domain/value-objects/index.ts
export * from "./money.js";
export * from "./address.js";
```

---

## Domain Errors

One error per file with code and context.

```ts
// domain/errors/order-not-found.ts
export class OrderNotFound extends Error {
  readonly code = "order.not-found";

  constructor(public readonly orderId: string) {
    super(`Order ${orderId} not found`);
    this.name = "OrderNotFound";
  }
}
```

```ts
// domain/errors/order-not-editable.ts
export class OrderNotEditable extends Error {
  readonly code = "order.not-editable";

  constructor(public readonly orderId: string) {
    super(`Order ${orderId} is not editable`);
    this.name = "OrderNotEditable";
  }
}
```

```ts
// domain/errors/insufficient-inventory.ts
export class InsufficientInventory extends Error {
  readonly code = "inventory.insufficient";

  constructor(
    public readonly productId: string,
    public readonly requested: number,
    public readonly available: number
  ) {
    super(
      `Insufficient inventory for product ${productId}: requested ${requested}, available ${available}`
    );
    this.name = "InsufficientInventory";
  }
}
```

```ts
// domain/errors/index.ts
export * from "./order-not-found.js";
export * from "./order-not-editable.js";
export * from "./insufficient-inventory.js";
```

---

## Child Entities

Entities owned by an aggregate, located inside the aggregate folder.

```ts
// domain/aggregates/order/order-line.ts
import { z } from "zod";
import { Money } from "../../value-objects/index.js";

export const OrderLineId = z.string().min(1).brand<"OrderLineId">();
export type OrderLineId = z.output<typeof OrderLineId>;

export const OrderLine = z.object({
  id: OrderLineId,
  productId: z.string().min(1),
  productName: z.string().min(1),
  quantity: z.number().int().positive(),
  unitPrice: Money
});
export type OrderLine = z.output<typeof OrderLine>;

export const calculateLineTotal = (line: OrderLine): Money => ({
  amount: line.unitPrice.amount * line.quantity,
  currency: line.unitPrice.currency
});
```

---

## Domain Events

Events owned by their aggregate, located in aggregate's `events/` folder.

```ts
// domain/aggregates/order/events/order-created.ts
import { z } from "zod";
import { OrderId } from "../order.js";

export const OrderCreated = z.object({
  type: z.literal("order.created"),
  happenedAt: z.string().datetime(),
  payload: z.object({
    orderId: OrderId,
    customerId: z.string().min(1)
  })
});
export type OrderCreated = z.output<typeof OrderCreated>;
```

```ts
// domain/aggregates/order/events/order-confirmed.ts
import { z } from "zod";
import { OrderId } from "../order.js";

export const OrderConfirmed = z.object({
  type: z.literal("order.confirmed"),
  happenedAt: z.string().datetime(),
  payload: z.object({
    orderId: OrderId,
    totalAmount: z.number().nonnegative()
  })
});
export type OrderConfirmed = z.output<typeof OrderConfirmed>;
```

```ts
// domain/aggregates/order/events/order-line-added.ts
import { z } from "zod";
import { OrderId } from "../order.js";
import { OrderLineId } from "../order-line.js";

export const OrderLineAdded = z.object({
  type: z.literal("order.line-added"),
  happenedAt: z.string().datetime(),
  payload: z.object({
    orderId: OrderId,
    lineId: OrderLineId,
    productId: z.string().min(1),
    quantity: z.number().int().positive()
  })
});
export type OrderLineAdded = z.output<typeof OrderLineAdded>;
```

```ts
// domain/aggregates/order/events/index.ts
import { z } from "zod";

export * from "./order-created.js";
export * from "./order-confirmed.js";
export * from "./order-line-added.js";

import { OrderCreated } from "./order-created.js";
import { OrderConfirmed } from "./order-confirmed.js";
import { OrderLineAdded } from "./order-line-added.js";

// Discriminated union for all order events
export const OrderEvent = z.discriminatedUnion("type", [
  OrderCreated,
  OrderConfirmed,
  OrderLineAdded
]);
export type OrderEvent = z.output<typeof OrderEvent>;
```

---

## Aggregates

Aggregate root with schema, type, and behavior functions.

```ts
// domain/aggregates/order/order.ts
import { z } from "zod";
import { assert } from "radashi";
import { OrderLine, OrderLineId, calculateLineTotal } from "./order-line.js";
import { OrderCreated } from "./events/order-created.js";
import { OrderConfirmed } from "./events/order-confirmed.js";
import { OrderLineAdded } from "./events/order-line-added.js";
import { OrderNotEditable } from "../../errors/index.js";
import { addMoney, Money } from "../../value-objects/index.js";
import type { Transaction } from "@your-lib/transaction";

export const OrderId = z.string().min(1).brand<"OrderId">();
export type OrderId = z.output<typeof OrderId>;

export const OrderStatus = z.enum(["Draft", "Confirmed", "Shipped", "Cancelled"]);
export type OrderStatus = z.output<typeof OrderStatus>;

export const Order = z.object({
  id: OrderId,
  customerId: z.string().min(1),
  status: OrderStatus,
  lines: z.array(OrderLine),
  version: z.number().int().nonnegative()
});
export type Order = z.output<typeof Order>;

// Factory function
export const createOrder = (
  input: { id: OrderId; customerId: string },
  params: { transaction: Transaction; now: () => string }
): Order => {
  const order: Order = {
    id: input.id,
    customerId: input.customerId,
    status: "Draft",
    lines: [],
    version: 0
  };

  params.transaction.emit({
    type: "order.created",
    happenedAt: params.now(),
    payload: { orderId: input.id, customerId: input.customerId }
  } satisfies z.input<typeof OrderCreated>);

  return order;
};

// Behavior: add line
export const addOrderLine = (
  order: Order,
  line: OrderLine,
  params: { transaction: Transaction; now: () => string }
): Order => {
  assert(order.status === "Draft", new OrderNotEditable(order.id));

  params.transaction.emit({
    type: "order.line-added",
    happenedAt: params.now(),
    payload: {
      orderId: order.id,
      lineId: line.id,
      productId: line.productId,
      quantity: line.quantity
    }
  } satisfies z.input<typeof OrderLineAdded>);

  return {
    ...order,
    lines: [...order.lines, line],
    version: order.version + 1
  };
};

// Behavior: confirm order
export const confirmOrder = (
  order: Order,
  params: { transaction: Transaction; now: () => string }
): Order => {
  assert(order.status === "Draft", new OrderNotEditable(order.id));
  assert(order.lines.length > 0, "Order must have at least one line");

  const total = calculateOrderTotal(order);

  params.transaction.emit({
    type: "order.confirmed",
    happenedAt: params.now(),
    payload: { orderId: order.id, totalAmount: total.amount }
  } satisfies z.input<typeof OrderConfirmed>);

  return {
    ...order,
    status: "Confirmed",
    version: order.version + 1
  };
};

// Query: calculate total
export const calculateOrderTotal = (order: Order): Money => {
  assert(order.lines.length > 0, "Cannot calculate total of empty order");

  return order.lines.reduce(
    (sum, line) => addMoney(sum, calculateLineTotal(line)),
    { amount: 0, currency: order.lines[0].unitPrice.currency }
  );
};
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

---

## Ports (Interfaces)

Repository and service contracts — interfaces only, no implementations.

```ts
// domain/ports/order-repository.ts
import type { Order, OrderId } from "../aggregates/order/index.js";

export interface OrderRepository {
  findById(id: OrderId): Promise<Order | undefined>;
  findByCustomerId(customerId: string): Promise<Order[]>;
  save(order: Order, options?: { version?: number }): Promise<void>;
  delete(id: OrderId): Promise<void>;
}
```

```ts
// domain/ports/event-publisher.ts
import type { orders } from "../aggregates/index.js";

type DomainEvent = orders.events.OrderEvent; // extend with other aggregate events

export interface EventPublisher {
  publish(event: DomainEvent): Promise<void>;
  publishBatch(events: DomainEvent[]): Promise<void>;
}
```

```ts
// domain/ports/index.ts
export * from "./order-repository.js";
export * from "./event-publisher.js";
```

---

## Application Commands

Commands coordinate aggregates, validate input, and persist changes.

```ts
// application/commands/place-order.ts
import { z } from "zod";
import { assert } from "radashi";
import { orders } from "../../domain/aggregates/index.js";
import { OrderNotFound } from "../../domain/errors/index.js";
import type { OrderRepository } from "../../domain/ports/index.js";
import type { Transaction } from "@your-lib/transaction";

export const PlaceOrderInput = z.object({
  orderId: z.string().min(1)
});
export type PlaceOrderInput = z.output<typeof PlaceOrderInput>;

export const placeOrder = async (
  input: PlaceOrderInput,
  params: {
    orderRepository: OrderRepository;
    transaction: Transaction;
    now: () => string;
  }
): Promise<void> => {
  const orderId = orders.OrderId.parse(input.orderId);

  const existingOrder = await params.orderRepository.findById(orderId);
  assert(existingOrder, new OrderNotFound(orderId));

  const confirmedOrder = orders.confirmOrder(existingOrder, {
    transaction: params.transaction,
    now: params.now
  });

  await params.orderRepository.save(confirmedOrder, {
    version: existingOrder.version
  });
};
```

```ts
// application/commands/index.ts
export * from "./place-order.js";
```

---

## Fixtures

Test fixtures co-located with their target files. Export factory functions directly (import with `* as`).

```ts
// domain/aggregates/order/order.fixtures.ts
import type { Order, OrderId } from "./order.js";
import type { OrderLine } from "./order-line.js";

export const emptyDraft = (overrides?: Partial<Order>): Order => ({
  id: "order-1" as OrderId,
  customerId: "customer-1",
  status: "Draft",
  lines: [],
  version: 0,
  ...overrides
});

export const draftWithLines = (lines: OrderLine[], overrides?: Partial<Order>): Order => ({
  ...emptyDraft(overrides),
  lines
});

export const confirmed = (lines: OrderLine[], overrides?: Partial<Order>): Order => ({
  ...draftWithLines(lines, overrides),
  status: "Confirmed"
});
```

```ts
// domain/aggregates/order/order-line.fixtures.ts
import type { OrderLine, OrderLineId } from "./order-line.js";
import type { Money } from "../../value-objects/index.js";

export const standard = (overrides?: Partial<OrderLine>): OrderLine => ({
  id: "line-1" as OrderLineId,
  productId: "product-1",
  productName: "Test Product",
  quantity: 1,
  unitPrice: { amount: 10, currency: "EUR" } as Money,
  ...overrides
});

export const withQuantity = (quantity: number, overrides?: Partial<OrderLine>): OrderLine => ({
  ...standard(overrides),
  quantity
});

export const multiple = (count: number): OrderLine[] =>
  Array.from({ length: count }, (_, i) =>
    standard({
      id: `line-${i + 1}` as OrderLineId,
      productId: `product-${i + 1}`,
      productName: `Product ${i + 1}`
    })
  );
```

Usage in tests:

```ts
import * as orderFixtures from "./order.fixtures.js";
import * as lineFixtures from "./order-line.fixtures.js";

const order = orderFixtures.draftWithLines(lineFixtures.multiple(2));
```
