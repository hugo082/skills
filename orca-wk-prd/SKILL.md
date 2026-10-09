---
name: orca:wk:prd
description: Run the PRD-to-release workflow as an Orca coordinator. Sequences prd, system-architecture, v-slices, then per slice program-design and work, each in its own Orca session, serial, approved by the user inside each session. User-invoked only.
disable-model-invocation: true
---

## Inputs

A feature request, inline or as an issue identifier or link, plus an optional document destination and an optional tracking issue. Read any referenced work item.

## Setup

1. Run `orca skills list` and load the Orca skills this workflow needs: orchestration, worktrees and terminals, and the project's issue tracker.
2. Resolve the document destination: the prompt, then `AGENTS.md`, `CLAUDE.md`, or the repo convention for product and design documents. It applies to the PRD, architecture, and roadmap. If none is found, ask the user and stop.
3. Resolve the tracking issue: the one given in the prompt or linked to the current worktree. If none exists, create one in the project's issue tracker titled after the feature and link the planning worktree to it.
4. Create one Run for the feature.

## Resume

Before starting any stage, inventory:

- Live workers from a previous invocation: adopt or settle them, never duplicate them.
- PRD, architecture, roadmap at the destination, each ending with its approval line.
- The tracking issue's child issues, with each one's **Next action** and **Design handoff**.
- Slice worktrees, their PRs, and which are merged to main.

Start at the first incomplete stage. A document present without an approval line reopens its stage with that document as input.

## Stages

Serial, one active Dispatch at a time, one fresh session per stage. Stages 1 to 3 run in the current worktree (the planning worktree). Stages 4 and 5 run per slice in that slice's own worktree.

| #   | Stage        | Skill                 | Placement                           | Task and terminal title      |
| --- | ------------ | --------------------- | ----------------------------------- | ---------------------------- |
| 1   | PRD          | `prd`                 | planning worktree, fresh terminal   | `PRD`                        |
| 2   | Architecture | `system-architecture` | planning worktree, fresh terminal   | `Architecture`               |
| 3   | Slices       | `v-slices`            | planning worktree, fresh terminal   | `Slices`                     |
| 4   | Slice design | `program-design`      | new slice worktree (see below)      | `Slice <n> - Design`         |
| 5   | Slice work   | `work`                | same slice worktree, fresh terminal | `Slice <n> - Implementation` |

Slice worktree: a child of the planning worktree in Orca lineage, git-based on the repo default branch, named after the slice, display name `Slice <n> - <slice outcome>`, linked to the slice issue.

### Merge gate

Check whether the default branch contains the PR. If not: release the settled worker, report the state and PR link, tell the user to re-invoke `/orca:wk:prd` after merging, and end the turn.

### Planning gate

After stage 3, apply the merge gate to the planning PR before creating any slice worktree. Skip when the destination is outside the repository and forward links instead.

### Per slice, in roadmap order

1. Start the design session in the slice worktree. If it settles `failed` because the brief is obsolete, run a `v-slices` refresh session for that slice in the planning worktree, apply the planning gate, and restart this step. On success verify: design and stubs committed on the slice branch, slice issue's Design handoff and Next action updated. Release the worker.
2. Start the implementation session in the same worktree. On success verify: PR against the default branch attached to the slice issue, checks reported. Release the worker.
3. Apply the merge gate, then move to the next slice.

## Task specs

Follow the Orca Task-spec contract. Each spec is self-contained and includes:

- **Skill:** the skill to invoke, with its process and exit criteria.
- **Context:** absolute paths or links to every upstream document and issue the stage consumes, including the tracking issue.
- **Destination:** the exact path or issue for the output. Write there directly.
- **Human in the loop:** questions, review rounds, and approval happen with the user in the worker's own terminal. Mark the workspace unread while waiting on the user. `ask` is for coordination problems only: a missing document, an unreadable path, an unresolved prerequisite from another slice.
- **Approval record:** after approval, append `Approved by <user> on <date>` as the document's last line; for designs, fill the slice issue's Design handoff.
- **Completion:** `worker_done` succeeded after approval is recorded and the artifact is at its destination; otherwise failed, with the reason in the body.

Stage-specific content:

- **PRD:** the feature request; the tracking issue.
- **Architecture:** PRD path.
- **Slices:** PRD and architecture paths; the tracking issue. After approval, publish each slice brief as a child issue of the tracking issue titled `Slice <n> - <outcome>`, record each issue in the roadmap, then commit the planning documents on the planning branch and open a PR to the default branch, reporting its link in `worker_done`.
- **Design:** PRD, architecture, roadmap, and this slice's issue. First compare the brief's boundary, dependencies, and prerequisites against the current default branch; if obsolete, settle failed naming what changed. Otherwise commit the design and stubs on the slice branch and update the slice issue's Design handoff and Next action.
- **Work:** the approved design and slice issue; commit on the slice branch; open a PR targeting the default branch; attach it to the slice issue with a completion comment and move the issue to review; the user validates in the session.

Pass a model or effort only when the user named them.

## After each settlement

Verify the artifact and approval line at the destination before releasing. A succeeded report without them reopens the stage with the same inputs. Update the planning worktree comment at each stage boundary.

## Exit criteria

Per invocation:

- Every Dispatch in the Run settled and released; no reclaimable terminal.
- Every artifact produced is at the destination with its approval line.
- The report names, per stage and slice reached, the outcome, the artifact path, issue, or PR, the gate the run stopped at, and any unresolved blocker.

Workflow complete when every slice PR is merged to the default branch, in roadmap order, and every slice issue is in its review or done state.
