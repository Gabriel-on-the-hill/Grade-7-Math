# Grade 7 Mathematics Hub — Project Operating Standard

**Purpose:** Single source of truth for this Grade 7 Mathematics hub. Any assistant/session should **read this file and `Module_Template.html` first**, then continue at (or above) this standard with minimal prompting. Keep this file updated as the standard evolves.

> Project facts:
> - **Grade:** 7
> - **Subject:** Mathematics (Science scaffolded as "coming soon")
> - **Exam program / focus:** MCAP Grade 7 Mathematics (Maryland Comprehensive Assessment Program)
> - **Curriculum units (CCSS / MCCRS domains):**
>   - **Number System Connections (7.NS)** — operations with all rational numbers (integers, fractions, decimals); number line, opposites & absolute value; adding/subtracting/multiplying/dividing rationals; decimal forms & conversions; real-world multi-step problems. *(BUILT — first unit.)*
>   - **Ratios & Proportional Relationships (7.RP)** — unit rates, proportional relationships, graphs of proportions, solving proportions & scale, percent basics & applications. *(BUILT — second unit.)*
>   - **Expressions, Equations & Inequalities (7.EE)** — build and solve linear equations and inequalities. *(coming soon)*
>   - **Geometry Connections (7.G)** — circles, angles, area, surface area, volume. *(coming soon)*
>   - **Statistics & Probability (7.SP)** — sampling, comparing data sets, probability. *(coming soon)*
> - **Textbooks / source materials in folder (consult every unit):** enVision Mathematics Grade 7, Illustrative Mathematics Grade 7 (Units 4–6 Student, Units 7–9 Teacher Guide), Spectrum Grade 7, Glencoe Georgia Math Grade 7, `Math_Standards.pdf`, `Grade_7_MCAP_Public_Blueprint-A.pdf`, `MCAP Grade 7.pdf` + Answer Key, the Rising/Accelerated summer packets, and the `MCAP RELEASES PER TOPIC/` item sets. Scan the folder for source PDFs at the start of each unit. **Note:** one enVision file in the folder (isbn 9780768567779, "Berry") is *Grade 7 Volume 2* content — usable here, unlike in the Grade 8 project where it is misfiled.

---

## 1. Vision
A Grade 7 Mathematics **study & practice hub** for a teacher with one or more students. Students sign in by name, open a topic, and climb a guided, self-paced lesson. The teacher sees who practiced what, where they struggled (by concept), exam-readiness, and can assign homework. Warm, professional, age-appropriate for ~12-year-olds. Low stress, high rigor, MCAP-ready. Multi-student. The student may be **anyone** — the system is not built around one named student.

## 2. Non-negotiable principles
1. **Consult the textbooks; use the best, no filler.** All source PDFs live in the project folder and **must be consulted** every unit. Scan the folder, read the relevant chapters/items, select the strongest explanations and exercises *from them*. Only substitute a created item when it is genuinely better.
2. **Curriculum ∪ MCAP (union, never trade-off).** Cover every concept the Grade 7 curriculum requires, AND weave in real MCAP items on top as capstones. Never drop curriculum to chase the test.
3. **Flow builds up.** No advanced concept before its prerequisite. Representation before operations. Within a lesson: Learn → Guided → Practice → Apply → Exam.
4. **Hints sparingly.** Only on multi-step/hard items. Never on trivial questions or exam capstones.
5. **One structure, no duplicates.** Reuse the single engine and shared data contract. Never build a parallel system. This engine is shared in spirit with the Grade 8 hub — improve in one place and re-propagate deliberately; do not fork per grade.
6. **Don't bog the student down.** Strategic and lean; quality over quantity.
7. **Professional, not "AI".** No emoji, no gradient/clichéd styling. Clean, real-product look — pitch-green `#14532D` + gold `#FAC415` identity.
8. **On grade.** Match Grade 7; shelve/rebuild anything above or below grade (e.g., any HL grouped-frequency statistics content is NOT Grade 7).

