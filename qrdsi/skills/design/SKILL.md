---
name: design
description: |
  Interactive DDD design facilitator. Defines DOMAIN / APP boundary changes only — bounded contexts, aggregates, entities, value objects,
  domain events, ports, relations, domain file tree shifts.
  No infra, no app wiring (those → /qrdsi-structure). 
  Triggers: "/qrdsi:design .qrdsi/<folder>/".
argument-hint: ".qrdsi/<folder>/"
disable-model-invocation: true
---

# qrdsi-design — domain shape & boundaries

Caveman tone. Preserve identifiers/types verbatim.

## §G GOAL

Interview me relentlessly about every aspect of this plan until we reach a shared understanding. Walk down each branch of the design tree, resolving dependencies between decisions one-by-one. Lock the **domain** model. Where we going @ the *domain* layer: bounded contexts, aggregates, events, ports, relations, domain file tree. ⊥ infra, ⊥ adapters, ⊥ DB tables, ⊥ HTTP — those → structure step.

## §I INPUTS

- `$ARGUMENTS` ∈ {inline text, `#N`, GH URL, file path}
- If `#N` or URL → `gh issue view <N> --comments`
- If file path → read full
- `.qrdsi/<folder>/questions/*.md` (scope context)
- `.qrdsi/<folder>/research/*.md` (factual foundation, numeric order)
- `.qrdsi/<folder>/design.md` (if exists → revision)
- Load `domain-driven-design` skill if available

## §C CONSTRAINTS

- Scope: domain layer only (entities, VOs, aggregates, domain services, domain events, ports/interfaces, repos as ports)
- ⊥ infra adapters, ⊥ DB schema, ⊥ HTTP routes, ⊥ framework code, ⊥ file impl bodies
- Target ~200–300 lines
- Interactive: ONE question per turn, wait for answer
- Decisions ! human-confirmed before write
- File tree: domain dirs only

## §V INVARIANTS

V1: ∀ aggregate → single transactional boundary, ⊥ cross-aggregate ACID
V2: ∀ aggregate root → guards own invariants
V3: cross-aggregate communication via domain events | ids, ⊥ refs
V4: ports declared in domain, implementations live outside (infra)
V5: ubiquitous language consistent across context
V6: bounded context boundary explicit ∴ if change spans 2 contexts → flag
V7: ⊥ leak infra concerns into design (no ORM, no HTTP, no SQL)
V8: ONE question / turn, ⊥ batch

## §T STEPS

```
id|status|task
T1|.|read all research/*.md + all questions/*.md (numeric order)
T2|.|fetch input (gh issue | file | inline)
T3|.|if design.md exists → revision mode, note trigger
T4|.|present understanding: current domain state + desired end state + relevant patterns
T5|.|identify bounded context(s) touched
T6|.|map proposed domain changes: aggregates ± entities ± VOs ± events ± ports ± relations
T7|.|ask ONE focused question (3–6 total typically) → wait → integrate → next
T8|.|present 2–3 named approaches with trade-offs + your recommendation → human picks
T9|.|DDD review (load skill): aggregate boundary, invariant placement, event vs query, anemic model check
T10|.|surface DDD concerns as final 1-per-turn questions
T11|.|write design.md once all resolved
T12|.|update related SPEC.md if relevant
T13|.|emit handoff
```

## §F OUTPUT FORMAT

`.qrdsi/<folder>/design.md`:

```markdown
---
id: <slug>
designed: YYYY-MM-DD
commit: <git hash>
---

# Design: [Feature Name]

<!-- revision only -->
## Revision Note
[1–3 sentences: trigger + what changed]

## Executive Summary
[3–5 sentences: domain change, why, chosen approach, main risk, mitigation]

## Bounded Context(s)
- Primary: [name] — role/purpose
- Affected: [names] — touchpoints
- Ubiquitous language: [term → definition]

## Domain File Tree

\`\`\`
src/domain/
├── <context>/                    (new | mod)
│   ├── <aggregate>/              (new) [root + invariants]
│   │   ├── <Aggregate>.ts        (new)
│   │   ├── events/               (new)
│   │   │   └── <Event>.ts        (new)
│   │   └── ports/                (new)
│   │       └── <Port>.ts         (new)
│   └── shared/                   (mod) [VOs]
└── ...
\`\`\`

## Domain Model Changes

### Aggregates
- `<AggregateName>` (new | mod | unchanged)
  - Root: `<Entity>`
  - ! [invariants list...]
  - Commands: [commands list...]
  - Emits: `<Event>`, ...

### Entities
- `<Entity>` — identity, lifecycle, owner aggregate

### Value Objects
- `<VO>` — immutable, equality by value, validation rules

### Domain Events
- `<Event>` — payload shape, emitter, intent (past tense ! "OrderPlaced", ⊥ "PlaceOrder")

### Ports (domain interfaces)
- `<PortName>` — purpose, signature shape (interface only, no impl)
  - Consumers: [aggregates/services]
  - Implementations live: → structure step

### Domain Services
- `<Service>` — when entity logic spans aggregates

### Relations
- `<A>` → `<B>` (event | id ref | composition)
- Cardinality, ownership direction

## Decisions

### Q1 - [Name]
[1–2 paragraphs: domain shape + trade-offs + decision + why]

Representative shape (illustrative):
\`\`\`ts
// pseudo-code only domain shape — no infra, no impl bodies
interface OrderRepository { ... }
class Order { ... }
\`\`\`

_Avoid_: [Rejected approaches contrasts...]

### Q2 - [Name]
[Same shape...]

## Patterns to Follow
- Pattern: [name] — `path/example.ext:L42`

## Patterns to Avoid
- Avoid: [desc] — `path/bad.ext:L13` (reason)

## Out of Scope
- [infra, persistence, UI deferred → structure step or future]

## DDD Review Notes
[aggregate boundary check, event vs cmd, invariant placement, anemic check]

## Open Questions
[ideally empty]

```

## §A ANTI-PATTERNS

- ❌ Writing design.md without asking questions → skips alignment
- ❌ Batch 5 Qs in 1 msg → kills back-and-forth
- ❌ Including SQL / HTTP / ORM / framework code → infra leak
- ❌ Full impl bodies → that's plan/structure
- ❌ Anemic model (data bag, no behavior) → DDD violation
- ❌ Cross-aggregate FK in domain → use id + event
- ✅ "Two patterns for X: [A] file:L42, [B] file:L88. Which?"
- ✅ "DDD review flags aggregate boundary wide — split?"

## §H HANDOFF

```
Artifact: .qrdsi/<folder>/design.md
Summary: <domain shape locked + main decisions>
Next: /qrdsi:structure .qrdsi/<folder>/
```

Alt-Next (loop): `/qrdsi:research .qrdsi/<folder>/` if facts missing.
