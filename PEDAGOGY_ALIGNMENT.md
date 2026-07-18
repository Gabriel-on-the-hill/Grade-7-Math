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

## Where this hub stands (16 Jul 2026)

The best lesson *structure* of the three families, on the most explicitly principled standard in the
whole tree — and, as of 16 Jul 2026, **with the retention layer it was missing**: topics come back on a
spaced ladder, individual skills come back inside them, and a return visit is a real retrieval rather
than a re-read. Items 0–3 are shipped. **The one remaining category is Motivation & UX (◐) — a real
handbook gap, not a deliberate exclusion** (see item 4).

| Category | Status | |
|---|---|---|
| Cognitive load | ● solid | Learn→Guided→Practice→Apply→Exam; strategy-only hints |
| **Memory & retention** | ● **solid** | **spaced review shipped in full — "Due for review" ladder + engine-written per-topic *and* per-skill streaks + in-module `?review=<skill>` retrieval mode (phase-1 + phase-2 + phase-3)** |
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

## 1 · Add spaced review — `MR-1`, `MR-3` · **phase-1 + phase-2 + phase-3 ✅ shipped (16 Jul 2026)**

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
assertions pass**. (That drift is now closed too — see *Cloud sync* below: G7 has the v1.5 layer and
`schedulePush`, so the two grades are one engine again.)

**Shipped (phase 3, per-skill streaks + in-module retrieval mode).** Phase 3 turned out to be
**load-bearing, not optional** — the reason is worth recording, because the backlog had it filed as
polish. `restoreProgress()` re-fills a completed item with its own correct answer and marks the right MC
option (that is deliberate, and right, for "review your work"). But it meant the hub's brand-new "Due for
review" button *opened an answer key*: verified on a real record — a topic finished 60 days ago and
squarely due re-opened with 3 of 5 inputs on card `2-1` pre-filled with `6`, `-42` on `6-1`, and correct
MC options pre-marked. **The retention layer's front door led to a re-read.** So phase 3:

- **Per-skill ladder.** `skillStats[k]` gains additive `last`/`streak`/`day`, so a *single skill* can come
  due inside an otherwise-solid topic. Same rungs, ≥2 first-attempt items per skill (a module authors far
  fewer items per skill than per topic), same one-rung-per-calendar-day guard, reset on a miss. Legacy
  records have no `last` → no skill is ever falsely due → the row just opens the full lesson. Zero migration.
