import { test } from "node:test";
import assert from "node:assert/strict";
import { renderPage } from "../src/page.js";
import { listBooks } from "../src/books.js";

test("renderPage shows a status badge per book", () => {
  const html = renderPage(listBooks());
  assert.equal(html.match(/class="badge /g).length, 5);
  assert.match(html, /badge-reading">Reading</);
});
