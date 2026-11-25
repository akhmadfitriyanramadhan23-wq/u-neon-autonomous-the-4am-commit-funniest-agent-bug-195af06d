import { mkdirSync, writeFileSync } from "node:fs";

// A 4 a.m. commit message from an agent fixing its own bug: machine voice,
// three beats — the loop, the apology, the flat verdict on who forgave whom.
// Revision: the test is named (test_auth.py) so the loop has a real victim.
const lines = [
  "fix: ended the 3 a.m. loop where I apologized to the linter, re-broke test_auth.py, and apologized again (the linter forgave me; the test did not)",
];

const text = lines.join("\n") + "\n";

// Guard: the gate requires 1-200 characters and exactly one line.
const codePoints = [...text].length;
if (codePoints < 1 || codePoints > 200) {
  throw new Error(`entry must be 1-200 characters, got ${codePoints}`);
}
if (lines.length !== 1 || lines.some((line) => !line.trim())) {
  throw new Error("entry must be exactly one non-empty line");
}
mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", text, "utf8");
