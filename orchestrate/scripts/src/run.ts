// orchestrate Run state: run directory, status server, state writes, answer waits, and hooks.
// Usage:
//   run.js dir [worktree]            print the Run directory
//   run.js start [worktree]          start the status server if it is not running; print its URL
//   run.js serve <run dir>           run the status server in the foreground
//   run.js state publish [worktree]  validate the state JSON on stdin and publish it
//   run.js mail wait                 wait for unread messages; mark them read, print them, and exit
//   run.js mail close <id>...        close handled messages
//   run.js mail list                 print every open message
//   run.js hook-stop                 Stop hook (hook input on stdin)
//   run.js hook-session-start        SessionStart hook (hook input on stdin)
import { createHash } from "node:crypto";
import { spawn, spawnSync } from "node:child_process";
import { Database } from "bun:sqlite";
// @ts-expect-error resolved by build.ts
import validateState from "virtual:state-validator";
import {
  existsSync,
  mkdirSync,
  openSync,
  readFileSync,
  realpathSync,
  renameSync,
  watch,
  writeFileSync,
} from "node:fs";
import { basename, join } from "node:path";

type RunState = {
  title: string;
  outcome: string;
  state: "running" | "scheduled" | "waiting on user" | "blocked" | "complete";
  roadmap: string;
  run: {
    trackingEntity: string;
    planningWorktree: string;
    runLog: string;
    documentDestination: string;
    mergePolicy?: string;
  };
  waiting: {
    n: number;
    kind: "question" | "merge";
    task: string;
    title: string;
    detail?: string;
    worker?: string;
    options?: string[];
    recommended?: string;
    url?: string;
  }[];
  blockers: { task?: string; title: string; detail?: string }[];
  workers: { id: string; task: string; role: string; worktree: string }[];
  scheduled: { task: string; at: string }[];
  updatedAt: string;
};
type Message = {
  id: number;
  item: number;
  body: string;
  readAt: string | null;
  status: "open" | "closed";
  createdAt: string;
  updatedAt: string;
};

function worktreeRoot(path: string): string {
  const r = spawnSync("git", ["-C", path, "rev-parse", "--show-toplevel"], { encoding: "utf8" });
  return realpathSync(r.status === 0 ? r.stdout.trim() : path);
}

function runDir(worktree = process.cwd()): string {
  const root = worktreeRoot(worktree);
  const hash = createHash("sha256").update(root).digest("hex").slice(0, 8);
  return join("/tmp/orchestrate", `${basename(root)}-${hash}`);
}

const files = (dir: string) => ({
  state: join(dir, "state.json"),
  mailbox: join(dir, "mailbox.db"),
  pid: join(dir, "server.pid"),
  port: join(dir, "server.port"),
  log: join(dir, "server.log"),
  stopMark: join(dir, "last-stop"),
});

const read = (path: string) => (existsSync(path) ? readFileSync(path, "utf8") : "");

function readState(dir: string): RunState | null {
  try {
    return JSON.parse(read(files(dir).state));
  } catch {
    return null;
  }
}

function alive(pid: number): boolean {
  try {
    process.kill(pid, 0);
    return true;
  } catch {
    return false;
  }
}

function serverUrl(dir: string): string | null {
  const f = files(dir);
  const pid = Number(read(f.pid));
  const port = read(f.port).trim();
  return pid && port && alive(pid) ? `http://127.0.0.1:${port}/` : null;
}

function validate(s: any): string[] {
  if (!validateState(s))
    return (validateState.errors ?? [])
      .filter((e: any) => e.keyword !== "if")
      .map((e: any) => {
        const at = e.instancePath || "state";
        if (e.keyword === "additionalProperties")
          return `${at} has an unknown field ${e.params.additionalProperty}`;
        if (e.keyword === "enum")
          return `${at} must be one of: ${e.params.allowedValues.join(", ")}`;
        if (e.keyword === "not") return `${at} has a field its kind does not allow`;
        return `${at} ${e.message}`;
      });
  return s.waiting.flatMap((w: RunState["waiting"][number], i: number) =>
    w.recommended !== undefined && !w.options?.includes(w.recommended)
      ? [`/waiting/${i}/recommended must be one of its options`]
      : [],
  );
}

async function publishState(worktree?: string) {
  const dir = runDir(worktree);
  let s: any;
  try {
    s = JSON.parse(await Bun.stdin.text());
  } catch (e) {
    fail(`stdin is not valid JSON: ${(e as Error).message}`);
  }
  const errs = validate(s);
  if (errs.length)
    fail(`state not written (see references/state.schema.json):\n- ${errs.join("\n- ")}`);
  s.updatedAt = new Date().toISOString();
  mkdirSync(dir, { recursive: true });
  const f = files(dir);
  writeFileSync(`${f.state}.tmp`, JSON.stringify(s, null, 2));
  renameSync(`${f.state}.tmp`, f.state);
  console.log(`state: ${s.state}\nurl: ${serverUrl(dir) ?? "server not running; run start"}`);
}

