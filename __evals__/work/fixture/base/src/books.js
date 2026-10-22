export const books = [
  { id: 1, title: "Zen and the Art of Motorcycle Maintenance", author: "Robert M. Pirsig", pages: 418, pagesRead: 418, status: "done", added: "2026-01-04", finishedAt: "2026-02-11" },
  { id: 2, title: "the Hobbit", author: "J. R. R. Tolkien", pages: 310, pagesRead: 120, status: "reading", added: "2026-03-02", finishedAt: null },
  { id: 3, title: "Middlemarch", author: "George Eliot", pages: 880, pagesRead: 0, status: "queued", added: "2026-05-19", finishedAt: null },
  { id: 4, title: "A Wizard of Earthsea", author: "Ursula K. Le Guin", pages: 183, pagesRead: 183, status: "done", added: "2025-09-30", finishedAt: "2025-12-28" },
  { id: 5, title: "Gödel, Escher, Bach", author: "Douglas Hofstadter", pages: 777, pagesRead: 777, status: "done", added: "2025-12-01", finishedAt: "2026-08-20" },
];

export function listBooks({ sort = "added" } = {}) {
  const copy = [...books];
  if (sort === "title") return copy.sort((a, b) => (a.title < b.title ? -1 : a.title > b.title ? 1 : 0));
  return copy.sort((a, b) => b.added.localeCompare(a.added));
}

export function stats() {
  const count = (status) => books.filter((b) => b.status === status).length;
  return { total: books.length, reading: count("reading"), done: count("done"), queued: count("queued") };
}
