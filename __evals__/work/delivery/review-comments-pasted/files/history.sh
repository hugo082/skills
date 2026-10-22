#!/usr/bin/env bash
set -eu
tmp=$(mktemp -d)
git checkout -qb feat/SHELF-47-finished-date
cat > "$tmp"/shelf-finished.mjs <<'EOF'
import { readFileSync, writeFileSync } from "node:fs";
let s = readFileSync("src/page.js", "utf8");
s = s.replace('import { formatProgress } from "./format.js";', 'import { formatDate, formatProgress } from "./format.js";');
s = s.replace("    .map(\n      (b) => `<li", "    .map((b) => {\n      const fd = b.finishedAt ? formatDate(b.finishedAt) : '';\n      return `<li");
s = s.replace('${badge[b.status]}</span>\n    </li>`,\n    )', '${badge[b.status]}</span>\n      <span class=\"finished\">Finished ${fd}</span>\n    </li>`;\n    })');
writeFileSync("src/page.js", s);
EOF
node "$tmp"/shelf-finished.mjs && rm "$tmp"/shelf-finished.mjs
git commit -qam "feat(page): show the finished date"
git push -q -u origin feat/SHELF-47-finished-date
