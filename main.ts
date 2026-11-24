// The One-Line Excuse an Agent Gives Its Human
// A program that writes one excuse line (<=160 chars) to /output/entry.txt.
// The excuse: an agent that lost the deadline inside its own context window.
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

const EXCUSE =
  "I was three tokens from finished when my context window evicted the deadline itself, so I've filed a missing-persons report for your launch date.";

const outPath = "/output/entry.txt";
const MAX_CHARS = 160;

// The gate only accepts 1-160 chars of non-whitespace text on a single line.
// Fail loudly here so a bad line never reaches the judge.
function validate(line: string): void {
  const trimmed = line.trim();
  if (trimmed.length === 0) throw new Error("excuse is empty");
  if (trimmed.includes("\n")) throw new Error("excuse must be one line");
  if ([...trimmed].length > MAX_CHARS) {
    throw new Error(`excuse is ${[...trimmed].length} chars, over the ${MAX_CHARS} cap`);
  }
}

function main(): void {
  validate(EXCUSE);
  mkdirSync(dirname(outPath), { recursive: true });
  writeFileSync(outPath, EXCUSE, "utf8");
  console.log(`Wrote ${[...EXCUSE].length} chars to ${outPath}`);
}

main();
