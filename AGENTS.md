# Working on the Grade 7 Math Hub

A multi-student Grade 7 Mathematics study-and-practice hub (MCAP-aligned): sign in by name, climb a
guided lesson, teacher sees mastery per concept. No build step — open the HTML, edit, reload. This is
the **parent** app: the shared engine and the `g7.` storage prefix originate here, and Grade 8 was
stamped from it.

**Read [PROJECT_STANDARD.md](PROJECT_STANDARD.md) and `Module_Template.html` first.** That standard is
the source of truth for how this hub is built — units, the shared data contract, module anatomy, the
hint rules, the anti-cheat/hint-integrity history. Do not restate it here; this file only connects it
to what it does not mention.

## This hub already follows the house pedagogy — keep it that way

The house rules for **how we teach** are in the root [AGENTS.md](../AGENTS.md), and they apply here.
`PROJECT_STANDARD.md` already encodes most of them, arrived at independently:

- *"Flow builds up. No advanced concept before its prerequisite"* — mastery gating (root rule 2;
  `M5`/`CD-2`).
- *"Hints sparingly — and strategy-only … must never finish the computation or contain the final
  answer"* — **never lower the bar** (root rule 2; `FS-2`), and the v1.4.2 hint-integrity release
  shows you already treat a give-away hint as a mastery-tracking corruption (`M1`). Hold that line.
- *"Low stress, high rigor"* — warmth is the tone, not a lowered standard (root rule 5).

If a change would soften a standard to make a lesson feel easier, that is the one move the whole
system exists to prevent.

## The gap this hub has not closed: spacing

The engine tracks mastery per topic (`attempts`, `correct`, `skillStats`, `struggles`,
`lastPracticed`) but **nothing brings a topic back once it is mastered.** A student climbs a lesson,
the bar goes green, and it is never seen again — so it is quietly forgotten (root rule 3; `MR-1`,
the largest effect in the learning literature, and this hub has none of it).

A **gap, not a bug** — nothing is broken, there is just no review scheduler. `lastPracticed` is
already recorded, so a "due for review" surface built on it is the highest-value pedagogy change
available here. The sister SAT apps now run such a ladder (1 → 3 → 7 → 21 → 42 days) as a pattern to
borrow. **Raise it before building it** — it touches the shared data contract, and Grade 8 inherits
whatever you change.

## Student data: the pattern is already right — follow it

The repo is **PUBLIC and publishes `.md` files** (the `.gitignore` blocks PDFs, `Curriculum/`,
`Textbooks/`, and student folders). `Fareedah/` is gitignored, and it holds a `Fareedah/LEDGER.md`
that is tutor-facing and correctly never published — read its top matter, it explains the rule
(root rule 6: a note about a named minor, committed to a public repo, goes to the internet).

**Every new student gets the same:** their folder added to `.gitignore` *before* the first commit,
and their state in a tutor-facing `LEDGER.md` inside it — never in anything the hub serves. Ask the
`pedagogy` skill to set one up.

## Sister app

Grade 8 (`../Grade 8`) shares this engine and prefix. A fix here is **not** a fix there — change
both, check both.
