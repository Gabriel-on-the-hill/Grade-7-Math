# Grade 7 Hub — hand-off

**Written 20 Jul 2026, end of a long session.** Everything below is **decided**, not open. The next
session should be implementation only — if you find yourself re-litigating a choice recorded here,
read the *why* first; it is written down precisely so it does not get re-argued from scratch.

**Read first, in this order:** [PROJECT_STANDARD.md](PROJECT_STANDARD.md) · [AGENTS.md](AGENTS.md) ·
[MCAP_PROVENANCE.md](MCAP_PROVENANCE.md) · [STANDARDS_COVERAGE_MATRIX.md](STANDARDS_COVERAGE_MATRIX.md).
Working with the student? `../Fareedah/LEDGER.md` **before** planning anything for her.

---

## 0 · State on hand-off

All five maths domains built and wired. **170 items, 33 skills**, every skill carrying at least one
machine-scored exam item. Every requirement row in the coverage matrix is met.

```
exam_coverage · module_integrity · mcap_provenance · module_smoke
plot_format · starter_kit · math_formatting · homework_deeplink
homework_engine · homework_publish                          all PASS
behavioural suite                                    199 passed, 0 failed
Grade 8                                              269 passed, 0 failed
```

Everything is committed and pushed on `main` in both repos. **The live site is current.**

### The verification protocol — run all of it, every time

```bash
cd "c:/Antigravity/Grade 7"
for t in tests/*.test.js; do node "$t" || echo "FAILED: $t"; done
node tests/behavioral_test_suite.js .
```

Plus, for any content change: `node --check` each extracted `<script>`, qid uniqueness, full
`G7_SKILLS` coverage, every SVG parsed as XML, and **every new answer key recomputed independently**
(use `fractions.Fraction`, not floats). §7.5 still applies: files are 70–140 KB, so **never** use an
editor Write/Edit on a module — generate with a Python script that asserts each replacement matched
exactly once.

---

## 1 · Decisions already made — do not re-open

| # | Decision | Why |
|---|---|---|
| D1 | **Never split the Ratios module** into RP Part 1 / Part 2 | Renaming qids orphans stored student data (§5). The APS sequencing concern is handled by a prerequisite pointer in §6, already shipped. |
| D2 | **Starter Kit: loud failure + single constant, not an engine-wide refactor** | The damage was *silent* collision, not duplication. Done: prefix is `CHANGEME.`, single-sourced, with a boot banner. The engine-wide single-constant work rides the next substantial engine change — not a standalone refactor of two live products. |
| D3 | **Motivation layer: build `MO-6` habit only. Decline `MO-2`/`MO-3`/`MO-4` (XP, points, badges)** | Evidence says the constraint is access and habit, not motivation: the ledger's open problem is *"She could not get her homework."* She scored 83% at baseline and asks *why*. Points solve a problem she does not have; cohort mechanics need a cohort. `reviewStreak` is already retrieval-earned and unfarmable — surface that, invent no second currency. Revisit only if the roster becomes a cohort. |
| D4 | **NS Q11 shipped via the new plot format, not dropped** | The missing format was blocking a whole *verb* — represent/graph/plot — not one item. Built. |
| D5 | **The backend `.gs` stays single-sourced in Grade 8** | One Apps Script deployment serves every hub; copying it here would fork a live backend (§2.5). Documented instead in §6.1, with a pointer to the guard that covers `grade7` isolation. |
| D6 | **NYSED material may be used but never labelled MCAP** | The 2023/2024/2025 `released-items-math-g7.pdf` files in `MCAP RELEASES PER TOPIC/` are **New York State**, not Maryland. 108 pages. Label `NYSED ·`. Guard rejects a MCAP citation naming them. |
| D7 | **Adapted items lose the MCAP label** | Change the numbers or the response format and it is no longer that released item. `ex-2a` and `4-3` were demoted on these grounds. |

---

## 2 · Tasks, in recommended order

Each task states **what**, **where**, **how to verify**, and **done when**. Effort is rough.

### T1 — Lift the remaining Type 2/3 items · **highest value** · ~2 h

*Progress 20 Jul: Q24 and Q25 lifted; Q23 blocked. **Five remain.***

