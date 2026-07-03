# Grade 7 ⟵ Grade 8 Parity Gap Analysis

**Date:** 2026-07-02
**Question answered:** The Grade 8 app was overhauled from Engine v1 → v1.4 (+ device binding). This document maps, in microscopic detail, everything in Grade 8 that Grade 7 is missing and exactly where Grade 7 must be adjusted to catch up.

---

## 0. The headline

Grade 7 **is the ancestor** — the Grade 8 standard literally says *"v1.1 = v1 from Grade 7."* Grade 8 then advanced through **five** releases that were never back-ported here:

| Release | What it added | In Grade 7 today? |
|---|---|---|
| **v1.2** | Multi-subject hub (`SUBJECTS → units → topics`), `STORE_PREFIX`, subject-prefixed topic ids | ❌ Grade 7 still uses flat `UNITS` |
| **v1.3** | Assessment-integrity layer + fatal hub-crash fix | ❌ None present |
| **v1.3.1** | Zero-setup student devices (`ROSTER_SEED` / `TEACHER_PASS_SEED`) | ❌ None present |
| **v1.4** | Anti-cheat/polish: encoded answers, MC cooldown, teacher modal, decaying review, homework/CR loops, storage caps | ❌ None present |
| **(post-1.4)** | Device binding (`g7.device`) + passcode takeover (`g7.passv`) | ❌ None present |

**Verified by code inspection**, not just the standards. Grade 7 grep results: `SUBJECTS`=0, `ROSTER_SEED`=0, `TEACHER_PASS_SEED`=0, `data-k=`(encoded answers)=0, teacher auth still uses `prompt()`/`alert()`, module answers are **plaintext** `data-correct="true"`, there is **no app-entry access gate**, and the folder **is not even a git repo** (no deployment). In short: essentially every Grade 8 improvement is absent from Grade 7.

Grade 7's `PROJECT_STANDARD.md` also has **zero** mention of engine versioning, invariants, or the verify recipe — it is still the original v1 charter (7.6 KB vs Grade 8's 12.6 KB).

---

## 1. Architecture: flat `UNITS` → `SUBJECTS → units → topics` (Engine v1.2)

**Grade 8:** the hub config is a `SUBJECTS` array; each subject has `units`, each unit has `topics`. A topic's `id` **is** the localStorage key its module writes. There's a `STORE_PREFIX` constant (default `g7.`, kept for back-compat) and a rule that every **new** subject's topic ids are subject-prefixed (`sci.life`) so two subjects can't collide. Teacher homework is per-subject: `students[name].assignments[subjectId]` (legacy `students[name].assignment` still read as Mathematics).

**Grade 7 now:** single flat `const UNITS` array in `Grade_7_Math_Hub.html`; homework stored as a single `assignment`.

**Adjust in Grade 7:**
- Decide whether Grade 7 stays single-subject (Math only) or adopts the subject layer. **Recommendation: adopt the v1.2 structure even if only Math ships** — it's the shared engine, and keeping one engine across grades is Non-negotiable Principle #5 ("one structure, no duplicates"). Diverging engines is exactly what that rule forbids.
- Replace the flat `UNITS` array with a `SUBJECTS` array (one subject: Mathematics) in `Grade_7_Math_Hub.html` **and** `Starter_Kit/Hub_Template.html`.
- Add the `STORE_PREFIX` constant (keep `g7.` — Grade 8 already shares this prefix, so data stays compatible).
- Migrate teacher homework read/write to `assignments[subjectId]` with the legacy `assignment` fallback.
- Existing Math topic ids (`number-system`, etc.) stay **bare** for back-compat; only new subjects get prefixes.

**Files:** `Grade_7_Math_Hub.html`, `Starter_Kit/Hub_Template.html`.

---

## 2. Zero-setup student devices — `ROSTER_SEED` / `TEACHER_PASS_SEED` (v1.3.1)