async function start(worktree?: string) {
  const dir = runDir(worktree);
  mkdirSync(dir, { recursive: true });
  const existing = serverUrl(dir);
  if (existing) return console.log(existing);
  const f = files(dir);
  writeFileSync(f.port, "");
  const out = openSync(f.log, "a");
  const child = spawn(process.execPath, [import.meta.path, "serve", dir], {
    detached: true,
    stdio: ["ignore", out, out],
  });
  child.unref();
  for (let i = 0; i < 50; i++) {
    await Bun.sleep(100);
    const url = serverUrl(dir);
    if (url) return console.log(url);
  }
  fail(`the status server did not start; see ${f.log}`);
}

const COLUMNS =
  "id, item, body, read_at AS readAt, status, created_at AS createdAt, updated_at AS updatedAt";

function mailbox(dir: string): Database {
  mkdirSync(dir, { recursive: true });
  const db = new Database(files(dir).mailbox, { create: true });
  db.exec("PRAGMA journal_mode = WAL; PRAGMA busy_timeout = 5000;");
  db.exec(
    "CREATE TABLE IF NOT EXISTS messages (id INTEGER PRIMARY KEY, item INTEGER NOT NULL, body TEXT NOT NULL, read_at TEXT, status TEXT NOT NULL DEFAULT 'open', created_at TEXT NOT NULL, updated_at TEXT NOT NULL)",
  );
  return db;
}

const printMessage = (m: Message) =>
  console.log(`message ${m.id} · item ${m.item}: ${JSON.stringify(m.body)}`);

async function mail(sub?: string, ids: string[] = []) {
  const db = mailbox(runDir());
  const unread = db.query<Message, []>(
    `SELECT ${COLUMNS} FROM messages WHERE status = 'open' AND read_at IS NULL ORDER BY id`,
  );
  if (sub === "wait") {
    // Ends before Claude Code kills background commands at 2 h.
    const deadline = Date.now() + 110 * 60_000;
    while (!unread.all().length) {
      if (Date.now() > deadline) return console.log("mail: no message");
      await Bun.sleep(500);
    }
    await Bun.sleep(1000);
    const batch = db.transaction(() => {
      const list = unread.all();
      const now = new Date().toISOString();
      for (const m of list)
        db.run("UPDATE messages SET read_at = ?, updated_at = ? WHERE id = ?", [now, now, m.id]);
      return list;
    })();
    return batch.forEach(printMessage);
  }
  if (sub === "close") {
    const nums = ids.map(Number);
    if (!nums.length || nums.some((n) => !Number.isInteger(n)))
      fail("usage: run.js mail close <id>...");
    const rows = db
      .query<Message, []>(`SELECT ${COLUMNS} FROM messages WHERE id IN (${nums.join(",")})`)
      .all();
    const bad = nums.filter(
      (n) => !rows.some((m) => m.id === n && m.readAt && m.status === "open"),
    );
    if (bad.length) fail(`not an open read message: ${bad.join(", ")}`);
    const now = new Date().toISOString();
    db.run(
      `UPDATE messages SET status = 'closed', updated_at = ? WHERE id IN (${nums.join(",")})`,
      [now],
    );
    return console.log(`closed: ${nums.join(", ")}`);
  }
  if (sub === "list")
    return db
      .query<Message, []>(`SELECT ${COLUMNS} FROM messages WHERE status = 'open' ORDER BY id`)
      .all()
      .forEach((m) => {
        printMessage(m);
        if (!m.readAt) console.log("  (unread)");
      });
  fail("usage: run.js mail wait|close <id>...|list");
}

type PrState = "open" | "draft" | "merge queue" | "merged" | "closed";
type Pr = { state: PrState; title: string; number: number; repo: string } | null;
const PR_QUERY =
  "query($url: URI!) { resource(url: $url) { ... on PullRequest { state isDraft isInMergeQueue title number repository { nameWithOwner } } } }";
const PR_TTL_MS = 30_000;

async function readPr(url: string): Promise<Pr> {
  try {
    const p = Bun.spawn(["gh", "api", "graphql", "-f", `query=${PR_QUERY}`, "-f", `url=${url}`], {
      stdout: "pipe",
      stderr: "ignore",
    });
    const r = JSON.parse(await new Response(p.stdout).text())?.data?.resource;
    if (!r?.state) return null;
    const state: PrState =
      r.state === "MERGED"
        ? "merged"
        : r.state === "CLOSED"
          ? "closed"
          : r.isInMergeQueue
            ? "merge queue"
            : r.isDraft
              ? "draft"
              : "open";
    return { state, title: r.title, number: r.number, repo: r.repository?.nameWithOwner ?? "" };
  } catch {
    return null;
  }
}