DC CAPE puts **42% of its 52 points** on Type 2 (reasoning) and Type 3 (modelling). These are real
released items, already indexed, and they beat authoring our own.

| Packet | Citation | Standards | Target module / skill |
|---|---|---|---|
| Reasoning | 2024 Q15 | 7.R.2d, 7.NS.A.2d | Number System · `decimals` — **drop-down item, verify it renders before use** |
| ~~Reasoning~~ | ~~2024 Q25~~ | 7.R.3a, 7.EE.A.1 | **DONE** — live as Expressions `2-6` (constructed response) |
| Reasoning | 2024 Q31 | 7.R.1c, 7.RP.A.3-1 | Ratios · `reasoning` |
| Reasoning | 2024 Q33 | 7.R.3b, 7.EE.B.4a-2 | Expressions · `reasoning` |
| Modeling | 2024 Q16 | 7.M.3, 7.EE.B.4a | Expressions · `modeling` |
| Modeling | 2024 Q18 | 7.M.3, 7.G.B.6 | Geometry · `modeling` |
| ~~Modeling~~ | ~~2024 Q23~~ | 7.M.1, 7.RP.A.3-2, 7.G.B.6 | **BLOCKED** — composite solid, notch depth unreadable from the release. Do not re-attempt from the PDF. |
| Modeling | 2024 Q30 | 7.M.4, 7.EE.B.3, 7.G.B.4-1 | Expressions or Geometry · `modeling` |

**Method (this is the part that matters):**
1. `pdftotext -layout` first, to index. **Never author from the text alone** — figures are dropped and
   the stub reads like a whole question.
2. Render the page: `fitz.open(pdf)[i].get_pixmap(dpi=125).save(...)`, then *read the image*. Crop and
   re-render at 300–400 dpi for any figure whose values you must read off (dot counts, point
   positions). Two of this session's items needed that.
3. Reproduce the stem **verbatim**. Rebuild the figure to its stated dimensions.
4. Add a row to `MCAP_PROVENANCE.md` **Verified items** with packet + question number.
5. Recompute the key independently.

**Do not use** an item whose answer options are not rendered in the release (drop-downs collapse to
"Choose …" — that is why Statistics Q27 is data-only). If that happens, reuse the *data* in an
honestly-labelled `Exam-style` item and record it under "Data reused from a released item".

**Done when:** `mcap_provenance` passes with the new rows, every module has ≥2 reasoning and ≥2
modelling items, `exam_coverage` still green.

### T2 — Ratios Q1 (four-graph select) · ~1 h

2024 Release Q1 (7.RP.A.2b): *which graph shows a proportional relationship with k = ½.* Reproducible;
it just needs four small SVG graphs authored as MC option contents. `mc-option` buttons accept inline
HTML — see `Geometry_Connections.html` `3-4` for the pattern of an option-heavy item, and `r3-6` for
the graph-drawing helper (`gx`/`gy` mapping functions in the build script are worth copying).

**Done when:** live in `Ratios` §3 as `r3-7`, cited in the manifest, `math_formatting` green.

### T3 — Motivation: the habit half only (D3) · ~2 h

**Build:**
- Surface `reviewStreak` in `Grade_7_Math_Hub.html` as a quiet consistency line ("3 sessions in a row"),
  next to — never inside — the mastery bar.
- **Forgiving break rule:** missing one scheduled day must not zero it. Handbook `MO-6`: missing a day
  does not break habit formation, and a punitive streak causes quitting.
- A "same time, same place" cue prompt at first sign-in, once, dismissible.

**Do not build:** XP, points, badges, levels, leaderboards, or any second countable.

**Guard it:** extend `tests/behavioral_test_suite.js` — the streak must never feed the mastery bar
(`MO-7`, already an invariant) and must survive a single missed day.

**Then update** `PEDAGOGY_ALIGNMENT.md` item 4: mark `MO-6` built and `MO-2/3/4` **declined with the
reason from D3**, so the category stops reading as an unexamined gap.

### T4 — NYSED material as sourced practice · ~3–4 h, do in slices

108 pages across three PDFs. Good CCSS practice; **not MCAP** (D6).

