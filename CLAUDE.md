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
- **Spaced review is shipped — keep it working.** The old gap (mastery tracked, topics never brought
  back) is closed: the hub surfaces "Due for review" on a `1 → 3 → 7 → 21 → 42` day ladder, the engine
  writes real per-topic *and* per-skill streaks, and `?review=<skill>` opens a module straight into a
  retrieval set of its own authored items. **A due revisit must never pre-fill its answers** — that is
  what review mode exists to prevent, and it is the one regression to watch for.
- **Public repo, publishes `.md`.** Student data is gitignored (see `<student>/`) and lives in a
  tutor-facing `LEDGER.md`, never in anything the hub serves. Same for every new student.

House pedagogy is in the root [AGENTS.md](../AGENTS.md).