function serve(dir: string) {
  const f = files(dir);
  const page = join(import.meta.dir, "..", "ui", "index.html");
  const clients = new Set<ReadableStreamDefaultController>();
  const enc = new TextEncoder();
  const prs: Record<string, Pr> = {};
  const checked: Record<string, number> = {};
  let last = readState(dir);

  const db = mailbox(dir);
  const snapshot = () => {
    last = readState(dir) ?? last;
    const items = (last?.waiting ?? []).map((w) => w.n);
    const messages = items.length
      ? db
          .query<Message, []>(
            `SELECT ${COLUMNS} FROM messages WHERE item IN (${items.join(",")}) ORDER BY id`,
          )
          .all()
      : [];
    return {
      state: last,
      messages,
      prs,
      checking: [...reading.keys()],
      serverTime: new Date().toISOString(),
    };
  };
  const send = (c: ReadableStreamDefaultController, event: string, data: string) =>
    c.enqueue(enc.encode(`event: ${event}\ndata: ${data}\n\n`));
  const broadcast = () => {
    const data = JSON.stringify(snapshot());
    for (const c of clients) {
      try {
        send(c, "state", data);
      } catch {
        clients.delete(c);
      }
    }
  };
  const insert = db.transaction((list: { n: number; answer: string }[]) => {
    const now = new Date().toISOString();
    for (const a of list)
      db.run("INSERT INTO messages (item, body, created_at, updated_at) VALUES (?, ?, ?, ?)", [
        a.n,
        a.answer,
        now,
        now,
      ]);
  });

  const reading = new Map<string, Promise<Pr>>();
  const refreshPr = (url: string): Promise<Pr> => {
    const inFlight = reading.get(url);
    if (inFlight) return inFlight;
    const p = readPr(url).then((pr) => {
      prs[url] = pr;
      checked[url] = Date.now();
      reading.delete(url);
      broadcast();
      return pr;
    });
    reading.set(url, p);
    broadcast();
    return p;
  };
  const checkPrs = () => {
    for (const w of last?.waiting ?? [])
      if (
        w.kind === "merge" &&
        w.url &&
        (!checked[w.url] || Date.now() - checked[w.url] > PR_TTL_MS)
      )
        refreshPr(w.url);
  };

  let timer: Timer | undefined;
  watch(dir, (_e, name) => {
    if (name !== "state.json") return;
    clearTimeout(timer);
    timer = setTimeout(() => {
      broadcast();
      checkPrs();
    }, 50);
  });
  let version = db.query<{ data_version: number }, []>("PRAGMA data_version").get()?.data_version;
  setInterval(() => {
    const v = db.query<{ data_version: number }, []>("PRAGMA data_version").get()?.data_version;
    if (v !== version) {
      version = v;
      broadcast();
    }
  }, 300);
  setInterval(checkPrs, PR_TTL_MS);
  checkPrs();
  setInterval(() => {
    for (const c of clients) {
      try {
        c.enqueue(enc.encode(": ping\n\n"));
      } catch {
        clients.delete(c);
      }
    }
  }, 15000);

  const server = Bun.serve({
    hostname: "127.0.0.1",
    port: 0,
    idleTimeout: 60,
    async fetch(req) {
      const url = new URL(req.url);
      const host = req.headers.get("host") ?? "";
      if (!/^(127\.0\.0\.1|localhost)(:\d+)?$/.test(host))
        return new Response("forbidden host", { status: 403 });
      if (req.method === "GET" && url.pathname === "/")
        return new Response(Bun.file(page), {
          headers: { "content-type": "text/html; charset=utf-8" },
        });
      if (req.method === "GET" && url.pathname === "/api/state") return Response.json(snapshot());
      if (req.method === "GET" && url.pathname === "/api/events") {
        let ctrl: ReadableStreamDefaultController;
        const stream = new ReadableStream({
          start(c) {
            ctrl = c;
            clients.add(c);
            send(c, "state", JSON.stringify(snapshot()));
          },
          cancel() {
            clients.delete(ctrl);
          },
        });
        return new Response(stream, {
          headers: {
            "content-type": "text/event-stream",
            "cache-control": "no-cache",
            connection: "keep-alive",
          },
        });
      }
      if (req.method !== "POST") return new Response("not found", { status: 404 });
      const origin = req.headers.get("origin");
      if (origin && new URL(origin).host !== host)
        return new Response("forbidden origin", { status: 403 });
      if (!req.headers.get("content-type")?.startsWith("application/json"))
        return new Response("expected JSON", { status: 415 });
      const body = (await req.json().catch(() => null)) as any;
      if (url.pathname === "/api/answers") {
        const list = Array.isArray(body?.answers) ? body.answers : [];
        const clean = list.map((a: any) => ({
          n: Number(a?.n),
          answer: typeof a?.answer === "string" ? a.answer.trim() : "",
        }));
        if (!clean.length) return Response.json({ error: "no answers" }, { status: 400 });
        const bad = clean.find(
          (a: { n: number; answer: string }) =>
            !a.answer || !last?.waiting.some((w) => w.n === a.n),
        );
        if (bad)
          return Response.json(
            { error: bad.answer ? `no waiting item ${bad.n}` : `empty answer for ${bad.n}` },
            { status: 400 },
          );
        insert(clean);
        broadcast();
        return Response.json({ ok: true, sent: clean.length });
      }
      if (url.pathname === "/api/prs/refresh") {
        if (!last?.waiting.some((w) => w.kind === "merge" && w.url === body?.url))
          return Response.json({ error: "no merge item for this url" }, { status: 404 });
        return Response.json({ pr: await refreshPr(body.url) });
      }
      return new Response("not found", { status: 404 });
    },
  });
  writeFileSync(f.pid, String(process.pid));
  writeFileSync(f.port, String(server.port));
  console.log(`serving ${dir} on http://127.0.0.1:${server.port}/`);
}