## 3. Files
- `Grade_7_Math_Hub.html` — the home hub. Multi-subject (`SUBJECTS → units → topics`): Mathematics (built) + Science (coming soon); one sign-in, one roster, one teacher dashboard across subjects.
- `Module_Template.html` — canonical module engine + showcase of all 5 formats. **Stamp every unit from this.**
- `Number_System_Connections.html` — Unit 1 (7.NS), built.
- `Ratios_Proportional_Relationships.html` — Unit 2 (7.RP), built.
- `Probability_Lesson.html` — standalone probability lesson on a **legacy engine**; not wired into the hub and pending a grade-level + engine review before adoption. Do not treat as template-parity.
- `index.html` — redirect to the hub. `.gitignore` — blocks copyrighted PDFs + private data from publishing.
- `Starter_Kit/` — `Hub_Template.html`, `Module_Template.html` (generic engine copies), setup docs.

## 4. Shared data contract (localStorage — same browser/origin)
Keys use the `g7.` prefix (native to this project; the hub exposes it as a `STORE_PREFIX` constant). Keys: `g7.roster`, `g7.current`, `g7.subject` (last-selected subject), `g7.seedv` (JSON of the last-applied `ROSTER_SEED`, so seed changes merge exactly once per device), `g7.device` (device binding: the last student to sign in successfully; the sign-in screen then shows only their tile, with a "Someone else? Show all students" link — binding follows the most recent sign-in and survives reloads), `g7.passv` (last-applied `TEACHER_PASS_SEED`; the deployment passcode overwrites any locally set teacher passcode once per seed value), `g7.pins` (`{ "<name>": "<4-digit PIN>" }` — per-student light gate, plaintext, set by the student on first sign-in, teacher-resettable; not real security), `g7.gate` (app access-gate unlock, shared across hub + modules), `g7.sheetURL`, `g7.teacherPass`, and `g7.data` with the per-student/per-topic tree (steps, totalSteps, sectionTotals, lastPracticed, attempts, correct, skillStats, struggles, exam, responses). Teacher homework is per-subject under `students[name].assignments[subjectId]` (legacy `students[name].assignment` still read as Mathematics). A module writes the topic tree; the hub reads it.

**Multi-subject model:** hub config is `SUBJECTS → units → topics`. A topic's `id` **is** the storage key its module writes (`G7_TOPIC_ID`). Existing Math topics keep their bare ids (`number-system`, `ratios`) for back-compat; **every NEW subject's topics must be prefixed with the subject** (e.g. `sci.life`) so two subjects can never collide. Hub + modules share one localStorage, so they must be served from the **same origin**.

**To add a unit:** set `G7_TOPIC_ID` (subject-prefixed for new subjects), `G7_TOPIC_TITLE`, the `G7_SKILLS` map; author content; add one entry to the right subject's `units` in the hub `SUBJECTS` array (status `available` + `file`).

## 5. Module baseline (anatomy)
Header (title · unit · standard · objectives) → hub bar → progress → **5–8 sections**, each = objective + teach card with **one worked example** + a climb of step-locked questions → **module check** (mixed, exam-style) → **make-your-own** challenge → export/reset.

**Phase tags (only chip vocabulary):** Learn / Guided / Practice / Apply / Exam / Stretch. Concept is tracked invisibly via `G7_SKILLS`, not shown as a chip.

**Five item formats (all in the template):** fill-in (accepts equivalent fractions, nudges to simplify), single multiple-choice, multi-select ("select all"), two-part (A unlocks B), constructed-response (typed, logged to teacher). Mark exam-grade items with `data-exam="1"`.

**qid convention (required):** every qcard's `data-qid` is `<section>-<n>` (e.g. `3-2` = section 3, item 2). The number before the first `-` drives `sectionTotals` and the teacher dashboard's per-section bars — never use any other scheme, and never duplicate a qid. Every qid should appear in `G7_SKILLS` (unmapped qids fall back to the `reasoning` skill).

**Access gate:** the hub and every module carry the same gate overlay — constant `PW` in the first inline script; unlock stored under localStorage `g7.gate`, shared across pages. New modules stamped from the template keep it; if the password changes, change it in **every** file. Current password: `grade7` (case-insensitive).

## 6. Homework model
Auto-suggested from each student's weakest concepts (requires **≥2 misses per skill AND ≥25% miss ratio**, so one slip ≠ homework and mastered skills clear); optional teacher-set per-student assignment; the make-your-own challenge as the creative anchor. Homework "Mark done" (student) and constructed-response "Mark reviewed" (teacher) loops close the feedback cycle. Verification is automatic via timestamped tracking + dashboard.

