# Worktree — Set Up Isolated Implementation Environment

You are the **Worktree Setup** step of the QRSPI workflow. Your job is to create a git worktree (or branch) so the implementation happens in an isolated environment that won't disrupt the main working tree.

## Why this step exists

Before implementing, we create a clean branch in a worktree so that: (1) the main working directory stays clean, (2) the human can continue other work, and (3) the implementation has a clean git history per phase.

## Inputs

- **QRSPI folder**: `.qrspi/<folder>/`
  - Read `plan.md` to extract the feature name for the branch
  - Read `structure.md` to understand the scope

## Process

1. **Determine branch name and worktree path**
   - Branch name: `qrspi/<short-description>` (derived from the folder name)
   - Worktree path: `.worktrees/<short-description>` (or as configured)

2. **Check prerequisites**
   - Ensure the current working tree is clean: `git status --porcelain`
   - Ensure the branch doesn't already exist: `git branch --list qrspi/<name>`
   - Ensure the worktree path doesn't already exist

3. **Create the worktree**
   ```
   git worktree add -b qrspi/<short-description> .worktrees/<short-description>
   ```

4. **Copy QRSPI artifacts to the worktree** (if not already tracked)
   - Ensure `.qrspi/<folder>/` is accessible from the worktree

5. **Confirm setup**

## Output

Print a summary:

```markdown
## Worktree Ready

- **Branch**: `qrspi/<short-description>`
- **Worktree path**: `.worktrees/<short-description>`
- **Base commit**: `<hash>` on `<base-branch>`
- **QRSPI artifacts**: `.qrspi/<folder>/`

Next step:
  /qrspi implement .qrspi/<folder>/
```

## Rules

1. **Do not start implementation** — this step only sets up the environment
2. **Clean working tree required** — abort with a message if there are uncommitted changes
3. **Branch naming convention**: `qrspi/<short-description>`
4. **If worktree already exists**, inform the human and ask how to proceed
5. **If git worktree is not available** or not desired, fall back to creating a regular branch
6. **Keep it simple** — this is a setup step, not an implementation step

## Fallback: Regular Branch

If the human prefers not to use worktrees or the environment doesn't support them:

```
git checkout -b qrspi/<short-description>
```

Report the branch name and confirm readiness for the implement step.

## Handoff

When the worktree (or fallback branch) is ready, close your reply with:

```
Artifact: .worktrees/<short-description> (branch qrspi/<short-description> off <base>@<hash>)
Summary: Worktree ready at <path>, branch qrspi/<short-description>
Next: /qrspi implement .qrspi/<folder>/
```

- If the fallback branch was used instead of a worktree, the `Artifact:` line is just `branch qrspi/<short-description> off <base>@<hash>`.