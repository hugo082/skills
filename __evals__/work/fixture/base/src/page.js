import { formatProgress } from "./format.js";

const badge = { done: "Done", reading: "Reading", queued: "Queued" };

export function renderPage(books) {
  const rows = books
    .map(
      (b) => `<li class="book">
      <span class="title">${b.title}</span>
      <span class="author">${b.author}</span>
      <span class="badge badge-${b.status}">${badge[b.status]}</span>
    </li>`,
    )
    .join("\n    ");
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Shelf</title>
  <style>
    body { font-family: system-ui, sans-serif; max-width: 640px; margin: 2rem auto; padding: 0 1rem; }
    .book { display: flex; gap: .75rem; align-items: baseline; padding: .5rem 0; border-bottom: 1px solid #ddd; }
    .title { font-weight: 600; }
    .author { color: #666; flex: 1; }
    .badge { font-size: .75rem; padding: .1rem .5rem; border-radius: 999px; background: #eee; }
    .badge-done { background: #d1fadf; }
    .badge-reading { background: #dbeafe; }
  </style>
</head>
<body>
  <h1>Shelf</h1>
  <ul>
    ${rows}
  </ul>
</body>
</html>`;
}

export { formatProgress };
