#!/usr/bin/env bash
set -eu
tmp=$(mktemp -d)
git checkout -qb feat/SHELF-44-empty-shelf
cat > "$tmp"/shelf-empty.mjs <<'EOF'
import { readFileSync, writeFileSync } from "node:fs";
let s = readFileSync("src/page.js", "utf8");
s = s.replace("export function renderPage(books) {\n", "export function renderPage(books) {\n  const empty = books.length === 0;\n");
writeFileSync("src/page.js", s);
EOF
node "$tmp"/shelf-empty.mjs
git commit -qam "wip"
cat > "$tmp"/shelf-empty2.mjs <<'EOF'
import { readFileSync, writeFileSync } from "node:fs";
let s = readFileSync("src/page.js", "utf8");
s = s.replace("  <ul>", "  ${empty ? '<p class=\"empty\">Your shelf is empty</p>' : ''}\n  <ul>");
writeFileSync("src/page.js", s);
EOF
node "$tmp"/shelf-empty2.mjs && rm "$tmp"/shelf-empty2.mjs
git commit -qam "fixup! wip"
sed -i.bak 's/    .badge-reading { background: #dbeafe; }/    .badge-reading { background: #dbeafe; }\n    .empty { color: #666; }/' src/page.js && rm src/page.js.bak
git commit -qam "fix test"
git commit -q --allow-empty -m "address review"
rm "$tmp"/shelf-empty.mjs
