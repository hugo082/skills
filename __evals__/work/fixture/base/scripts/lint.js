import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

const errors = [];
for (const dir of ["src", "test", "scripts"]) {
  for (const file of readdirSync(dir).filter((f) => f.endsWith(".js"))) {
    const path = join(dir, file);
    readFileSync(path, "utf8").split("\n").forEach((line, i) => {
      if (/\s+$/.test(line)) errors.push(`${path}:${i + 1} trailing whitespace`);
      if (/\b(test|it|describe)\.only\(/.test(line)) errors.push(`${path}:${i + 1} focused test`);
      if (dir === "src" && file !== "server.js" && /console\.log\(/.test(line)) errors.push(`${path}:${i + 1} console.log in src`);
    });
  }
}
if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}
console.log("lint ok");
