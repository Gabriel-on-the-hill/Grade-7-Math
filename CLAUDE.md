# CLAUDE.md

See [AGENTS.md](AGENTS.md), and read [PROJECT_STANDARD.md](PROJECT_STANDARD.md) +
`Module_Template.html` before building anything. The standard is the source of truth for this hub;
AGENTS.md connects it to the house pedagogy. This is the **parent** app — Grade 8 was stamped from it
and shares the engine.

The short version:

- **`PROJECT_STANDARD.md` first.** Units, the shared data contract, module anatomy, hint rules, and
  the anti-cheat history all live there. Don't restate or fork it.
- **Hints are strategy-only.** A worked solution behind a Hint button is an answer key — it lowers
  the bar and corrupts mastery tracking. Your v1.4.2 release already treats it that way; keep it.
- **No advanced concept before its prerequisite.** The standard's rule; it is mastery gating.
- **The gap: no spaced review.** The engine tracks mastery but never brings a topic back, so mastered
  topics are quietly forgotten. A "due for review" surface on the existing `lastPracticed` is the
  highest-value pedagogy change here. Raise it first — it touches the data contract and Grade 8
  inherits it.
- **Public repo, publishes `.md`.** Student data is gitignored (see `Fareedah/`) and lives in a
  tutor-facing `LEDGER.md`, never in anything the hub serves. Same for every new student.

House pedagogy is in the root [AGENTS.md](../AGENTS.md).
