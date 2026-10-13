---
name: orca:wk:prd
description: Run the PRD-to-release workflow as an Orca coordinator. Sequences research-questions, research, prd, system-architecture, v-slices, then per slice program-design and work, each in its own Orca session, serial; the user approves every stage after research inside its session. User-invoked only.
disable-model-invocation: true
---

## Inputs

A feature request, inline or as an issue identifier or link, plus an optional document destination and an optional tracking issue. Read any referenced work item.

## Setup

1. Run `orca skills list` and load the Orca skills this workflow needs: orchestration, worktrees and terminals, and the project's issue tracker.
2. Resolve the document destination: the prompt or the repo convention for product and design documents. It applies to the research questions, research, PRD, architecture, and roadmap. If none is found, ask the user and stop.
3. Resolve the tracking issue: the one given in the prompt or linked to the current worktree. If none exists, create one in the project's issue tracker titled after the feature and link the planning worktree to it.
4. Create one Run for the feature.

## Resume

Before starting any stage, inventory:

- Live workers from a previous invocation: adopt or settle them, never duplicate them.
- Research questions, research, PRD, architecture, roadmap at the destination.
- The tracking issue's child issues, with each one's **Next action** and **Design handoff**.
- Slice worktrees, their PRs, and which are merged to main.

Start at the first incomplete stage. A document present at the destination whose Dispatch did not settle succeeded reopens its stage with that document as input.

## Stages

Serial, one active Dispatch at a time, one fresh session per stage. Stages 1 to 5 run in the current worktree (the planning worktree). Stages 6 and 7 run per slice in that slice's own worktree.

| #   | Stage              | Skill                 | Placement                           | Task and terminal title      |
| --- | ------------------ | --------------------- | ----------------------------------- | ---------------------------- |
| 1   | Research questions | `research-questions`  | planning worktree, fresh terminal   | `Research questions`         |
| 2   | Research           | `research`            | planning worktree, fresh terminal   | `Research`                   |
| 3   | PRD                | `prd`                 | planning worktree, fresh terminal   | `PRD`                        |
| 4   | Architecture       | `system-architecture` | planning worktree, fresh terminal   | `Architecture`               |
| 5   | Slices             | `v-slices`            | planning worktree, fresh terminal   | `Slices`                     |
| 6   | Slice design       | `program-design`      | new slice worktree (see below)      | `Slice <n> - Design`         |
| 7   | Slice work         | `work`                | same slice worktree, fresh terminal | `Slice <n> - Implementation` |

Slice worktree: a child of the planning worktree in Orca lineage, git-based on the repo default branch, named after the slice, display name `Slice <n> - <slice outcome>`, linked to the slice issue.

### Merge gate

Check whether the default branch contains the PR. If not: release the settled worker, report the state and PR link, tell the user to re-invoke `/orca:wk:prd` after merging, and end the turn.

### Planning gate

After stage 5, apply the merge gate to the planning PR before creating any slice worktree. Skip when the destination is outside the repository and forward links instead.

### Per slice, in roadmap order

1. Start the design session in the slice worktree. If it settles `failed` because the brief is obsolete, run a `v-slices` refresh session for that slice in the planning worktree, apply the planning gate, and restart this step. On success verify: design at the destination, slice worktree unchanged, slice issue's Design handoff and Next action updated. Release the worker.
2. Start the implementation session in the same worktree. On success verify: PR against the default branch attached to the slice issue, checks reported. Release the worker.
3. Apply the merge gate, then move to the next slice.

## Task specs

Follow the Orca Task-spec contract. Each spec is self-contained and includes:

- **Skill:** the skill to invoke, with its process and exit criteria.
- **Context:** absolute paths or links to every upstream document and issue the stage consumes, including the tracking issue, except for Research.
- **Destination:** the exact path or issue for the output. Write there directly.
- **Human in the loop:** questions, review rounds, and approval happen with the user in the worker's own terminal. Mark the workspace unread while waiting on the user. `ask` is for coordination problems only: a missing document, an unreadable path, an unresolved prerequisite from another slice. Research questions and Research run without the user: no questions, no review rounds, no approval.
- **Completion:** `worker_done` succeeded once the artifact is at its destination and, for stages after research, the user has approved it; otherwise failed, with the reason in the body.

Stage-specific content:

- **Research questions:** the feature request; the tracking issue.
- **Research:** the research questions path only. Name no other document, issue, or description of the feature in the spec or the task title.
- **PRD:** the feature request; research path; the tracking issue.
- **Architecture:** PRD and research paths.
- **Slices:** PRD, research, and architecture paths; the tracking issue. After approval, publish each slice brief as a child issue of the tracking issue titled `Slice <n> - <outcome>`, record each issue in the roadmap, then commit the planning documents on the planning branch and open a PR to the default branch, reporting its link in `worker_done`.
- **Design:** PRD, research, architecture, roadmap, and this slice's issue. First compare the brief's boundary, dependencies, and prerequisites against the current default branch; if obsolete, settle failed naming what changed. Otherwise write the design document at the destination and update the slice issue's Design handoff and Next action. Change no repository file and commit nothing.
- **Work:** the approved design and slice issue; commit on the slice branch; open a PR targeting the default branch; attach it to the slice issue with a completion comment and move the issue to review; the user validates in the session.

Pass a model or effort only when the user named them.

## After each settlement

Verify the artifact at the destination before releasing. A succeeded report without it reopens the stage with the same inputs. Update the planning worktree comment at each stage boundary.

## Exit criteria

Per invocation:

- Every Dispatch in the Run settled and released; no reclaimable terminal.
- Every artifact produced is at the destination.
- The report names, per stage and slice reached, the outcome, the artifact path, issue, or PR, the gate the run stopped at, and any unresolved blocker.

Workflow complete when every slice PR is merged to the default branch, in roadmap order, and every slice issue is in its review or done state.
