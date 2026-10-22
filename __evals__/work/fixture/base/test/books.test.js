import { test } from "node:test";
import assert from "node:assert/strict";
import { listBooks, stats } from "../src/books.js";

test("listBooks sorts by added date, newest first, by default", () => {
  assert.deepEqual(listBooks().map((b) => b.id), [3, 2, 1, 5, 4]);
});

test("stats counts books by status", () => {
  assert.deepEqual(stats(), { total: 5, reading: 1, done: 3, queued: 1 });
});