**Grade 8:** the app is fully client-side, so every fresh device starts empty. Grade 8 added two deployment constants next to `SUBJECTS`:
- `ROSTER_SEED` — bakes the class roster into the app; a new device shows name tiles immediately, students never see teacher setup.
- `TEACHER_PASS_SEED` — optionally pre-sets the teacher passcode on every device (stored base64 so it isn't readable in view-source).
- Seed merges are versioned via `g7.seedv` — a seed change merges **exactly once per device** without touching PINs, progress, or teacher-added names.

**Grade 7 now:** none. First run on any new device dead-ends the student into teacher setup (empty roster → Teacher → passcode → Settings → Manage roster). This is the exact first-run failure Grade 8 fixed.

**Adjust in Grade 7:**
- Add `ROSTER_SEED` and `TEACHER_PASS_SEED` constants to `Grade_7_Math_Hub.html` (and the template).
- Add the versioned-merge logic keyed on `g7.seedv` (merge once; never overwrite PINs/progress/teacher additions).
- Add student-friendly empty-state copy.
- Fill the seeds with the real Grade 7 roster (Grade 8's are `['Divine','Ayodeji']` / `'Gabe'` — Grade 7 needs its own; e.g. Damilare, Fareedah, and whoever else is on the Grade 7 roster — **confirm before shipping**).

**Files:** `Grade_7_Math_Hub.html`, `Starter_Kit/Hub_Template.html`.

---

## 3. Device binding + passcode takeover (post-v1.4)

**Grade 8:** after a student's first successful sign-in, the sign-in screen shows **only that student's tile** (`g7.device`), with a *"Someone else? Show all students"* link for shared devices; the binding follows the most recent sign-in and survives reloads. Separately, `TEACHER_PASS_SEED` **overwrites** any locally set teacher passcode once per seed value (`g7.passv`) — reclaiming devices where a student had set their own passcode during the old forced-setup flow. Passcode check is **case-insensitive + trimmed**, and the seed is stored base64-encoded.

**Grade 7 now:** none of `g7.device`, `g7.passv`, the "Someone else?" link, or case-insensitive passcode handling.

**Adjust in Grade 7:**
- Add `g7.device` binding + the "Someone else? Show all students" affordance in the sign-in view.
- Add `g7.passv` one-time passcode-takeover keyed on the seed value.
- Make the teacher passcode check case-insensitive and trimmed (Gabriel's stated preference).

**Files:** `Grade_7_Math_Hub.html`, `Starter_Kit/Hub_Template.html`.

---

## 4. Per-student PIN gate (v1.3.1 hub)

**Grade 8:** `g7.pins` = `{ "<name>": "<4-digit PIN>" }`, a per-student light gate — plaintext, set by the student on first sign-in, teacher-resettable. Not real security, but stops casual tile-tapping into another student's data. The PIN modal markup is deliberately placed **before** the app script (see §5 — this was the fatal-crash fix).

**Grade 7 now:** no PIN concept at all — tapping any name signs straight in.

**Adjust in Grade 7:**
- Add the `g7.pins` store, the create-PIN-on-first-sign-in flow, the enter-PIN modal, and teacher PIN-reset in Manage roster.
- Place the PIN modal markup **above** the wiring script (§5).

**Files:** `Grade_7_Math_Hub.html`, `Starter_Kit/Hub_Template.html`.

---

## 5. The fatal hub-crash fix + defensive boot (v1.3)

**Grade 8:** v1.3 found and fixed a crash where the PIN modal markup sat **below** the script that wired it → `wire()` threw on a null binding → `boot()` never ran → the hub went **blank after the access gate**. Fix: modal markup precedes the script, and `wire()` is wrapped in `try/catch` so `boot()` always renders. The standard now mandates a **behavioral jsdom test** because "a page that parses can still be dead on arrival."

**Grade 7 now:** Grade 7 doesn't have the PIN modal yet, so it doesn't have this specific bug — **but** if PIN/gate markup is added per §4/§6 without the ordering discipline, Grade 7 will reproduce exactly this crash. The `try/catch`-around-`wire()` defensive pattern is also absent.

**Adjust in Grade 7:**
- When adding the PIN/gate modals, keep modal markup above the wiring script.
- Wrap `wire()` in `try/catch` so `boot()` always renders.
- Adopt the behavioral-test requirement into Grade 7's build discipline (§12 below).

**Files:** `Grade_7_Math_Hub.html`, `Starter_Kit/Hub_Template.html`.

---

## 6. App-entry access gate (`g8gate` overlay)

**Grade 8:** the hub and **every module** carry the same access-gate overlay — a constant `PW` in the first inline script, unlock stored under localStorage (`g8.gate`), shared across pages. New modules stamped from the template inherit it.

**Grade 7 now:** **no app-entry gate exists.** The "Teacher passcode" in Grade 7 only gates the teacher dashboard, not entry to the app. Anyone with the URL is straight in. (Grep for a gate/overlay in the hub = 0.)

**Adjust in Grade 7:**
- Add the same first-script access-gate overlay + `PW` constant to `Grade_7_Math_Hub.html`, **every module** (`Number_System_Connections.html`, `Ratios_Proportional_Relationships.html`, `Probability_Lesson.html`), and both `Starter_Kit` templates.
- Use a Grade-7-specific storage key (e.g. `g7.gate`) so it's independent of Grade 8's `g8.gate`.
- Note the invariant: if the password ever changes, it must change in **every** file.

**Files:** hub + all 3 modules + `Module_Template.html` + both `Starter_Kit` templates.

---

## 7. Teacher access: `prompt()`/`alert()` → real modal (v1.4)

**Grade 8:** teacher access is a proper modal — **create-passcode mode** on first use, **enter mode** after. Never `prompt()`/`alert()`.

**Grade 7 now (confirmed in code):** `Grade_7_Math_Hub.html` line ~432 uses `var entry = prompt('Enter teacher passcode:')` and `alert('Incorrect passcode.')` / `alert('Set a teacher passcode first…')`. This is the exact legacy pattern Grade 8 removed.

**Adjust in Grade 7:**
- Replace the `prompt()`/`alert()` teacher-auth path with the modal (first-time create + subsequent enter), matching Grade 8.

**Files:** `Grade_7_Math_Hub.html`, `Starter_Kit/Hub_Template.html`.

---

## 8. Assessment-integrity layer (v1.3) — modules

Grade 8 modules preserve these as **invariants**. Grade 7 modules have **none** of them (confirmed: plaintext `data-correct`, generic lock styling only).

| Invariant (Grade 8) | Grade 7 today | Fix in Grade 7 |
|---|---|---|
| **MC explanations hidden until answered** (they used to leak the answer) | Not gated | CSS-gate MC explanation/feedback until the item is answered |
| **Wrong MC → eliminate & retry**, not lock-and-reveal (mastery stays reachable) | Wrong answer path locks/reveals | Change handler to eliminate the chosen option and let the student retry |
| **Exam-readiness = first attempts only** across all formats (retries can't inflate) | Not implemented | Count first attempt only for fill-in / MC / multi-select toward `exam` stats |
| **Locked steps have controls `disabled`** (no keyboard bypass) | Locked via `pointer-events:none` only — keyboard can still reach them | Add `disabled` to controls inside `.step.locked` |
| **Check on empty box = no-op** (no false struggles) | Not guaranteed | Empty-input Check returns early, records nothing |
| **"Not signed in" Guest warning** linking back to the Hub | Absent | Add Guest-save warning banner/link |

**Files:** all Grade 7 modules + `Module_Template.html`. **Do not hand-roll these handlers** — they carry the invariants; port the engine handler wholesale.

---

## 9. Anti-cheat / polish layer (v1.4) — modules + hub

| Feature (Grade 8) | Grade 7 today | Fix in Grade 7 |
|---|---|---|
| **Answer obfuscation** — `data-answer="k1:<base64>"`, per-option `data-k="k1:<base64 of n\|0/1>"`, no `data-correct` anywhere; decoded via `ansVal()`/`optCorrect()` with plain fallback | **Plaintext** `data-correct="true"` / `data-answer` visible in view-source | Author plain, then run the **encode pass** before shipping; add `ansVal()`/`optCorrect()` decode helpers. (~109 flags + 43 answers were encoded across Grade 8's 3 module files; Grade 7 has a similar count to encode.) |
| **MC guess-cooldown** — after a wrong MC click, options lock ~1.6 s | Absent | Add the 1.6 s cooldown to the MC handler |
| **Decaying "skills to review" + homework** — a skill counts only with **≥2 misses AND ≥25% miss ratio**; mastered skills clear | Homework/struggle suggestions don't decay | Add the ≥2-miss **and** ≥25%-ratio gate to skill/homework suggestion logic |
| **Homework "Mark done" loop** — student toggle (`assignments[sid].doneTs`) → teacher sees "marked done"; new assignment resets it | Absent | Add student done-toggle + teacher-visible status + reset-on-new-assignment |
| **CR "Mark reviewed" loop** — teacher toggles `responses[i].reviewed` → student sees "✓ Reviewed by your teacher" | Absent | Add teacher review-toggle + student-facing "✓ Reviewed" |
| **Storage caps** — struggles ≤120, responses ≤60 per topic | Uncapped | Cap on write |
| **Wheel-guard** — number inputs blur on scroll-wheel (stop accidental value changes) | Absent | Add `wheel` → `blur()` guard on number inputs |
| **No "Clear All" copy** in the answer guide | Check/remove | Remove any "Clear All" claim |

**Files:** all Grade 7 modules + `Module_Template.html` (encoding, MC cooldown, CR loop, caps, wheel-guard); `Grade_7_Math_Hub.html` + `Hub_Template.html` (decay gate, homework done-loop).

---

## 10. Keyboard accessibility (v1.3 hub)

**Grade 8:** sign-in tiles and topic cards are keyboard-accessible — `role="button"`, `tabindex`, Enter/Space handlers, visible focus outline.

**Grade 7 now:** `role="button"` count = 0. Tiles/cards are mouse-only.

**Adjust in Grade 7:** add `role="button"`, `tabindex="0"`, Enter/Space activation, and a focus outline to sign-in tiles and topic cards in `Grade_7_Math_Hub.html` + `Hub_Template.html`.

---

## 11. Homework threshold nuance (v1.3)

**Grade 8:** homework auto-suggestion requires **≥2 misses per skill** (one slip ≠ homework). This is subtly different from — and complementary to — the v1.4 decay gate (§9).

**Grade 7 now:** no minimum-miss threshold on auto-suggested homework.

**Adjust in Grade 7:** add the ≥2-miss floor to homework auto-suggestion in the hub (folds into the §9 decay change).

---

## 12. `PROJECT_STANDARD.md` itself is out of date

Grade 7's standard is the **original v1 charter**. It is missing everything Grade 8 added to *govern* the engine:

- **§8 Engine versioning (anti-dilution)** with the full invariant list — Grade 7 has no engine-version section at all (`grep "Engine v"` = 0).
- **Verify recipe upgrades:** Grade 8 §7 mandates (a) `node --check` on every extracted script, (b) structure checks incl. **qid uniqueness** and every qid covered in `G7_SKILLS`, and (c) a **behavioral jsdom test** (`runScripts:'dangerously'`, seed localStorage, dispatch `load`, click through sign-in → PIN → module → reload-restore → teacher dashboard). Grade 7 §7 only asks for a loose "DOM/logic test."
- **Large-file rule refinement:** Grade 7 §7.4 says files **>70 KB** truncate with Write/Edit and suggests bash editing. Grade 8 §7.5 tightened this to **>~35 KB**, warns the truncation happens on an **after-save reformat mid-`<script>`**, and prescribes the exact recipe: regenerate via a bash `python3` heredoc doing string `.replace()` on the intact file, then re-verify, asserting each replacement matched **exactly once**. (This matches the project memory note about the Write cap.)
- **qid convention (§5):** Grade 8 spells out `data-qid = <section>-<n>`, that the number before the first `-` drives `sectionTotals`/dashboard bars, and "never duplicate a qid." Grade 7's standard doesn't state this rule explicitly.
- **§11 Deployment & publishing rules** — Grade 7 has none (see §13).
- **Multi-subject data-contract wording (§4)** — Grade 7 §4 documents only the flat single-subject shape.

**Adjust in Grade 7:** bring `PROJECT_STANDARD.md` up to the Grade 8 structure — add the engine-versioning section, the hardened verify recipe, the 35 KB rule + python-heredoc recipe, the explicit qid rule, and a deployment section. Keep Grade 7's identity notes (pitch-green `#14532D` + gold `#FAC415`, ~12-year-old tone) which Grade 8's dropped.

---

## 13. Deployment / publishing is entirely absent

**Grade 8:** git repo → **GitHub Pages** (`Gabriel-on-the-hill/Grade-8` → `gabriel-on-the-hill.github.io/Grade-8/`), `index.html` redirect, a `.gitignore` that **blocks copyrighted PDFs/`Curriculum/`/`MCAP MATHS/`/`Textbooks/`**, and a documented deploy flow (build in `/tmp/deploy`, copy publishable files, push). Standard §11 warns the live site is stale until pushed.

**Grade 7 now:** **not a git repo** (no `.git`), no `.gitignore`, no `index.html` redirect, no Pages deployment. There is currently **no way to publish Grade 7** and no protection against committing the copyrighted textbook PDFs sitting in the folder (enVision, Illustrative Mathematics, Spectrum, Glencoe, MCAP releases — several are large copyrighted works).

**Adjust in Grade 7:**
- Add a `.gitignore` mirroring Grade 8's (exclude all `*.pdf`, `Curriculum/`, `MCAP RELEASES PER TOPIC/`, any textbook folders, `Fareedah/`, `Class Summaries…` if private).
- Add an `index.html` redirect to `Grade_7_Math_Hub.html` (Grade 7 has a `Module_Template.html` but no `index.html`).
- Stand up a Grade-7 Pages repo and document the deploy flow in the standard §11.
- **Before any first commit, confirm the `.gitignore` blocks every PDF** — the folder is full of copyrighted material.

---

## 14. Starter Kit drift

Grade 8's `Starter_Kit/` carries the **current** engine (Hub_Template 702 lines, Module_Template 432 lines, plus `NEW_GRADE_SETUP.md`, `PROJECT_STANDARD_TEMPLATE.md`, `README.md`). Grade 7's `Starter_Kit/` templates are the **old** engine (Hub_Template 575 lines, Module_Template 398 lines) — they'd stamp new units at v1, re-introducing every gap above.

**Adjust in Grade 7:** re-propagate the finished engine into `Grade_7 Starter_Kit/Hub_Template.html` and `Module_Template.html` so future units inherit v1.4. (Grade 7's Starter Kit already has `NEW_GRADE_SETUP.md` / `PROJECT_STANDARD_TEMPLATE.md` / `README.md`, so those just need content refresh, not creation.)

---

## 15. Recommended sequencing

Because the module engine handlers carry the integrity invariants, do the engine before the content:

1. **Hub engine** (`Grade_7_Math_Hub.html`): v1.2 SUBJECTS + STORE_PREFIX → teacher modal → PIN gate (markup-above-script) → ROSTER/PASS seeds → device binding/passv → keyboard a11y → homework decay/≥2-miss/done-loop. Wrap `wire()` in try/catch.
2. **Access gate** across hub + all modules + templates.
3. **Module engine** (`Module_Template.html` first, then stamp the 3 live modules): assessment-integrity six + anti-cheat layer + CR-reviewed + caps + wheel-guard.
4. **Encode pass** on all module answers (kill every plaintext `data-correct`/`data-answer`).
5. **Starter Kit** re-propagation.
6. **`PROJECT_STANDARD.md`** rewrite to Grade 8 structure (keep Grade 7 identity).
7. **Deployment:** `.gitignore` (verify PDFs blocked) → `index.html` redirect → Pages repo.
8. **Verify:** `node --check` every script, qid-uniqueness + `G7_SKILLS` coverage, recompute every answer key, **jsdom behavioral suite** (cold start → gate → tile → PIN create/enter → module wrong→retry→correct → reload-restore → teacher dashboard). Ideally spin a verification subagent for this.

**Open decisions to confirm before building:** (a) the real Grade 7 `ROSTER_SEED` names + `TEACHER_PASS_SEED`; (b) whether to keep `g7.` storage prefix shared with Grade 8 or isolate Grade 7 with a distinct prefix; (c) whether Grade 7 adopts the subject layer now (recommended) or stays Math-only structurally.

*Not an engine gap — tracked separately:* content parity. Grade 8 has 2 fully-built + enriched units (Number System, Expressions & Equations); Grade 7 has Number System + Ratios & Proportional Relationships + a Probability lesson/app. That's a separate curriculum-build track, not part of this engine back-port.

---

# PART II — Flow, Logic & Design (behavioral deep-dive)

The feature list above is *what's* missing. This part is *how the app behaves* — the three axes you asked about. Verified by reading the actual handlers in both codebases.

## A. Design — same system, fewer components

The **design tokens are byte-identical**: Grade 8 inherited Grade 7's exact palette (`--green:#14532D`, `--gold:#FAC415`, `--bg:#F4F2EC`, `--card:#FFFFFF`, same `--muted`/`--line`/`--ok`/`--warn`/`--bad`), the same `--shadow` stack, and the same system font. So this is **not** a re-skin — the identity is preserved. The design gap is purely that Grade 8 grew **more UI components and screens** on top of the same system:

- **Full-screen access gate** (`#g8gate`) — a solid pitch-green entry screen with the `PW` prompt. Grade 7 has no entry screen at all.
- **PIN modal** (`#pinModal`) — a polished component with a circular initial-avatar (`#pin-av`), a show/hide password **"eye"** toggle (`#pin-eye`), a confirm-PIN field for first-time setup (`#pin2`), an inline error line (`#pin-err`), and a *"Forgot PIN? Ask your teacher"* affordance. None of this exists in Grade 7.
- **Teacher modal** (`#teacherModal`) — replaces the browser `prompt()` dialog with an in-app modal styled to the system.
- **Subject-tab bar** (`#subject-tabs`) inside the app view — the visual surface of the multi-subject model. Grade 7's app view has no tab bar.
- **Device-bound sign-in** — Grade 8's sign-in renders a **single tile** (the bound student) with a subtle "Someone else?" link; Grade 7 always renders the **full roster grid** (`#roster-grid`), so every student sees every classmate's name.

**Net design adjustment for Grade 7:** you don't restyle anything — you *add* these four components (gate, PIN modal, teacher modal, subject tabs) and the single-tile sign-in state, all using the existing tokens so they match automatically.

## B. Flow — the student journey diverged

**Grade 7 today (v1 flow):**
`[no gate]` → sign-in grid showing **all** names → tap a name → **straight into the app** → topic cards → module. Teacher access = browser `prompt()`. First run on a fresh device: empty roster → dead-ends the student into teacher setup.

**Grade 8 now:**
`access gate (PW)` → device-bound **single tile** (or "Someone else?") → tap name → **PIN modal** (create on first sign-in, enter thereafter) → app **with subject tabs** → topic → module. Teacher access = modal (create-then-enter). First run: gate → tap seeded name → create PIN → work (**zero teacher setup**). Two feedback loops now **close**: homework *Mark done* (student → teacher sees it) and constructed-response *Mark reviewed* (teacher → student sees "✓ Reviewed").

**The flow adjustments Grade 7 needs**, in journey order:
1. Insert the **gate** before everything (§6).
2. Sign-in: **bind to device** and default to the single-tile state (§3).
3. Insert the **PIN step** between name-tap and app (§4).
4. Make **first-run zero-setup** via seeds (§2) — removes the current dead-end.
5. Add the **subject-tab** surface in the app view (§1).
6. Replace the teacher `prompt()` with the **modal** (§7).
7. Close the **homework-done** and **CR-reviewed** loops (§9) so the teacher↔student cycle isn't one-way.

## C. Logic — the handlers behave differently (highest-stakes gap)

The two module engines share the same skeleton — same function names (`checkInput`, `unlockNext`, `saveStepDone`, `restoreProgress`, `g7log`) — but Grade 8's are a **superset** with added helpers (`ansVal`, `optCorrect`, `kdec`, `setStepDisabled`) and changed behavior. The differences below were read line-by-line from the click handlers:

**1. Wrong multiple-choice answer — the biggest behavioral divergence.**
- *Grade 7:* first click **locks the question** (`group.classList.add('answered')`), disables all options, and on a wrong answer **reveals the correct option** (`c.classList.add('correct')`). One shot, answer leaked, mastery unreachable on that item.
- *Grade 8:* eliminates **only the chosen** option (`opt.classList.add('disabled')`), leaves the question **open**, applies a **1.6 s cooldown** to the remaining options, and hides the explanation until solved. The student re-reads and retries; mastery stays reachable; nothing leaks.

**2. Explanation leakage.** Grade 7's MC feedback text is present/appended in the DOM path so the explanation can be visible before answering. Grade 8 stashes it in `fb.dataset.exp` and only renders it **on correct** — CSS-gated until answered.

**3. Exam-readiness inflation.** Grade 7's handlers call `g7log(...exam)` on **every** attempt, so retries inflate exam-readiness. Grade 8 counts **first attempts only** across fill-in / MC / multi-select — retries can't pad the score.

**4. Empty-Check false struggles.** In Grade 7, `checkInput` returns `null` on an empty box, which the click handler treats as "not correct" → it logs a **wrong attempt** (a false struggle in the teacher dashboard). Grade 8 makes an empty Check a **no-op** — records nothing.

**5. Locked-step bypass.** Grade 7 locks steps with `pointer-events:none` **only** — the controls are still in the tab order and keyboard-reachable, so a keyboard user can act on a locked step. Grade 8 adds `setStepDisabled()` which sets the actual `disabled` attribute.

**6. Answer storage.** Grade 7 checks against **plaintext** `data-answer` / `data-correct="true"` (visible in view-source). Grade 8 decodes base64 via `ansVal()`/`optCorrect()`/`kdec()` with a plain-attribute fallback — same logic, obfuscated keys.

**7. Skill/homework signal quality.** Grade 7 flags a skill for review on **any** miss. Grade 8 requires **≥2 misses AND ≥25% miss ratio**, so a single slip doesn't generate homework and mastered skills clear as clean attempts accumulate.

**8. Input hygiene.** Grade 7 number inputs have no wheel-guard (a scroll can change a value mid-answer) and storage is uncapped. Grade 8 blurs number inputs on `wheel` and caps struggles ≤120 / responses ≤60 per topic.

**Logic adjustment for Grade 7:** port the Grade 8 module click-handler wholesale rather than patching Grade 7's — items 1–8 are all inside the same two handlers (the `.check-btn` path and the `.mc-option`/`.ms-option` path), and the standard is explicit that these must not be hand-rolled because they carry the integrity invariants. Multi-select is the one place Grade 7 already retries (it removes the wrong highlight after ~1.1 s instead of locking), so that path is closest to parity.

**Note on the fill-in checker:** the *equivalent-fraction / simplify-nudge* logic (`g7fracVal`, `g7isLowest`, `normalizeText`, tolerance-based numeric compare) is **identical** in both — that part of Grade 7's logic is already at parity and should be preserved as-is.

---

# PART III — Code Quality

**Verdict first: Grade 7's code is sound, not sloppy.** Every script passes `node --check` clean (hub, all 3 modules, template), there are **no duplicate qids**, the localStorage read layer is properly guarded in both grades (`jget()` and `g7all()` wrap `JSON.parse` in try/catch with fallbacks — byte-identical to Grade 8), and there are no `TODO`/`FIXME`/`HACK` markers or leftover `console.log`s (Grade 7 actually has **zero** console noise; Grade 8 left one in). So this is not a rewrite-for-quality situation. The gap is that Grade 8's five releases **hardened** the code and the process around it, and Grade 7 is still at the softer bar. Six concrete quality deltas:

**1. Boot is not crash-resilient (the important one).**
Grade 7's hub ends with a **bare** `wire(); boot();` (lines ~570–571) — no guard. Grade 8 wraps the wiring in `try/catch` so `boot()` **always** renders even if one binding is null. This is the exact resilience that would have prevented Grade 8's v1.3 blank-hub crash. The danger is concrete: the moment you add the PIN/gate markup (§4/§6), a single mis-ordered element makes `wire()` throw and Grade 7 goes **blank after the gate with no recovery** — same failure mode Grade 8 already hit, and Grade 7 has none of the protection. *Fix: wrap `wire()` in try/catch before adding any new markup.*

**2. Thinner defensive surface overall.**
try/catch count: hub **3 (G7) vs 8 (G8)**, module **2 (G7) vs 5 (G8)**. Grade 8 additionally guards `localStorage.setItem` on the write path (Safari private-mode throws on write) inside `unlock()`; Grade 7's write path (`jset`/`LS.setItem`) is unguarded, so a student in private/locked-down browsing can hit an uncaught exception. Grade 8's answer-decode path also adds try/catch around the base64 decode. *Fix: adopt the write-side guards when porting.*

**3. Intra-project style drift.**
Grade 7 is inconsistent **with itself**: the hub is pure ES5 (`var` ×67, `let/const` ×0) but the Number System module leans modern (`let/const` ×71). Grade 8 **unified** the engine to ES5 `var` across hub *and* module (module `let/const` dropped to ~5) so both files follow one convention. Mixed conventions across files that share an engine is a maintainability smell and a sign the engine was never truly single-sourced. *Fix: standardize the module engine to the hub's convention during the port (falls out naturally from porting the Grade 8 handlers).*

**4. Answer keys are plaintext in source.**
The Number System module ships **184** `data-correct`/`data-answer` attributes in the clear (Ratios: 28) — trivially readable via view-source. Beyond the anti-cheat angle (§9), this is a code-hygiene issue: the encode pass + `ansVal()`/`optCorrect()`/`kdec()` decode helpers are the clean pattern. *Fix: run the encode pass; keep authoring plaintext, encode before ship.*

**5. The verification bar itself is weaker.**
Grade 7's standard (§7) asks only for a loose *"DOM/logic test."* Grade 8 mandates a **jsdom behavioral suite** (cold start → gate → tile → PIN → module wrong→retry→correct → reload-restore → teacher dashboard) plus qid-uniqueness and `G7_SKILLS`-coverage checks. This is the meta-quality gap: **parse-clean ≠ working** — Grade 8's v1.3 crash passed `node --check` and still blanked the page; only a behavioral test caught it. Grade 7 currently ships on the confidence that a script *parses*, which is exactly the bar that let that regression through. *Fix: adopt the behavioral-test requirement into Grade 7's build discipline before making engine changes.*

**6. The large-file edit threshold is wrong — an active corruption risk.**
Grade 7's standard says files *">~70 KB"* truncate with Write/Edit. The real cap is **~35 KB** (Grade 8's standard and the project memory both confirm the Write tool truncates ~72 KB and a post-save reformat can cut mid-`<script>`). `Number_System_Connections.html` is **~112 KB** and `Ratios_Proportional_Relationships.html` ~44 KB — both above the *real* threshold. Editing them with the editor tools risks **silent mid-script truncation** (corrupt file that may still look plausible). Grade 8 prescribes the safe recipe: regenerate via a bash `python3` heredoc doing string `.replace()` on the intact file, asserting each replacement matched **exactly once**, then re-verify. *Fix: correct the threshold in the standard and use the heredoc recipe for every module edit in the port.*

**Bottom line on quality:** nothing here is "bad code" — it's *v1 code held to v1 standards.* The port isn't about cleaning up messy code; it's about raising Grade 7 to the hardened defensive patterns (crash-safe boot, guarded writes, unified style, encoded keys) and the stricter verification discipline (behavioral tests, correct edit recipe) that Grade 8 earned across five releases. Do the boot-resilience fix (#1) and the correct edit recipe (#6) *first*, because they protect every other change you make.
