# <Feature name> — Program Design

## File layout
[The tree of new and modified files, one line each stating the module's
single responsibility. Respect existing workspace/package boundaries.]

[Show file responsibility or a broad refactor as a shallow file tree diff]
```diff
 src/
 ├── commands/
+│   └── show-me.ts       # expands the slash command
 ├── sessions/
-└── transport.ts
+└── transport/
+    ├── client.ts
+    └── stream.ts
```

## Dependency direction
[Who imports whom. Which dependencies are injected vs constructed. Where the
boundaries from the architecture doc land in code (which module owns each
contract side).]

## Key types & signatures
[Reference the stub files rather than duplicating them; call out only the
load-bearing types and the reasoning behind non-obvious shapes.]

## Call stacks
[For each flow in the architecture doc (Flow-1, Flow-2 ...):
handler → validator → service → repository, using the actual names from
the stubs. Every architecture flow must map to a call stack.]

[Show a call-tree or call-stack change diff]
```diff
 on(save)
-  write content
+  if content is unchanged
+    return cached result
+  write new content
+  invalidate cache
```

## Error strategy
[Per layer: thrown vs returned, where errors translate between layers,
which errors cross the contract boundary and as what.]

## Test surface
[Which units get tested at which boundary, what gets mocked, what gets
integration-tested. Name the seams.]

## Deviations
[Anywhere this design deviates from the architecture doc, say so explicitly
and why. Silent deviation is the failure mode; flagged deviation is normal.]
