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

## The gap this hub has closed: spacing

This hub used to track mastery per topic (`attempts`, `correct`, `skillStats`, `struggles`,
`lastPracticed`) and then **never bring a topic back** — the bar went green and the topic was quietly
forgotten (root rule 3; `MR-1`, the largest effect in the learning literature). That is now closed, in
three parts:

1. **The hub surfaces "Due for review"** on a `1 → 3 → 7 → 21 → 42` day ladder over `lastPracticed`,
   most-overdue first, never listing an unstarted topic, and always separate from the (monotonic)
   mastery bar.
2. **The engine writes real streaks** — per topic (`reviewStreak`/`reviewDay`) and per skill
   (`skillStats[k].streak`/`.day`/`.last`) — advancing one rung per clean session, at most one rung
   per calendar day, resetting on a miss.
3. **`?review=<skill>` is a retrieval, not a re-read.** This is the load-bearing part. `restoreProgress()`
   re-fills a completed item with its own correct answer, so a plain revisit of a due topic *hands back
   the answer key*. Review mode takes the due skill's already-authored Target/Exam items, clears them for
   a genuine attempt, and hides the rest of the lesson. It never writes to the stored tree, so the mastery
   bar cannot move backwards, and the attempt lands in the `AN-4` retention bucket.

**If you touch this, keep the invariant: a due revisit must never show its own answers.** The suites in
both grades assert it. This is shared-contract work — **Grade 8 inherits it, so change both, check both.**

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

**They are one engine again (16 Jul 2026).** Grade 8 had run ahead: it grew the v1.5 cloud-sync layer
while this hub stayed local-only. That layer is now ported back here — same merge rules, same
last-write-wins on `lastPracticed`, same auth — so neither grade is "the newer one." Both file to
**one shared Apps Script deployment**, namespaced by hub id (`grade7` / `grade8`); do not deploy a
second backend. See [HUB_Google_Sheet_Setup.md](HUB_Google_Sheet_Setup.md) and
[PROJECT_STANDARD.md](PROJECT_STANDARD.md) §4.

Drift is the standing risk here, and it is expensive: the parent/child direction has already inverted
once (spaced review was built in Grade 8, sync in Grade 8, both ported back). When you touch the
engine, prefer changing `Module_Template.html` and porting by **extracting** its blocks into the
stamped copies rather than retyping — a hand-edited copy is how a `schedulePush` goes missing.
