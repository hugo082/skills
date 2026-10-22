#!/usr/bin/env bash
set -eu
script=$(mktemp -d)/route.mjs
cat > "$script" <<'EOF'
import { readFileSync, writeFileSync } from "node:fs";
let s = readFileSync("src/server.js", "utf8");
s = s.replace('import { listBooks, stats } from "./books.js";', 'import { books, listBooks, stats } from "./books.js";');
s = s.replace('  if (url.pathname === "/api/stats")', `  if (url.pathname.startsWith("/api/books/")) {
    const id = url.pathname.slice("/api/books/".length);
    const book = books.find((b) => b.id === id);
    if (book) return json(book);
    res.writeHead(404);
    return res.end();
  }
  if (url.pathname === "/api/stats")`);
writeFileSync("src/server.js", s);
EOF
node "$script" && rm "$script"
git commit -qam "feat(api): add GET /api/books/:id"
git push -q origin main