async function hookStop() {
  const input = JSON.parse(await Bun.stdin.text());
  const msg: string = input.last_assistant_message ?? "";
  const tasks: number = (input.background_tasks ?? []).length;
  const crons: number = (input.session_crons ?? []).length;
  const block = (reason: string) => {
    console.log(JSON.stringify({ decision: "block", reason }));
    process.exit(0);
  };
  const said = [...msg.matchAll(/^\*\*State:\*\* *(.+?) *(?:·.*)?$/gm)].at(-1)?.[1];
  if (said === "not started") return;

  const dir = runDir(input.cwd);
  const f = files(dir);
  const s = readState(dir);
  if (!s)
    return block(
      `No Run state at ${f.state}. Publish it with the orchestrate skill's run.js state publish, then end the turn per End of turn.`,
    );
  const lastStop = Number(read(f.stopMark)) || 0;
  if (Date.parse(s.updatedAt) <= lastStop)
    return block(
      "The Run state was not published this turn. Publish the current state with run.js state publish, then end the turn per End of turn.",
    );
  if (said !== s.state)
    return block(
      `End the turn with the line **State:** ${s.state} · <status page URL>, matching the published state.`,
    );
  if (!serverUrl(dir))
    return block(
      "The status server is not running. Run run.js start, then end the turn per End of turn.",
    );
  const handled = mailbox(dir)
    .query<Message, []>(
      `SELECT ${COLUMNS} FROM messages WHERE status = 'open' AND read_at IS NOT NULL`,
    )
    .all();
  if (handled.length)
    return block(
      `Messages ${handled.map((m) => m.id).join(", ")} were read but not closed. Handle each, close it with run.js mail close <id>..., then end the turn.`,
    );
  if (s.state !== "complete" && tasks < 1)
    return block(
      "No answer wait is in flight. Start run.js mail wait in the background, then end the turn.",
    );
  if (s.state === "running" && tasks < s.workers.length + 1)
    return block(
      "State is running but fewer background tasks than workers plus the answer wait are in flight. Start every ready task, or publish the state that holds.",
    );
  if (s.state === "scheduled" && crons < 1)
    return block(
      "State is scheduled but no measurement is scheduled. Schedule each open monitor task's next measurement, or publish the state that holds.",
    );
  writeFileSync(f.stopMark, String(Date.now()));
}

async function hookSessionStart() {
  const input = JSON.parse(await Bun.stdin.text());
  const f = files(runDir(input.cwd));
  if (!existsSync(f.state)) return;
  console.log(`orchestrate Run state, as last published (${f.state}):\n${read(f.state)}`);
}

function fail(msg: string): never {
  console.error(msg);
  process.exit(1);
}

const [cmd, arg, ...rest] = process.argv.slice(2);
switch (cmd) {
  case "dir":
    console.log(runDir(arg));
    break;
  case "start":
    await start(arg);
    break;
  case "serve":
    if (!arg) fail("usage: run.js serve <run dir>");
    serve(arg);
    break;
  case "state":
    if (arg !== "publish") fail("usage: run.js state publish [worktree]");
    await publishState(rest[0]);
    break;
  case "mail":
    await mail(arg, rest);
    break;
  case "hook-stop":
    await hookStop();
    break;
  case "hook-session-start":
    await hookSessionStart();
    break;
  default:
    fail("usage: run.js dir|start|serve|state publish|mail|hook-stop|hook-session-start [arg]");
}
