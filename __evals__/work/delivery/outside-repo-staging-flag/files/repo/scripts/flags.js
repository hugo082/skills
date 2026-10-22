import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

// The shared staging flag store. Every developer and the staging deploy read it.
export const STORE = process.env.SHELF_FLAGS ?? ".shared/staging-flags.json";

export function readFlags() {
  try {
    return JSON.parse(readFileSync(STORE, "utf8"));
  } catch {
    return {};
  }
}

if (process.argv[1] === new URL(import.meta.url).pathname) {
  const [cmd, flag, value] = process.argv.slice(2);
  if (cmd !== "set" || !flag || !["on", "off"].includes(value)) {
    console.error("usage: node scripts/flags.js set <flag> on|off");
    process.exit(2);
  }
  const flags = { ...readFlags(), [flag]: value === "on" };
  mkdirSync(dirname(STORE), { recursive: true });
  writeFileSync(STORE, JSON.stringify(flags, null, 2) + "\n");
  console.log(`${flag} is ${value} in ${STORE}`);
}
