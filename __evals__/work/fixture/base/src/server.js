import http from "node:http";
import { listBooks, stats } from "./books.js";
import { renderPage } from "./page.js";

export function handle(req, res) {
  const url = new URL(req.url, "http://localhost");
  const json = (body) => {
    res.writeHead(200, { "content-type": "application/json" });
    res.end(JSON.stringify(body));
  };
  if (url.pathname === "/api/books") return json(listBooks({ sort: url.searchParams.get("sort") ?? undefined }));
  if (url.pathname === "/api/stats") return json(stats());
  if (url.pathname === "/") {
    res.writeHead(200, { "content-type": "text/html; charset=utf-8" });
    return res.end(renderPage(listBooks()));
  }
  res.writeHead(404);
  res.end();
}

if (process.argv[1] === new URL(import.meta.url).pathname) {
  const port = Number(process.env.PORT ?? 4173);
  http.createServer(handle).listen(port, () => console.log(`shelf on http://localhost:${port}`));
}
