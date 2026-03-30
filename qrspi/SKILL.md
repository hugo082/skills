---
name: qrspi
description: QRSPI workflow — Design → Structure → Plan → Implement
argument-hint: "<step> <issue?> [arguments...]  (steps: design, structure, plan, implement)"
disable-model-invocation: true
---

# QRSPI Workflow Router

You are the router for the **QRSPI workflow** — a structured, multi-step process for going from a task description to a fully implemented feature.

**User input**: `$ARGUMENTS`

## Step 1: Parse the subcommand

Extract the **first word** (case-insensitive) and match it against the four QRSPI steps:

| Token (+ aliases)     | Step | Reference file to load    |
| --------------------- | ---- | ------------------------- |
| `design`, `d`, `1`    | 1    | `references/design.md`    |
| `structure`, `s`, `2` | 2    | `references/structure.md` |
| `plan`, `p`, `3`      | 3    | `references/plan.md`      |
| `implement`, `i`, `4` | 4    | `references/implement.md` |

**Everything after the first word** is the step-specific arguments (e.g. a file path, an issue URL, inline text). Pass them through verbatim.

## Step 2: Handle unrecognized or missing subcommand

If the first word does **not** match any token above — or if `$ARGUMENTS` is empty — do **NOT** guess. Instead, reply with the following message exactly and then **stop**:

```
I couldn't determine which QRSPI step you want to run.

Usage:
  /qrspi <step> <issue?> [arguments...]

Available steps (in order):
  1. design    (d)  — Research the codebase, surface design decisions, produce research + design artifacts
  2. structure (s)  — Map development phases and validation strategy
  3. plan      (p)  — Write the detailed technical implementation plan
  4. implement (i)  — Orchestrate implementation by dispatching phases to sub-agents

Example:
  /qrspi design Add a recovery-week generator to periodization
  /qrspi design #839
  /qrspi structure .qrspi/25-07-14-recovery-week
  /qrspi plan .qrspi/25-07-14-recovery-week
  /qrspi implement .qrspi/25-07-14-recovery-week
```

## Step 3: Load the references and execute

Once the step is identified:

1. **Infer the context** from the issue number or the provided prompt.
   ```
   gh issue view <issue-number>
   mkdir .qrspi/YY-MM-DD-<short-description>
   ```
2. **Read the matching reference file** listed in the table above. That file contains the complete instructions, rules, and output format for the step.
3. **Follow those instructions exactly.** The reference file is your sole source of truth for this step.

### Important constraints

- **Load only the one reference file for the matched step.** Do not read reference files for other steps. Each step is designed to be self-contained; loading extra context wastes tokens and risks confusion.
- **All QRSPI artifacts go in `.qrspi/YY-MM-DD-<short-description>/`.** This is defined by project rules in `AGENTS.md` and reinforced in every reference file.

## Quick reference — typical full workflow

```
/qrspi design <task or issue description>
  ↓ agent researches codebase, asks design questions
  ↓ produces .qrspi/.../research.md + design.md
  ↓ [HUMAN reviews design, resolves open questions]
/qrspi structure .qrspi/.../
  ↓ produces .qrspi/.../structure.md
  ↓ [HUMAN reviews structure]
/qrspi plan .qrspi/.../
  ↓ produces .qrspi/.../plan.md (autonomous)
/qrspi implement .qrspi/.../
  ↓ commits phases, creates PR (autonomous)
```
