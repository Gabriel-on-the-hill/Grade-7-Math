# Pedagogy Alignment — Grade 7 Math Hub

> **The backlog that carries this hub to 100% handbook alignment.** Implementation-ready: every item
> says *what, why, where, how,* and *how to prove it.* Ranked by learning impact per unit of effort.

**Read first:** [AGENTS.md](AGENTS.md) + [PROJECT_STANDARD.md](PROJECT_STANDARD.md) (this hub's source
of truth and mechanics) · root [AGENTS.md](../AGENTS.md) (the house rules — *whether*) ·
[Pedagogical-Design-Handbook.md](../Pedagogical-Design-Handbook.md) (the *why*, by ID). The full
evaluation is the "app-pedagogy-eval" artifact.

> **This is the parent hub.** The engine and the `g7.` data contract originate here; **Grade 8 is
> stamped from it and inherits engine changes.** Do the shared-engine work here, verify it here, and
> Grade 8 picks it up. Built modules (`The_Number_System.html`, …) are *stamped copies* of
> `Module_Template.html` — prefer changes that live in the **hub** (one file) or the **template**
> (then re-stamp) over edits duplicated across every built module.

---

## Where this hub stands (15 Jul 2026)

The best lesson *structure* of the three families, on the most explicitly principled standard in the
whole tree — and missing the retention layer entirely.

| Category | Status | |
|---|---|---|
| Cognitive load | ● solid | Learn→Guided→Practice→Apply→Exam; strategy-only hints |
| **Memory & retention** | ● **solid** | **spaced review shipped — "Due for review" ladder + engine-written consecutive-session streak (phase-1 + phase-2)** |
| Mastery & sequencing | ● solid | no advanced concept before its prerequisite |
| Assessment & feedback | ● solid | active check-and-feedback; hints never give the answer |
| Motivation & UX | ◐ partial | honest mastery bars; anti-cheat; no gamification |
| Adaptive & analytics | ● solid | per-topic tracking + acquisition-vs-retention readout (`AN-4` ✅) + automatic per-level accounting with a focus point, from the lesson's own ladder (`AS-4` ✅) + per-skill ~85% calibration band. Machine auto-serving of easier work is deliberately out of scope (house rule) |

---

## 0 · Prerequisite: make the tests runnable — ✅ done (15 Jul 2026)

**Was.** `tests/behavioral_test_suite.js` errored on run — a missing `jsdom` `require`, so it exited
before asserting anything.

**Fixed.** `node tests/behavioral_test_suite.js` (or `npm test`) now runs **85 passed, 0 failed,
exit 0**. The suite is DOM-driven (loads the real HTML and runs the embedded engine via
`runScripts:'dangerously'`), so unlike Michael SAT's pure-logic module tests it genuinely needs a DOM;
fixed by pinning `jsdom` as a dev-only dependency (`package.json`; `node_modules/` already gitignored)
rather than by a localStorage shim, which does not fit a DOM-driven suite. Keep it green as the gate.

---

## 1 · Add spaced review — `MR-1`, `MR-3` · **phase-1 + phase-2 ✅ shipped (16 Jul 2026)**

**Shipped (phase 1, hub surface).** `Grade_7_Math_Hub.html` renders a **"Due for review"** surface in
`renderApp()`: ladder `due = lastPracticed + rung(streak)`, rungs `1 → 3 → 7 → 21 → 42` days,
most-overdue first, never listing an unstarted topic, kept separate from the (monotonic) mastery bar.

**Shipped (phase 2, engine-written streak).** The module engine now records a real **consecutive-session
streak**: a *review session* = one module visit; a visit with ≥3 first-attempt items advances the streak
one rung (≥80% first-attempt) or resets it to 0, **at most once per calendar day** (the day-guard stops
two back-to-back sessions from skipping the ladder). Two additive fields — `reviewStreak`, `reviewDay` —
live inside the topic record; when `reviewStreak` is absent the hub falls back to the phase-1 inferred
proxy (accuracy/evidence/shaky-skill), so migration is zero-regression. Engine hook is `g7review()` in
every module (`__modReview` for tests); the hub prefers the stored value in `reviewStreak()`. Built in
Grade 8 first and ported here ("change both, check both") — 3 G7 engine files + hub + suite; **95
assertions pass**. Note: the G7 modules are behind Grade 8's engine (no `__hubSync`/v1.5 sync), so the
G7 engine block omits `schedulePush`; the review layer itself is at parity.

**Phase 3 (open, optional):** per-*skill* streaks and an in-module `?review=<skill>` retrieval-practice
mode drawn from the topic's authored item pool (put it in `Module_Template.html` and re-stamp).

**Original gap (for context).** A student climbed a lesson, the mastery bar turned green, and the topic
was **never brought back**; `lastPracticed` was recorded and never used to resurface anything — the
single biggest gap across all six codebases. Phases 1–2 above close it: the hub resurfaces due topics,
and the engine schedules them from real spaced-retrieval performance.

**Why.** Spacing is the largest, most replicated effect in the learning literature (`MR-1`, `MR-3`).
A topic taught once is a topic being forgotten; without a return schedule, the green bar is a snapshot
of a memory that is already decaying.

**Where.** The data contract already has what you need: `g7.data` stores per-topic `lastPracticed`,
`attempts`, `correct`, and per-skill `skillStats`. The **hub** (`Grade_7_Math_Hub.html`) already reads
every topic's data to render live mastery — so it is the one-file place to compute and show "what is
due." The `Module_Template.html` engine is where a per-skill review *mode* would live (phase 2).

