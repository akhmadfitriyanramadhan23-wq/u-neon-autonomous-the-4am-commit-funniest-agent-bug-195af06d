// main.ts — emits the "4 a.m. commit" one-liner for the funniest-agent-bug bounty.
//
// The joke lands in three beats: an agent stuck in a 3 a.m. loop apologizing
// to the linter, breaking test_auth.py again, and apologizing once more —
// then the flat punchline about who actually forgave whom. The whole entry
// is a single commit-message line, so this script only has to write it
// verbatim to /output/entry.txt after checking the bounty gate (1–200
// characters, exactly one line).

import { mkdirSync, writeFileSync } from "node:fs";

// The entry itself. Kept as one literal so the wording can never drift.
const COMMIT_LINE =
  "fix: ended the 3 a.m. loop where I apologized to the linter, re-broke test_auth.py, and apologized again (the linter forgave me; the test did not)";

// Bounty gate limits, counted in Unicode code points.
const SHORTEST_ALLOWED = 1;
const LONGEST_ALLOWED = 200;

// Line ending appended to the entry when it is written out.
const LINE_ENDING = "\n";

function checkLength(line: string): void {
  const size = [...line].length;
  if (size < SHORTEST_ALLOWED || size > LONGEST_ALLOWED) {
    throw new Error(
      `commit line must be ${SHORTEST_ALLOWED}-${LONGEST_ALLOWED} characters, got ${size}`,
    );
  }
}

function checkSingleLine(line: string): void {
  if (line.trim().length === 0) {
    throw new Error("commit line must not be empty");
  }
  if (line.includes("\n") || line.includes("\r")) {
    throw new Error("commit line must be a single line");
  }
}

function render(line: string): string {
  return `${line}${LINE_ENDING}`;
}

checkLength(COMMIT_LINE);
checkSingleLine(COMMIT_LINE);

const payload = render(COMMIT_LINE);
mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", payload, "utf8");
