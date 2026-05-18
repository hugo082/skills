---
name: structure
description: |
  App / infra structural planner. Everything OUTSIDE the domain: adapters, repositories impl, HTTP/gRPC handlers, DB schema/migrations, app services, DI wiring, config, jobs, framework code.
  Concrete code snippets + signatures + file tree. Vertical phases.
  Triggers: "/qrdsi:structure .qrdsi/<folder>/".
argument-hint: ".qrdsi/<folder>/"
disable-model-invocation: true
---

# qrdsi-structure — app/infra shape, the HOW

Caveman tone. Preserve code/paths/types verbatim.

## §G GOAL

Map *how* we get there outside domain. App layer (use cases, orchestration), infra (repos, HTTP, DB, jobs, cache, framework), config, DI. Concrete code shape + file tree. Vertical phases. ⊥ re-decide domain (locked in design.md).

## §I INPUTS

- `.qrdsi/<folder>/design.md` (domain locked)
- `.qrdsi/<folder>/research/*.md` (all, numeric order)
- `.qrdsi/<folder>/questions/*.md` (scope context, optional)
- `.qrdsi/<folder>/structure.md` (if exists → revision)

## §C CONSTRAINTS

- Scope: app + infra layers. Domain → already locked by design.md
- 2–5 vertical phases. >5 ∴ split task
- ∀ phase → independently testable slice
- Show signatures + types + file tree, ⊥ full impl bodies (those → atomic commits during implement)
- File tree: render as tree w/ `(new)` `(mod)` markers
- ~2 pages target
- Present phasing to human for buy-in before write

## §V INVARIANTS

V1: phases vertical, ⊥ horizontal layers ("all DB then all services" ⊥)
V2: ∀ phase → has validation criteria (automated + manual)
V3: ∀ phase → builds on prior, dependency explicit
V4: ⊥ revisit design decisions
V5: ⊥ touch domain dirs unless design.md mandates
V6: ports from design.md → implementations specified here
V7: domain events → infrastructure dispatch wiring specified here
V8: code snippets sketch-level, real bodies @ implement step

## §T STEPS

```
id|status|task
T1|.|read design.md + all research/*.md
T2|.|read structure.md if exists → revision mode
T3|.|enumerate app/infra surfaces: HTTP, repos, jobs, DI, migrations, config
T4|.|map port impls (from design §Ports) → infra adapters
T5|.|draft 2–5 vertical phases; each delivers testable slice
T6|.|present phasing + key signatures to human → adjust
T7|.|write structure.md (template below)
T8|.|emit handoff
```

## §F OUTPUT FORMAT

`.qrdsi/<folder>/structure.md`:

```markdown
---
id: <slug>
designed: YYYY-MM-DD
commit: <git hash>
---

# Structure: [Feature Name]

<!-- revision only -->
## Revision Note
[1–3 sentences: trigger + change]

## Overview
[1–2 sentence app/infra approach]

## Shared Types / Signatures

\`\`\`ts
// app-layer types, port impls, DTOs — cross-phase
type CreateOrderInput = { tenantId: number; ... };
declare function createOrder(input: CreateOrderInput): Promise<OrderId>;
\`\`\`

## Database Schema

\`\`\`sql
create table orders (
    id bigserial primary key,
    tenant_id integer not null,
    ...
);

-- migration: <NN>_<slug>.sql
\`\`\`

## API Surface

\`\`\`ts
// HTTP / gRPC / CLI
POST /v1/orders → 201 { id }
GET  /v1/orders/:id → 200 Order | 404
\`\`\`

## Package / File Tree

\`\`\`
src/
├── app/                              (new|mod)
│   └── orders/
│       ├── create-order.use-case.ts  (new) [orchestrates aggregate]
│       └── handlers/
│           └── order-placed.handler.ts (new) [reacts to domain event]
├── infra/                            (new|mod)
│   ├── http/
│   │   └── orders.controller.ts      (new) [POST/GET routes]
│   ├── persistence/
│   │   ├── postgres-order.repo.ts    (new) [impl OrderRepository port]
│   │   └── migrations/
│   │       └── 042_orders.sql        (new)
│   └── di/
│       └── container.ts              (mod) [bind new port]
└── config/
    └── env.ts                        (mod) [add DB url key]
\`\`\`

---

## Phase 1: [Name]
**Goal**: [testable slice — e.g. "skeleton route + mock repo returns 201"]

### Signatures

\`\`\`ts
declare function createOrderHandler(req: Req): Promise<Res>;
class InMemoryOrderRepository implements OrderRepository { ... }
\`\`\`

### Files Touched

\`\`\`
src/infra/http/
└── orders.controller.ts              (new) [POST /v1/orders, calls use case]

src/infra/persistence/
└── in-memory-order.repo.ts           (new) [stub for phase 1 e2e]
\`\`\`

### Sketch (where intent ⊥ obvious from tree)

\`\`\`ts
// src/app/orders/create-order.use-case.ts
export class CreateOrderUseCase {
  constructor(private repo: OrderRepository) {}
  async exec(input: CreateOrderInput): Promise<OrderId> {
    // validate → new Order(...) → repo.save → return id
  }
}
\`\`\`

### Validation
- [ ] `pnpm test src/app/orders` — use case unit
- [ ] `curl POST /v1/orders` → 201 w/ id
- [ ] manual: route registered, DI binding resolves

---

## Phase 2: [Name]
**Goal**: [next vertical slice]
**Depends on**: Phase 1

### Signatures
\`\`\`ts
class PostgresOrderRepository implements OrderRepository { ... }
\`\`\`

### Files Touched
\`\`\`
src/infra/persistence/
├── postgres-order.repo.ts            (new) [real impl]
└── migrations/
    └── 042_orders.sql                (new)
\`\`\`

### Validation
- [ ] migration up/down clean
- [ ] integration test against real Postgres
- [ ] swap DI binding → e2e green

---

(2–5 phases)

## Testing Strategy
[unit per use case, integration per repo, e2e per route]

## Risk Notes
[tricky migrations, ordering, concurrency, feature flags]

## Out of Scope
- [deferred infra, adjacent refactors, framework upgrades]
```

## §A ANTI-PATTERNS

- ❌ Phase 1 "all DB" → horizontal layer
- ❌ 8 phases → over-decompose, split task
- ❌ Full impl bodies → that's the commit during implement
- ❌ Touching domain dirs without design.md mandate
- ❌ Flat bullet list of files (no tree) → harder to read
- ✅ Phase 1 mock repo + route wired → testable slice
- ✅ Phase 2 real repo + migration → builds on phase 1

## §H HANDOFF

```
Artifact: .qrdsi/<folder>/structure.md
Summary: <N phases; path forward + validation>
Next: /qrdsi:implement .qrdsi/<folder>/
```

Alt-Next (loop): `/qrdsi:design .qrdsi/<folder>/` if phasing exposed design flaw.
