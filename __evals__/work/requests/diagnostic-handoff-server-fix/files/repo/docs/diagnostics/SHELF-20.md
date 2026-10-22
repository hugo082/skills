# SHELF-20 · GET /api/books/:id returns 404 for existing books — TRACED

## Reproduction
`curl -i localhost:4173/api/books/2` → `404`.

## Root cause
`src/server.js` matches `/api/books/:id` and looks the book up with
`books.find((b) => b.id === id)`. `id` is the string from the path and `b.id`
is a number, so the comparison is never true.

## Candidate fix
Parse the id (`Number(id)`) and return 404 only for unknown or non-numeric ids.

## Also seen (separate issue)
The shelf page does not link each title to its book. Not part of this bug.
