---
name: orca:wk:prd
description: Run the PRD-to-release workflow as an Orca coordinator. Sequences prd, system-architecture, v-slices, then per slice program-design and work, each in its own Orca session, serial, approved by the user inside each session. User-invoked only.
disable-model-invocation: true
---

## Inputs

A feature request, inline or as an issue identifier or link, plus an optional document destination. Read any referenced work item.

## Setup

1. Resolve the Orca executable per the `orchestration` skill stub and run `ORCA skills get orchestration`. Load `--reference references/placement-and-remote.md` before the first slice worktree and `references/recovery-and-cleanup.md` on a failed `worker-start`, an uncertain release, or a live worker found during resume.
2. Resolve the destination: the prompt, then `AGENTS.md`, `CLAUDE.md`, or the repo convention for product and design documents. It applies to the PRD, architecture, roadmap, and slice briefs. If the convention publishes slices as issues, briefs go there. If no destination is found, ask the user and stop.
3. Run `ORCA status --json` and create one Run for the feature.

## Resume

Before starting any stage, inventory:

- `worker-list --include-remote`: a live stage session from a previous invocation is adopted or settled, not duplicated.
- PRD, architecture, roadmap at the destination, each ending with its approval line.
- Each slice brief's **Next action** and **Design handoff**.
- Slice worktrees (`ORCA worktree list`), their PRs, and which are merged to main.

Start at the first incomplete stage. A document present without an approval line reopens its stage with that document as input.

## Stages

Serial, one active Dispatch at a time, one fresh session per stage. Stages 1 to 3 run in the current worktree (the planning worktree). Stages 4 and 5 run per slice in that slice's own top-level worktree.

| #   | Stage        | Skill                 | Placement                                            | Output                                          |
| --- | ------------ | --------------------- | ---------------------------------------------------- | ----------------------------------------------- |
| 1   | PRD          | `prd`                 | `--worktree current`                                 | PRD at destination                              |
| 2   | Architecture | `system-architecture` | `--worktree current`                                 | Architecture at destination                     |
| 3   | Slices       | `v-slices`            | `--worktree current`                                 | Roadmap, one brief per slice, PR to main        |
| 4   | Slice design | `program-design`      | `--worktree new-top-level --name <slice>`            | Design and stubs on slice branch, brief updated |
| 5   | Slice work   | `work`                | `--worktree id:<slice worktree id>` (fresh terminal) | PR to main                                      |

### Merge gate

Check whether main contains the PR. If not: release the settled worker, report the state and PR link, tell the user to re-invoke `/orca:wk:prd` after merging, and end the turn.

### Planning gate

After stage 3, apply the merge gate to the planning PR before creating any slice worktree. Skip when the destination is outside the repository and forward links instead.

### Per slice, in roadmap order

1. Start the design session in a new top-level worktree named after the slice. Record the worktree id from the receipt. If it settles `failed` because the brief is obsolete, run a `v-slices` refresh session for that slice in the planning worktree, apply the planning gate, and restart this step. On success verify: design and stubs committed on the slice branch, brief's Design handoff and Next action updated. Release the worker.
2. Start the implementation session in the same worktree by its exact id selector. On success verify: PR against main, checks reported. Release the worker.
3. Apply the merge gate, then move to the next slice.

## Task specs

Follow the Orca Task-spec contract: Target, Change, Constraints, Ownership, Observable acceptance. Each spec is self-contained and includes:

- **Skill:** the skill to invoke, with its process and exit criteria.
- **Context paths:** absolute paths or links to every upstream document the stage consumes.
- **Destination:** the exact path or issue for the output. Write there directly.
- **Human in the loop:** questions, review rounds, and approval happen with the user in the worker's own terminal. Run `ORCA worktree set --worktree active --unread --json` while waiting on the user. `ask` is for coordination problems only: a missing document, an unreadable path, an unresolved prerequisite from another slice.
- **Approval record:** after approval, append `Approved by <user> on <date>` as the document's last line; for designs, fill the brief's Design handoff.
- **Completion:** `worker_done --outcome succeeded` after approval is recorded and the artifact is at its destination; otherwise `--outcome failed` with the reason in the body.

Stage-specific content:

- **PRD:** the feature request.
- **Architecture:** PRD path.
- **Slices:** PRD and architecture paths; whether briefs publish as issues; after approval, commit the planning documents on the planning branch and open a PR to main, reporting its link in `worker_done`.
- **Design:** PRD, architecture, roadmap, and this slice's brief. First compare the brief's boundary, dependencies, and prerequisites against current main; if obsolete, `worker_done --outcome failed` naming what changed. Otherwise commit the design and stubs on the slice branch and update the brief's Design handoff and Next action.
- **Work:** the approved design and brief; commit on the slice branch; open a PR targeting main; report checks; the user validates in the session.

Pass `--model` or `--effort` only when the user named them.

## After each settlement

Verify the artifact and approval line at the destination before releasing. A `succeeded` report without them reopens the stage with the same inputs. Update the planning worktree card with `worktree set --comment` at each stage boundary.

## Exit criteria

Per invocation:

- Every Dispatch in the Run settled and released; no reclaimable terminal.
- Every artifact produced is at the destination with its approval line.
- The report names, per stage and slice reached, the outcome, the artifact path or PR, the gate the run stopped at, and any unresolved blocker.

Workflow complete when every slice PR is merged to main, in roadmap order.