- **`?review=<skill>` retrieval mode.** Opens up to **4 of that skill's already-authored Target/Exam
  cards** — *no new content authored* (same reasoning as `AS-4`: don't spend student time on items the
  curriculum didn't ask for). Learn/Guided are excluded (scaffolded re-reads) and Stretch is excluded
  (beyond the standard). The set is **cleared for a genuine attempt** — no pre-filled inputs, no pre-marked
  options, lock ladder restored — and the rest of the lesson is hidden. Cards are **moved, not removed**,
  so step totals stay honest; the stored tree is **never written**, so the mastery bar stays monotonic
  (`MO-7`, `UX-5`); and because the topic was due at load, the re-attempt lands in the `AN-4` **retention**
  bucket. Unknown/unauthored skill → normal lesson.
- **The hub closes the loop.** A due row now names the faded skill ("Retrieve: Number line, opposites &
  absolute value") and links to `<module>?review=<skill>` instead of the bare lesson.

Built in `Module_Template.html` and ported to all 5 engine copies + both hubs by extracting the canonical
blocks from the template (never retyped), so the stamped copies cannot drift. **G7 162 assertions pass
(+39), G8 187 (+27)**; the new tests were mutation-checked (disabling review mode fails them immediately).
The guarded invariant, in both suites: **a due revisit must never show its own answers.**

**Original gap (for context).** A student climbed a lesson, the mastery bar turned green, and the topic
was **never brought back**; `lastPracticed` was recorded and never used to resurface anything — the
single biggest gap across all six codebases. Phases 1–3 above close it: the hub resurfaces due topics,
the engine schedules them from real spaced-retrieval performance, and the return visit is a genuine
retrieval instead of a re-read of the answers.

**Why.** Spacing is the largest, most replicated effect in the learning literature (`MR-1`, `MR-3`).
A topic taught once is a topic being forgotten; without a return schedule, the green bar is a snapshot
of a memory that is already decaying.

**Where it lives now** (for the next person who has to change it):

| Piece | File | Entry point |
|---|---|---|
| Due-for-review surface, topic + skill ladder | `Grade_7_Math_Hub.html` | `renderDueReview()`, `dueReviewList()`, `dueSkills()` · `window.__hubReview` |
| Topic & per-skill streak writer, acquisition/retention buckets | every module | `g7review(first,correct,qid)` · `window.__modReview` |
| `?review=<skill>` retrieval mode | every module | `g7reviewMode()` · `window.__modReviewMode` |
| Canonical source for all module-side code | `Module_Template.html` | re-stamp or port from here — never hand-edit one copy |

The ladder shape (`1 → 3 → 7 → 21 → 42`, reset on a miss) is the same one the SAT apps run
(`PSAT 8-9/app/progress.js`) — keep them in agreement.

**The three invariants a change must not break** (all asserted in both suites):

1. **A due revisit never shows its own answers.** `restoreProgress()` pre-fills completed work by
   design; review mode must keep clearing it. This is the whole point of the layer.
2. **The mastery bar never moves backwards.** Review mode reads the tree and never writes it
   (`MO-7`, `UX-5`), and "due for review" stays a *separate* surface.
3. **Nothing unstarted is ever surfaced as due**, and legacy records (no `reviewStreak`, no
   `skillStats[k].last`) degrade to the inferred proxy / full lesson rather than to a false "due".

**Verify.** `npm test` in both grades — G7 **162**, G8 **187**, exit 0. The phase-3 assertions drive the
real journey (hub due-row → its own link → the module it opens) rather than only unit-testing the
ladder, and were mutation-checked: disabling `g7revParam()` fails them immediately.

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
      lives in a tutor-facing `LEDGER.md` (see `<student>/`) — root rule 6.
- [ ] **A test guards it** (item 0 makes this possible — keep the suite green).

## 4 · Motivation layer — `MO-1`…`MO-6` · ⬜ **open — the last category still ◐**

**Correction to an earlier reading of this file (16 Jul 2026).** The status table's "no gamification"
was previously read as a *virtue* — it isn't. **Nothing in the root or hub house rules forbids
gamification**, and the handbook actively calls for it: `MO-2` ("Gamify to increase learning,
engagement, *and* enjoyment — aligned and hack-resistant"), `MO-1` (effortful learning decays to
mediocrity without incentives), `MO-3` (XP ≈ minutes of productive work), `MO-4` (reward curve for
quantity *and* quality), `MO-6` (habit beats motivation). That is 5–6 unbuilt principles — **Motivation
& UX is ◐ because the layer is missing, not because it was declined.**

**What this hub already gets right, and must not lose.** `MO-7` (*progress ≠ points*) is **already
honored**: the mastery bar is share-of-topics-mastered and monotonic, never a point total that can drop.
Any XP added must be a **separate, clearly-labelled effort currency** — never fed into the progress bar.
`MO-5` (close loopholes) is the other constraint: this hub has a real anti-cheat history (v1.4.2), and
`MO-2` is explicit that mechanics rewarding vanity metrics unmoored from learning **corrupt `M1`**
(mastery integrity). Points for opening a page, or a streak that survives without retrieval, would do
exactly that.

**Why it is not built here and now.** It is a genuine design decision with a live tension against this
hub's anti-cheat posture, and it is worth a deliberate call rather than a default — **raise it before
building it.** The honest status is *open*, not *declined*.

**Where it would go.** The hub (`Grade_7_Math_Hub.html`) already reads every topic's record to render
mastery; an effort currency would ride the same read. The spaced-review streak (`reviewStreak`) is
already a real, retrieval-earned number — the one streak in the system that cannot be farmed — so it is
the natural, `MO-5`-safe foundation to build on rather than inventing a new countable.

---

## Definition of 100% aligned — items 0–3 ✅ met (16 Jul 2026); item 4 open

Item 0 done (tests run), item 1 shipped (spaced review, **all three phases**, inherited by Grade 8),
items 2–3 landed, and the teacher dashboard showing acquisition **and** retention. Memory & retention
has moved ○ → ●: this hub now matches its own excellent structure with the retention layer it was
missing. **G7 162 assertions / G8 187, both green.** **Motivation & UX (item 4) remains ◐** — the last
category short of ●.

**What is deliberately not built** (so a future reader doesn't file it as a gap):

- **Machine auto-serving of easier work / skipping drill** — forbidden by the house rule (`AS-4` above).
  Struggle is met with more targeted practice, never a standard quietly dropped. This is the *only*
  item on this list; do not add to it without a house rule to cite.

**The invariant to protect from here on:** a due revisit must never show its own answers. Every future
module stamped from `Module_Template.html` inherits spacing, level accounting, and review mode with zero
setup — but only if it authors real Target/Exam items per skill and keeps its `G7_SKILLS` map honest.
