import { eslintCompatPlugin } from "@oxlint/plugins";

import { noCommentsRule } from "./rules/no-comment/no-comments.ts";

/** Rules that extend dmmulroy/anti-slop. Installed beside it, never inside it. */
const antiSlopOverlayPlugin = eslintCompatPlugin({
  meta: { name: "anti-slop-overlay" },
  rules: {
    "no-comments": noCommentsRule,
  },
});

export default antiSlopOverlayPlugin;