1. Add an **"Other released items"** table to `MCAP_PROVENANCE.md` (NYSED gets its own table — never
   the MCAP one; the guard will reject a NYSED citation there).
2. Introduce an `NYSED ·` title prefix, and extend `tests/mcap_provenance.test.js` so that prefix
   requires a row in *that* table.
3. Work one domain at a time. Target the 23 items still labelled `Exam-style ·` — upgrading them from
   *ours* to *sourced* is the point.

### T5 — Fareedah's ledger · **do before the next teaching session** · ~30 min

`../Fareedah/LEDGER.md` is still marked **DRAFT** and the June class summaries have never been read
into it. It is also the file the house rules say to read before planning anything for her.

**Assign Geometry first.** It was her only domain with no positive evidence (0/1 at baseline) and the
app could not previously ask her a single question about it. It now has 28 items including two real
MCAP capstones. The ledger says *"assign a few more geometry items before concluding anything"* — that
is now possible.

Also confirm she can **reach the app on her own**. The 3 Jul delivery failure is still the only open
problem on her record, and D3 rests on that diagnosis being right.

### T6 — Engine-wide store constant (deferred half of D2) · ~2 h · **only alongside other engine work**

The Starter Kit is fixed. The built modules still hardcode `g7.` / `g8.` literals; the hub honours
`STORE_PREFIX` and the modules do not. Backlog §8's lesson: *a constant only one of the sharing files
honours is not a constant.* Low frequency of harm (fires once per new deployment, and the kit now
fails loudly), so **do not do this as a standalone refactor of two shipping products.** Fold it in
when the engine is next opened for another reason.

---

## 2b · Where to look harder — scrutiny is welcome, not scope creep

The tasks above are implementation. **These are places where my conclusions are thin, unverified, or
worth a fresh pair of eyes.** If something here turns out differently, that is a good outcome, not a
detour — say so and change the plan.

### High — someone should actually check these

**S1 · Answer keys predating this session.** I recomputed every key I touched, and the whole Ratios
module. I did **not** systematically recompute the pre-existing Number System and Expressions keys.
The 2026-07-04 log claims it was done then, but that predates two new modules and ~50 new items.
Worth a full independent recomputation pass across all five modules — script it, do not eyeball.

**S2 · Roughly 50 items were authored or lifted in one day, by one pass, unreviewed.** The guards
catch structure, not whether an item *teaches well* or a distractor is subtly wrong. A slow read of
the new content — especially Geometry and Statistics, which were built fastest — is the highest-value
scrutiny available.

**S3 · Is the APS curriculum document authoritative?** `Curriculum/Grade 7 Mathematics Curriculum
(2025-2026).md` is titled "Comprehensive Research Report on the Atlanta Public Schools…". It reads
like a report *about* a curriculum rather than a district document. I leaned on it for sequencing and
emphases. Before leaning further, confirm what it actually is and who wrote it. The CCSS text in
`Math_Standards.pdf` is unambiguous and should outrank it wherever they differ.

**S4 · Accessibility beyond the plot format.** I shipped the plot click-only this morning and fixed it
the same day (focusable, arrow keys, `role="slider"`, `aria-valuenow`, guarded). That it happened at
all says the engine has **no standing a11y guard**. Nothing checks colour contrast, focus order, that
every interactive control is reachable, or that SVG figures carry meaningful labels. Worth an audit
and a guard of its own — the MC options, tiles and modals have never been tested for this either.

### Medium — probably worth doing, evidence is thin

**S5 · The motivation decision (D3) rests on one ledger entry.** "She could not get her homework" is
the whole evidential basis for calling this an access problem rather than a motivation one. The June
and July class summaries in `../Fareedah/Class Summaries/` have **never been read into the ledger**.
Read them before building T3. If they show her skipping work she *could* reach, D3 is wrong.

**S6 · Grade 8 has never had a standards-coverage audit.** I ported guards to it and it passes them,
but nobody has built the equivalent of `STANDARDS_COVERAGE_MATRIX.md` for Grade 8. Given what that
exercise turned up here — a domain with zero worked examples, a standard taught backwards — assume
Grade 8 has its own version of that until checked.

