---
name: orca:wk:prd
description: Run the PRD-to-release workflow as an Orca coordinator. Sequences prd, system-architecture, v-slices, then per slice program-design and work, each in its own Orca session, serial, approved by the user inside each session. User-invoked only.
disable-model-invocation: true
---

## Inputs

A feature request, inline or as an issue identifier or link, plus an optional document destination and an optional tracking issue. Read any referenced work item.

## Setup

1. Resolve the Orca executable per the `orchestration` skill stub and run `ORCA skills get orchestration` and `ORCA skills get orca-linear`. Load `--reference references/placement-and-remote.md` before the first slice worktree and `references/recovery-and-cleanup.md` on a failed `worker-start`, an uncertain release, or a live worker found during resume.
2. Resolve the destination: the prompt, then `AGENTS.md`, `CLAUDE.md`, or the repo convention for product and design documents. It applies to the PRD, architecture, and roadmap. Slice briefs are published as Linear issues. If no destination is found, ask the user and stop.
3. Resolve the tracking issue: the one given in the prompt or linked to the current worktree (`ORCA linear issue --current --json`). If none, create it with `ORCA linear create --title "<feature>"`, using the team from the repo convention or the user, and link the planning worktree with `ORCA worktree set --worktree active --linear-issue <id> --json`.
4. Run `ORCA status --json` and create one Run for the feature.

## Resume

Before starting any stage, inventory:

- `worker-list --include-remote`: a live stage session from a previous invocation is adopted or settled, not duplicated.
- PRD, architecture, roadmap at the destination, each ending with its approval line.
- The tracking issue's child issues, and each one's **Next action** and **Design handoff**.
- Slice worktrees (`ORCA worktree list`), their PRs, and which are merged to main.

Start at the first incomplete stage. A document present without an approval line reopens its stage with that document as input.

## Stages

Serial, one active Dispatch at a time, one fresh session per stage. Stages 1 to 3 run in the current worktree (the planning worktree). Stages 4 and 5 run per slice in that slice's own worktree, created as a child of the planning worktree and based on main.

| #   | Stage        | Skill                 | Placement                                                                                                   | Task title                   |
| --- | ------------ | --------------------- | ----------------------------------------------------------------------------------------------------------- | ---------------------------- |
| 1   | PRD          | `prd`                 | `--worktree current`                                                                                        | `PRD`                        |
| 2   | Architecture | `system-architecture` | `--worktree current`                                                                                        | `Architecture`               |
| 3   | Slices       | `v-slices`            | `--worktree current`                                                                                        | `Slices`                     |
| 4   | Slice design | `program-design`      | `--worktree new-child --name <slice-key> --base-branch <main> --display-name "Slice <n> - <slice outcome>"` | `Slice <n> - Design`         |
| 5   | Slice work   | `work`                | `--worktree id:<slice worktree id>` (fresh terminal)                                                        | `Slice <n> - Implementation` |

Pass the task title with `--task-title` on every `worker-start`, and rename the worker terminal to the same title with `ORCA terminal rename --terminal <handle> --title "<title>" --json` once the receipt returns its handle.

### Merge gate

Check whether main contains the PR. If not: release the settled worker, report the state and PR link, tell the user to re-invoke `/orca:wk:prd` after merging, and end the turn.

### Planning gate

After stage 3, apply the merge gate to the planning PR before creating any slice worktree. Skip when the destination is outside the repository and forward links instead.

### Per slice, in roadmap order

1. Start the design session in a new child worktree of the planning worktree, based on main, named after the slice. Record the worktree id from the receipt and link it to the slice issue with `ORCA worktree set --worktree id:<id> --linear-issue <slice issue> --json`. If the session settles `failed` because the brief is obsolete, run a `v-slices` refresh session for that slice in the planning worktree, apply the planning gate, and restart this step. On success verify: design and stubs committed on the slice branch, slice issue's Design handoff and Next action updated. Release the worker.
2. Start the implementation session in the same worktree by its exact id selector. On success verify: PR against main attached to the slice issue, checks reported. Release the worker.
3. Apply the merge gate, then move to the next slice.

## Task specs

Follow the Orca Task-spec contract: Target, Change, Constraints, Ownership, Observable acceptance. Each spec is self-contained and includes:

- **Skill:** the skill to invoke, with its process and exit criteria.
- **Context paths:** absolute paths or links to every upstream document and issue the stage consumes, including the tracking issue.
- **Destination:** the exact path or issue for the output. Write there directly.
- **Human in the loop:** questions, review rounds, and approval happen with the user in the worker's own terminal. Run `ORCA worktree set --worktree active --unread --json` while waiting on the user. `ask` is for coordination problems only: a missing document, an unreadable path, an unresolved prerequisite from another slice.
- **Approval record:** after approval, append `Approved by <user> on <date>` as the document's last line; for designs, fill the slice issue's Design handoff.
- **Completion:** `worker_done --outcome succeeded` after approval is recorded and the artifact is at its destination; otherwise `--outcome failed` with the reason in the body.

Stage-specific content:

- **PRD:** the feature request; the tracking issue.
- **Architecture:** PRD path.
- **Slices:** PRD and architecture paths; the tracking issue. After approval, publish each slice brief as a child issue of the tracking issue with `ORCA linear create --title "Slice <n> - <outcome>" --parent <tracking id> --body-file - --json`, record each issue id in the roadmap, then commit the planning documents on the planning branch and open a PR to main, reporting its link in `worker_done`.
- **Design:** PRD, architecture, roadmap, and this slice's issue (`ORCA linear issue --current --full --json`). First compare the brief's boundary, dependencies, and prerequisites against current main; if obsolete, `worker_done --outcome failed` naming what changed. Otherwise commit the design and stubs on the slice branch and update the slice issue's Design handoff and Next action.
- **Work:** the approved design and slice issue; commit on the slice branch; open a PR targeting main; follow the `orca-linear` completion flow (attach the PR, one completion comment, review state); the user validates in the session.

Pass `--model` or `--effort` only when the user named them.

## After each settlement

Verify the artifact and approval line at the destination before releasing. A `succeeded` report without them reopens the stage with the same inputs. Update the planning worktree card with `worktree set --comment` at each stage boundary.

## Exit criteria

Per invocation:

- Every Dispatch in the Run settled and released; no reclaimable terminal.
- Every artifact produced is at the destination with its approval line.
- The report names, per stage and slice reached, the outcome, the artifact path, issue, or PR, the gate the run stopped at, and any unresolved blocker.

Workflow complete when every slice PR is merged to main, in roadmap order, and every slice issue is in its review or done state.