## 7. Build & verify discipline
1. **Consult the sources first** (scan folder, read chapters/items); build from the best.
2. Author from the template; lean, best-of. **Never hand-roll the answer-checking handlers** — they carry the integrity invariants (§8).
3. **Verify every build:** `node --check` every extracted `<script>`; structure checks (`</html>` present, one `<body>`/`</head>`, balanced script tags, qid uniqueness, every qid covered in `G7_SKILLS`); **audit every static `getElementById` target against the markup ids** (this catches the null-binding crash class); recompute every answer key by hand or by code.
4. **Behavioral verification (required for hub or engine changes):** headless jsdom test — load the file with `runScripts:'dangerously'`, seed `localStorage` in `beforeParse` (`g7.gate=ok`, `g7.current`, roster/pins), dispatch `load`, then click through: sign-in → PIN → app; module: answer wrong → retry → correct; reload → progress restored; teacher dashboard renders. **A page that parses can still be dead on arrival** — only a behavioral test (or, at minimum, the getElementById-target audit in step 3) catches that.
5. **Large HTML files (>~35 KB): do NOT use editor Write/Edit tools** — an after-save reformat can truncate the file mid-`<script>` (the Write cap is ~72 KB, and the corruption is silent). Regenerate via a bash `python3` heredoc doing string `.replace()`/`re.sub()` on the intact file, asserting each replacement matched **exactly once**, then re-verify (steps 3–4). Keep a `*.v1bak` copy before transforming.
6. Keep this standard updated; log every build in §10.

## 8. Engine versioning (anti-dilution)
Engine: **Engine v1.4** (ported from the Grade 8 hub, 2026-07-02). The bullets below are **invariants — any new or edited module/hub must preserve every one**:
- **Zero-setup student devices:** `ROSTER_SEED` (edit-per-deployment constant next to `SUBJECTS`) bakes the class roster into the app — a fresh device shows name tiles immediately; students never see teacher setup. `TEACHER_PASS_SEED` pre-sets/reclaims the teacher passcode everywhere (stored base64; checked case-insensitively + trimmed). Seeds merge when the seed list changes (`g7.seedv`/`g7.passv`) without touching PINs, progress, or teacher-added names. **Whenever the roster changes, update `ROSTER_SEED` and redeploy.** Current seeds: `ROSTER_SEED=['Fareedah']`, `TEACHER_PASS_SEED='Gabe'`.
- **Device binding:** after first sign-in the screen shows only that device's student (`g7.device`), with a "Someone else? Show all students" link for shared devices.
- **Per-student PIN gate** (`g7.pins`): create-on-first-sign-in, teacher-resettable; PIN modal markup precedes the wiring script (prevents a fatal null-binding crash) and `wire()` is wrapped in `try/catch` so `boot()` always renders.
- **Teacher access is a proper modal** (create-passcode mode first use, enter mode after) — never `prompt()`/`alert()`.
- **Assessment integrity (modules):** MC explanations hidden until answered (CSS-gated; inline `.mc-feedback` text is auto-captured to `data-exp`); wrong MC answers eliminate the chosen option and let the student retry (no lock-and-reveal); exam-readiness counts **first attempts only**; locked steps have controls `disabled` (no keyboard bypass); Check on an empty box is a no-op; a "not signed in" Guest warning links back to the Hub.
- **Anti-cheat/polish:** MC guess-cooldown (~1.6 s after a wrong click); answers decode via `ansVal()`/`optCorrect()`/`kdec()` with plain-attribute fallback (author plain, run the encode pass before shipping — *encode pass still pending on the built modules; answers currently plaintext via fallback*); storage caps (struggles ≤120, responses ≤60 per topic); number inputs blur on scroll-wheel; keyboard-accessible tiles/cards.

Do not fork the engine per grade/subject; improve in one place and re-propagate deliberately. The hub and `Starter_Kit/Hub_Template.html` carry the same engine; modules and `Starter_Kit/Module_Template.html` carry the module engine.