**S7 · Textbooks never opened.** `Spectrum Grade 7`, `Glencoe Georgia Math`, the Rising/Accelerated
summer packets, and — most importantly — **IM Units 7–9 Teacher Guide** (906 KB), which the original
backlog called "the richest single source". enVision was opened but its OCR was garbled on the pages
that mattered; it was never re-attempted by rendering, which is now the known-good method.

**S8 · The three "soon" Science topics.** Still scaffolded in `SUBJECTS`. Nobody has said whether
Science is actually wanted. If not, removing them is cleaner than leaving permanent "coming soon"
tiles a student keeps seeing.

### Low — noted so it is not rediscovered

**S9 · `homework_backend.test.js` runs only in Grade 8.** Correct per D5, but it means a Grade 7-only
session gets a green board while the backend half is untested locally. Consider a thin Grade 7 test
that simply asserts the Grade 8 file exists and is newer than the last known-good hash — or accept it
and rely on §6.1.

**S10 · Two `*.v*bak` generations now exist** (`v4`–`v7`). They are gitignored and harmless, but if
one is ever used to "restore", check which engine generation it holds — several predate the retention
layer entirely.

## 3 · Traps found the hard way

Each of these cost real time or shipped a real defect. They are not hypothetical.

1. **A folder name is not provenance.** Three files in `MCAP RELEASES PER TOPIC/` are New York State
   releases. The guard would have passed a citation naming them, because it checks that a claim *has*
   a source, not that the source says what you think.
2. **Three false MCAP labels, each found by a different method** — reading what I had just written (19),
   a duplicate-citation warning (`ex-2a`), and counting items in a packet against rows citing it
   (`4-3`). None of those methods would have caught the others. **Count sources against claims whenever
   you work through a packet.**
3. **A coverage guard creates pressure to manufacture what it counts.** `exam_coverage` requires an exam
   item per skill; the cheapest way to satisfy it is to copy the format — label included — of the real
   capstone next door. Close gaps with sourced or honestly-labelled items. Never by relabelling.
4. **`</div></div>` is not a card boundary.** It also closes an `mc-feedback` block, so a slice from a
   card's start terminates early on any card whose first step is multiple choice. Use the *next card's
   start* as the boundary. This corrupted two edits before I caught it.
5. **Appending a card to a section breaks the climb.** It put a Guided card after three Practice ones
   more than once. `module_integrity` now enforces non-decreasing phase rank per section.
6. **`svg.viewBox.baseVal` is not universally implemented** (jsdom has none). Parse the `viewBox`
   attribute instead.
7. **A test that reads a missing file can pass vacuously.** Every guard here fails loudly on zero
   parsed items. Keep that property when you extend one.
8. **Mutation-check every guard you write.** Two of mine were wrong when first written — a regex that
   let a trailing period hide an answer leak, and a manifest parser that read the wrong table. Both
   looked fine and passed.
9. **A new input format is an accessibility surface.** The plot shipped click-only and locked keyboard
   and screen-reader users out of six items, one of them a real MCAP capstone — fixed the same day, but only
   because someone thought to ask. There is no standing a11y guard (S4); assume the next new control has the
   same hole unless it is tested.
10. **jsdom reports a zero-size rect for everything.** The plot engine falls back to viewBox units when
   the measured width is 0, which is what makes it testable.

---

## 4 · Invariants — never break these

- **A due revisit must never show its own answers.** `restoreProgress()` re-fills completed work by
  design; review mode must keep clearing it. This is the whole reason the retention layer exists.
- **The mastery bar never moves backwards**, and nothing unstarted is ever surfaced as "due".
- **Hints are strategy-only, and exam capstones carry none.** A hint must never contain its own step's
  answer — guarded, and it caught a live one (`8-4`: *"…= -20.25 → Cyra"* against the key `cyra`).
- **The MCAP label is a claim of fact** (§2.9). Only real released items, only with a citation.
- **Never hand-roll the answer-checking handlers** (§7.2). The plot format is a pointer over a hidden
  `.ans-input` precisely so every integrity invariant still applies. Keep it that way.
- **Never write an assessment of a student into a file the student can read.** `Fareedah/` is outside
  this repo and gitignored; keep it that way.
- **Publish only** the app + docs. No PDFs, no `Curriculum/`, no release packets, no student data.