**Implement (phase 1 — the hub surface, one file, highest value).**
1. Add a **ladder** to the hub's read of `g7.data`: for each topic (and, if `skillStats` supports it,
   each skill), compute a `streak` of consecutive successful sessions (infer from `correct`/`attempts`
   for legacy data, then store it going forward) and a due date:
   `due = lastPracticed + rung(streak)` where `rung = [1, 3, 7, 21, 42]` days, a miss resetting to the
   bottom rung. This is the same ladder the SAT apps now run — copy the shape from
   `PSAT 8-9/app/progress.js`.
2. Render a **"Due for review"** section on the hub: the topics/skills whose rung has elapsed,
   most-overdue first, each linking into its module. Never list a topic the student has not started.
3. Keep the mastery bar honest and monotonic — "due for review" is a *separate* surface, it does not
   drop the mastery bar backwards (`MO-7`, `UX-5`).

**Implement (phase 2 — an in-module Review mode, optional).** Give the module a `?review=<skill>`
entry that draws a short set from the topic's already-authored item pool for the due skill, so a
review is a real retrieval, not a re-read. Put it in `Module_Template.html` and re-stamp, so Grade 8
inherits it.

**Verify.** In the (now-runnable — item 0) behavioral suite, seed `g7.data` with an aged
`lastPracticed` and a mastered topic, and assert it appears in the due-for-review computation; seed a
just-practiced topic and assert it does not. Mirror `PSAT 8-9/app/homework/review-ladder.test.js`.

**Guardrails.** Do **not** change the `g7.` storage prefix or the existing key shapes — back-compat is
explicit in the standard. This touches the **shared data contract**, so **Grade 8 inherits it** —
build it here, then confirm in Grade 8. Never surface an unstarted topic as "due."

---

## 2 · Difficulty calibration — `AS-4` · ✅ shipped as automatic level accounting (16 Jul 2026)

**Correction to an earlier finding in this file.** The modules **do** carry a difficulty ladder: every
card is tagged `learn · guided · practice · apply · exam · stretch`, and a `stretch` tier was already
authored (7 of them in `Number_System_Connections.html`). So nothing needed difficulty tagging — and
**no extra items were added on purpose**: bolting 2–3 variants onto each skill would spend student time
on content the curriculum did not ask for.

**Shipped.** **The lesson's own ladder is the difficulty gradient.** The engine derives the level from
the phase tag each card already carries — `g7level()` called inside `g7log()`, no call-site changes —
into an additive `levelStats{1..4}`:

- **1 Foundational** (`learn`/`guided`) · **2 Target** (`practice`/`apply`) · **3 Exam** — the assessed
  MCAP bar, i.e. the expectation · **4 Stretch** — *beyond* the standard, reported separately and
  **never counted as failure**. `exam` and `stretch` are deliberately **not** merged: the teacher must be
  able to tell "missed the required bar" from "missed a bonus".

The teacher dashboard renders **“By level — Foundational 95% · Target 70% · Exam 40% · *Stretch (beyond)
33%* → Focus: Exam”**, naming the first curriculum level where the student's strength failed — the
teacher's focus point. The remedy stays a human decision; the app measures, the teacher teaches. The
per-skill calibration band (>90% too easy / <70% too hard / on target ~85%) also stays. **117 assertions
pass.**

**Automatic for new modules.** Any module stamped from `Module_Template.html` inherits level accounting
with zero setup (verified by driving the template directly); untagged cards default to Target.

**Deliberately not built.** Machine auto-serving of easier items / skipping drill — the one direction the
house rule forbids ("struggle is met with more targeted practice, never a standard quietly dropped").
The "more for strugglers" half already exists via spaced review + homework.

**Guardrails.** Representation-before-operations and the prerequisite flow still win — never calibrate
a student *past* an unmet prerequisite.

---

## 3 · Durable-learning readout — `AN-4` · ✅ shipped (16 Jul 2026)

**Shipped.** The engine buckets every **first-attempt** by whether the topic was **due for review when
the session started** (`_revWasDue`, snapshotted at load): due → **retention**, not-due →
**acquisition** (four additive fields `acqFirst/acqCorrect/retFirst/retCorrect` that ride the topic
record). The teacher dashboard renders **"Retrieval — first-time X% (a/b) · on review Y% (c/d)"** per
topic, retention flagged red when it drops >15 pts below acquisition — the number that distinguishes
"forgot" from "never learned," the exact thing the reports assert to parents. Teacher-gated
(never student-readable). Built in both grades; 8 assertions here (**103 pass**).

---

## The bar for anything new (future-proofing)

Every new unit, module, or engine feature must clear this before it ships — the standard's principles
plus the retention layer:

- [ ] **Active loop.** Learn→Guided→Practice→Apply→Exam, with a real attempt and immediate feedback —
      never a slide the student only reads.
- [ ] **Enrolled in spacing (item 1).** A new topic records `lastPracticed`/`skillStats` and appears
      in the due-for-review computation. Nothing is climb-once-and-done.
- [ ] **Prerequisite-gated.** No advanced concept before its prerequisite; representation before
      operations.
- [ ] **Strategy-only hints.** A hint coaches the next move and never contains the final answer — a
      worked solution behind a hint is an answer key that corrupts mastery tracking.
- [ ] **Un-telegraphed exam capstones**, drawn from real MCAP items on top of the curriculum, never
      instead of it.
- [ ] **Public repo, publishes markdown.** Any per-student data is gitignored *before* commit and
      lives in a tutor-facing `LEDGER.md` (see `Fareedah/`) — root rule 6.
- [ ] **A test guards it** (item 0 makes this possible — keep the suite green).

## Definition of 100% aligned

Item 0 done (tests run), item 1 shipped (spaced review, inherited by Grade 8), items 2–3 landed, and
the teacher dashboard showing acquisition **and** retention. At that point Memory & retention moves
○ → ●, and this hub matches its own excellent structure with the retention layer it was missing.
