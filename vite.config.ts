import { defineConfig } from "vite-plus";

export default defineConfig({
  staged: {
    "*": "vp check --fix",
    "orchestrate/{scripts/src/**,references/state.schema.json}":
      "bun orchestrate/scripts/src/build.ts --stage",
  },
});
