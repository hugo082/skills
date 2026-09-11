# What is QRSPI?

QRSPI is an acronym for an agentic coding workflow: **Question → Research → Design → Structure → Plan → Implement**.

It is an expansion of the earlier **RPI** (Research → Plan → Implement) workflow that Dex (co-founder of HumanLayer) developed and teaches. The tool that implements this workflow is called **Riptide** (built by HumanLayer). Vaibhav (founder of Boundary / BAML) is the primary practitioner shown in the transcripts.

---

## The Problem QRSPI Solves

When you hand an agentic coding task directly to a model and say "go build this", it carries assumptions through the entire pipeline. A wrong assumption made during research pollutes the plan, which pollutes the implementation. You can end up thousands of lines into a codebase before discovering the assumption was wrong, forcing you to redo all prior work.

QRSPI front-loads the expensive, hard-to-reverse thinking. Each phase produces an artifact that the next phase consumes. The human reviews and can redirect between phases rather than at the end.

> "Focus on the highest leverage parts of your pipeline." — Dex, referencing the Aug 5th AI That Works episode

---

## The Six Phases

### Q — Question (Research Questions)

**Not** a clarification dialogue with the user. This is a **generated list of objective questions** about the current codebase derived from the ticket.

- Input: the ticket / spec / PRD
- The tool (Riptide) does a lightweight exploration of the codebase and generates specific, factual questions like: "Trace how X works", "Find all patterns for Y", "What is the relationship between A and B?"
- These questions are intentionally **context-free** — the researcher agent that will answer them must not see the ticket or know what is being built. This keeps research objective and prevents the model from baking in implementation assumptions.
- The human can review, delete, or add questions before proceeding.

> "The skilled RPI people would read the ticket, translate it into objective questions... The challenge was we wanted it to work well for the lazy folks as well." — Dex

### R — Research

**Pure fact-gathering** about the current state of the system. No design, no opinions.

- Input: the objective questions from Q
- The agent reads the codebase, external docs, blog posts, and writes **learning tests** (code you run to prove how a system actually behaves, not code to ship — from Michael Feathers' *Working Effectively With Legacy Code*)
- Output: a research document that compresses the truth about the system today
- Multiple research agents can run in parallel on different parts of the codebase

> "Research... is really to compress truth, to compress the state of the world today... you want it to stay super, super objective." — Dex

> "Before we do any amount of work into the question, we're going to produce some research that tries to get some facts about the system. It doesn't do any effort in terms of actually understanding it... It's purely about gathering the current status of the system." — Vaibhav

### D — Design (Design Discussion)

An **interactive document** where design decisions are made. This is the most human-intensive phase.

- Input: the ticket + research document
- The agent produces a design discussion that surfaces trade-offs, options (e.g. Option A vs Option B), and decisions
- The human reads it, iterates, pushes back, and makes design calls — Claude does not own the design
- This phase can be long (Vaibhav described spending ~2.5 hours in design discussion for a complex feature)

> "You saw in the design doc that that was missing detail and you were like, hey, we need to add that detail to this design doc so that we have clarity and alignment." — Dex

> "Claude did not come up with this. I had to come up with this." — Vaibhav on a design decision made during this phase

### S — Structure (Design Document / Ticket 2)

**Distillation** of all design discussion decisions into a clean, PRD-style document.

- Input: the design discussion
- Output: a new refined ticket (sometimes called "ticket 2") that reads as if the team had all the design knowledge from day one — no implementation noise, no dead ends
- The human reads this document end-to-end to verify coherence and catch any remaining design mistakes before implementation begins
- Dex describes it as: "take all those decisions and distill them out into another high-level, almost PRD-style" document

> "Once I found the design decision, then I told it a very specific task: take all the design discussion and literally just create a new ticket as if we had all these learnings from day one." — Vaibhav

### P — Plan (Implementation Plan)

A concrete, ordered implementation plan derived from the structure document.

- Input: the structure doc / ticket 2
- Output: a step-by-step implementation plan the agent can execute
- At this point the plan is grounded in verified facts (from research) and settled design decisions (from D/S), so it should not need to be invalidated mid-implementation

### I — Implement

Write the code.

- Input: the plan + research doc + structure doc as context
- The agent works through the plan steps
- Because all assumptions were validated and all design decisions were settled in prior phases, implementation should be largely mechanical

---

## Key Properties of the Workflow

**Separate context windows per phase.** The researcher must not see the ticket (to stay objective). Each phase gets a fresh context engineered specifically for its job.

**Human checkpoints between phases.** The workflow is not fully automated. The human reviews the research questions, reads the research doc, makes design decisions, and reads ticket 2 before implementation begins.

**Parallelism in research.** Multiple research agents can run simultaneously on different parts of the codebase — Dex mentions running 3–4 research documents in parallel.

**Learning tests as part of research.** For black-box dependencies (closed-source APIs, external SDKs), "learning tests" — small throwaway programs that prove how the system actually behaves — are written during the Research phase to validate assumptions before they contaminate the plan.

**Results.** Vaibhav shipped a 15,000-line PR adding Rust support to BAML using this workflow, hand-writing only a handful of lines himself. The stated goal is 2–3× speed improvement on complex features.

---

## Riptide

Riptide is HumanLayer's tool (rebuilt from CodeLayer) that implements the QRSPI workflow as a UI. It:
- Takes a ticket and generates research questions (Q phase automation)
- Manages the agentic pipeline through phases
- Adds artifact links to PRs pointing to the research docs, design docs, and ticket 2
- Enforces the fresh-context discipline (e.g. research agent does not receive the ticket)

The tool is described as being in experimental preview during the March 2026 episodes.

---

## Sources

- `2026-02-10-agentic-backpressure-deep-dive-transcript.md` — core explanation of RPI + learning tests
- `2026-01-27-no-vibes-allowed-transcript.md` — Riptide demo, research questions phase, fresh-context discipline
- `2026-03-31-no-vibes-march-transcript.md` — full live walkthrough of Q→R→D→S→P→I on a real BAML feature, including design discussion, ticket 2
- `2025-12-23-founding-humanlayer-transcript.md` — origin story, 15k-line BAML PR result
