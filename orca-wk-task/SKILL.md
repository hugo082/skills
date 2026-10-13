---
name: orca:wk:task
description: Run the research-to-release workflow for a change that needs no PRD, as an Orca coordinator. Sequences research-questions, research, program-design, and work, each in its own Orca session, serial, in the current worktree; the user approves the design inside its session. User-invoked only.
disable-model-invocation: true
---

## Inputs

A change request, inline or as an issue identifier or link, plus an optional document destination and an optional tracking issue. Read any referenced work item.

## Setup

1. Run `orca skills list` and load the Orca skills this workflow needs: orchestration, worktrees and terminals, and the project's issue tracker.
2. Resolve the document destination: the prompt or the repo convention for design documents. It applies to the research questions, research, and design. If none is found, ask the user and stop.
3. Resolve the tracking issue: the one given in the prompt or linked to the current worktree. If none exists, create one in the project's issue tracker titled after the change and link the current worktree to it.
4. Create one Run for the change.

## Resume

Before starting any stage, inventory:

- Live workers from a previous invocation: adopt or settle them, never duplicate them.
- Research questions, research, and design at the destination.
- The tracking issue's **Next action** and **Design handoff**.
- The current worktree's PR, and whether it is merged to the default branch.

Start at the first incomplete stage. A document present at the destination whose Dispatch did not settle succeeded reopens its stage with that document as input.

## Stages

Serial, one active Dispatch at a time, one fresh session per stage, all in the current worktree.

| #   | Stage              | Skill                | Placement                        | Task and terminal title |
| --- | ------------------ | -------------------- | -------------------------------- | ----------------------- |
| 1   | Research questions | `research-questions` | current worktree, fresh terminal | `Research questions`    |
| 2   | Research           | `research`           | current worktree, fresh terminal | `Research`              |
| 3   | Design             | `program-design`     | current worktree, fresh terminal | `Design`                |
| 4   | Work               | `work`               | current worktree, fresh terminal | `Implementation`        |

### Merge gate

After stage 4, check whether the default branch contains the PR. If not: release the settled worker, report the state and PR link, tell the user to re-invoke `/orca:wk:task` after merging, and end the turn.

## Task specs

Follow the Orca Task-spec contract. Each spec is self-contained and includes:

- **Skill:** the skill to invoke, with its process and exit criteria.
- **Context:** absolute paths or links to every upstream document and issue the stage consumes, including the tracking issue, except for Research.
- **Destination:** the exact path or issue for the output. Write there directly.
- **Human in the loop:** questions, review rounds, and approval happen with the user in the worker's own terminal. Mark the workspace unread while waiting on the user. `ask` is for coordination problems only: a missing document, an unreadable path. Research questions and Research run without the user: no questions, no review rounds, no approval.
- **Completion:** `worker_done` succeeded once the artifact is at its destination and, for Design and Work, the user has approved it; otherwise failed, with the reason in the body.

Stage-specific content:

- **Research questions:** the change request; the tracking issue.
- **Research:** the research questions path only. Name no other document, issue, or description of the change in the spec or the task title.
- **Design:** the change request, research path, and the tracking issue. No PRD and no architecture document exist; the architecture is explicitly waived. Write the design document at the destination and update the tracking issue's Design handoff and Next action. Change no other repository file and commit nothing.
- **Work:** the approved design and the tracking issue; commit on the current branch, including the design documents when the destination is inside the repository; open a PR targeting the default branch; attach it to the tracking issue with a completion comment and move the issue to review; the user validates in the session.

Pass a model or effort only when the user named them.

## After each settlement

Verify the artifact at the destination before releasing. A succeeded report without it reopens the stage with the same inputs. Update the worktree comment at each stage boundary.

## Exit criteria

Per invocation:

- Every Dispatch in the Run settled and released; no reclaimable terminal.
- Every artifact produced is at the destination.
- The report names, per stage reached, the outcome, the artifact path, issue, or PR, the gate the run stopped at, and any unresolved blocker.

Workflow complete when the PR is merged to the default branch and the tracking issue is in its review or done state.