## 9. How to add a new unit (checklist)
1. Copy `Module_Template.html` → `<Unit_Name>.html`; set `G7_TOPIC_ID`, `G7_TOPIC_TITLE`, `G7_SKILLS`.
2. Scan the folder; read the unit's chapters/items; list curriculum concepts + aligned MCAP items.
3. Author sections in correct flow; weave MCAP items as `Exam` capstones; hints sparingly; one worked example per skill.
4. Add the topic to the right subject's `units` in the hub `SUBJECTS` array (status `available`, `file`). Keep the qid convention (§5) and the access gate (§5).
5. Verify (§7, including the behavioral/getElementById audit) and confirm the dashboard reflects it. Run the encode pass on answers before shipping.

## 10. Build log
- **(earlier)** — Hub, Module Template, Number System Connections (7.NS) and Ratios & Proportional Relationships (7.RP) built at template parity with MCAP items + exam-readiness (original v1 engine).
- **2026-07-02** — **Engine v1.4 port from Grade 8 (parity release).** The Grade 8 hub had advanced five releases (v1.2 multi-subject → v1.3 assessment integrity + fatal-crash fix → v1.3.1 zero-setup devices → v1.4 anti-cheat/polish → device binding) that were never back-ported here. Ported the hardened engine: hub regenerated from the Grade 8 v1.4 engine with Grade 7 `MATH_SKILLS`, `SUBJECTS` (the existing 4 units + Science coming-soon), gate (`grade7`/`g7.gate`), and seeds (`ROSTER_SEED=['Fareedah']`, `TEACHER_PASS_SEED='Gabe'`); crash-safe boot; teacher modal; PIN + device binding; keyboard a11y; decaying homework. Re-engined `Number_System_Connections.html`, `Ratios_Proportional_Relationships.html`, and both `Module_Template.html` files (shared engine swapped in, each module's own `G7_TOPIC_ID`/`TITLE`/`SKILLS` preserved; gate + CSS deltas added; dynamic Guest-note link repointed to the Grade 7 hub). Added `index.html` redirect and `.gitignore`. Verified: `node --check` on every script, structure + qid-uniqueness + `G7_SKILLS`-coverage checks, and a static `getElementById`-target audit (crash class) on hub + all three modules — all pass. **Pending follow-ups:** (a) the base64 answer **encode pass** on the built modules — *done 2026-07-02: all answers/flags encoded and decode-verified*; (b) a **jsdom behavioral suite** (blocked this session — package install unavailable in the sandbox; the getElementById audit is the interim guard); (c) `Probability_Lesson.html` grade-level + engine review before wiring.
- **2026-07-02** — **Per-student exam-program toggle (MCAP vs DC CAPE).** Fareedah is a DC student → sits **DC CAPE** (PARCC-derived), not MCAP. Both assess identical CCSS Grade 7 domains, so the divergence is framing/weighting, not content (see `CAPE_vs_MCAP_Grade7_Blueprint_Comparison.md`). Added `examProgram` per student (`students[name].examProgram` = `mcap`|`cape`, default `mcap`), `EXAM_PROGRAMS` labels, and an `EXAM_SEED={'Fareedah':'cape'}` zero-setup baker (applied once, never clobbers a teacher change). Teacher dashboard now has a per-student MCAP/DC CAPE selector; student app view + exam-readiness lines relabel to the student's program. Content and skills tracking unchanged. Verified: `node --check`, getElementById crash-class audit, and a 6-case logic harness (cold default, seed, teacher override persists, re-seed no-clobber, set, invalid-ignored) all pass. **Next for CAPE:** pull released **PARCC** item shapes (2-pt skill items, a 6-pt modeling task, more technology-enhanced) into Fareedah's capstones.

## 11. Deployment & publishing rules
- Intended: a git repo → GitHub Pages, branch `main`, root; `index.html` redirects to `Grade_7_Math_Hub.html`. (Repo not yet created — this folder is not yet under git.)
- **Publish only** the web app + docs: `index.html`, the hub, the module HTML files, `README`-style docs, this standard, `Starter_Kit/`.
- **NEVER publish copyrighted source material or private data:** no `*.pdf`, no `Curriculum/`, no `MCAP RELEASES PER TOPIC/`, no textbooks, no `Fareedah/`, no `Class Summaries…`. The `.gitignore` enforces this — keep it intact and confirm before the first commit.
- Build the deploy repo in a normal directory, copy the publishable files in, and push from there. After any fix that touches the hub or modules, the live site is stale until pushed — say so explicitly at the end of the session.
