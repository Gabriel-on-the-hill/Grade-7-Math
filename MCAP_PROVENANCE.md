# MCAP item provenance

**Rule: an item may carry the MCAP label only if it is a real released MCAP item, and only if it is
listed here with its citation.** No exceptions, and "written in the MCAP style" is not one.

**Why this file exists.** On 20 Jul 2026 an assistant (me) authored 19 new capstones and titled them
`MCAP ·` / `MCAP item ·` because that was the existing title convention for capstones in these
modules. They were written in MCAP's *shape* but were not MCAP items. That is a false label on
material a student sits down to practise with, and it also borrows credibility from the genuinely
sourced items around them. All 19 were relabelled `Exam-style ·` the same day, and this manifest
plus `tests/mcap_provenance.test.js` now make the claim mechanically checkable.

**The pressure that caused it, so it can be watched for.** `exam_coverage.test.js` counts whether
every skill has an exam-grade item. A guard that rewards *having* a capstone creates pressure to
manufacture one, and the fastest way to manufacture one is to copy the format — label included — of
the real capstone next to it. Any future push to "close the coverage guard" carries the same
pressure. Close it with sourced items or with honestly-labelled ones; never by relabelling.

## Not MCAP, despite the folder name

`MCAP RELEASES PER TOPIC/` contains **three files that are not MCAP at all**:

| File | Actually is |
|---|---|
| `2023-released-items-math-g7.pdf` | New York State Testing Program, Grade 7 Mathematics |
| `2024-released-items-math-g7.pdf` | New York State Testing Program, Grade 7 Mathematics |
| `2025-released-items-math-g7.pdf` | New York State Testing Program, Grade 7 Mathematics |

108 pages of NYSED released questions filed under a folder named for Maryland's programme. They are
good CCSS-aligned practice and **may be used** — but they are **never** to be cited as MCAP. Label
lifted items `NYSED ·` (with a row in "Other released items" below) or `Exam-style ·`.

**Why this warning is here.** On 20 Jul 2026 the planned next step was "sweep the 2023 and 2025
releases for MCAP items". That would have produced New York items cited as Maryland ones, and
`tests/mcap_provenance.test.js` would have **passed** them — the guard checks that a claim carries a
citation, not that the citation says what the author believed. A folder name is not provenance.

**The genuine MCAP supply is finite — but the richest part of it is still unused.** The MSDE per-domain packets
together are the 2024 release. The **Reasoning packet holds 6 items and the Modeling packet 5**, of which only four are
in use (Q17, Q24, Q26, and Q13 via Expressions). The remaining seven are real Type 2 / Type 3 material — exactly what
DC CAPE weights at 42% of its points, and a far better source for reasoning and modelling capstones than authoring
our own:

| Packet | Citation | Standards | Fits |
|---|---|---|---|
| Reasoning | 2024 Q15 | 7.R.2d, 7.NS.A.2d | Number System (decimals) — **drop-down item, check it renders before use** |
| Reasoning | 2024 Q25 | 7.R.3a, 7.EE.A.1 | ~~Expressions~~ — **done**, live as `2-6` |
| Reasoning | 2024 Q31 | 7.R.1c, 7.RP.A.3-1 | Ratios |
| Reasoning | 2024 Q33 | 7.R.3b, 7.EE.B.4a-2 | Expressions — **drop-down item** (pick the step); would render as MC, so it is *adapted*, not liftable as MCAP |
| ~~Modeling~~ | ~~2024 Q16~~ | 7.M.3, 7.EE.B.4a | **DONE** — it was already live as Expressions `4-3` (see the correction note below); restored to the MCAP label 21 Jul |
| ~~Modeling~~ | ~~2024 Q18~~ | 7.M.3, 7.G.B.6 | **DONE** — live as Geometry `7-4` (ceramic-tile count; figure-free, single-select) |
| Modeling | 2024 Q23 | 7.M.1, 7.RP.A.3-2, 7.G.B.6 | ~~Ratios or Geometry~~ — **blocked**, figure not reproducible (see above) |
| Modeling | 2024 Q30 | 7.M.4, 7.EE.B.3, 7.G.B.4-1 | Expressions or Geometry |


## Verified items

Every row below was checked on 20 Jul 2026 against the extracted text of the named packet in
`MCAP RELEASES PER TOPIC/`. Citations are as MSDE prints them.

| File | qid | Packet | Citation | Standard |
|---|---|---|---|---|
| `Number_System_Connections.html` | `ex-2b` | `…Math 7 The Number System` | Math 7 2024 Release, Q11 | 7.NS.A.1b-1 |
| `Number_System_Connections.html` | `ex-5a` | `…Math 7 The Number System` | Math 7 2024 Release, Q2 | 7.NS.A.3 |
| `Number_System_Connections.html` | `ex-6a` | `…Math 7 The Number System` | Math 7 2024 Release, Q7 | 7.NS.A.2c |
| `Number_System_Connections.html` | `ex-7a` | `…Math 7 The Number System` | Math 7 2024 Release, Q9 | 7.NS.A.1c-2 |
| `Ratios_Proportional_Relationships.html` | `r3-1` | `…Math 7 Ratios and Proportional Relationships` | Math 7 2024 Release, Q10 | 7.RP.A.2b |
| `Ratios_Proportional_Relationships.html` | `r6-ex` | `…Math 7 Expressions and Equations` | Math 7 2024 Release, Q3 | 7.EE.A.2 |
| `Ratios_Proportional_Relationships.html` | `r7-ex` | `…Math 7 Reasoning` | Math 7 2024 Release, Q17 | 7.R.1a, 7.RP.A.1, 7.RP.A.2b |
| `Expressions_Equations_Inequalities.html` | `2-4` | `…Math 7 Expressions and Equations` | Math 7 2024 Release, Q8 | 7.EE.A.1 |
| `Expressions_Equations_Inequalities.html` | `2-6` | `…Math 7 Reasoning` | Math 7 2024 Release, Q25 | 7.R.3a, 7.EE.A.1 |
| `Expressions_Equations_Inequalities.html` | `3-3` | `…Math 7 Expressions and Equations` | Math 7 2024 Release, Q3 | 7.EE.A.2 |
| `Expressions_Equations_Inequalities.html` | `5-5` | `…Math 7 Expressions and Equations` | Math 7 2024 Release, Q5 | 7.EE.B.4a-1 |
| `Expressions_Equations_Inequalities.html` | `6-4` | `…Math 7 Expressions and Equations` | Math 7 2024 Release, Q12 | 7.EE.B.4b |
| `Expressions_Equations_Inequalities.html` | `6-5` | `…Math 7 Modeling` | Math 7 2024 Release, Q26 | 7.M.4, 7.EE.B.4b |
| `Expressions_Equations_Inequalities.html` | `7-1` | `…Math 7 Expressions and Equations` | Math 7 2024 Release, Q13 | 7.EE.B.3 |
| `Expressions_Equations_Inequalities.html` | `4-3` | `…Math 7 Modeling` | Math 7 2024 Release, Q16 | 7.M.3, 7.EE.B.4a-1, 7.EE.B.4a-2 |
| `Geometry_Connections.html` | `3-4` | `…Math 7 Geometry` | Math 7 2024 Release, Q20 | 7.G.A.3 |
| `Geometry_Connections.html` | `6-4` | `…Math 7 Geometry` | Math 7 2024 Release, Q28 | 7.G.B.6 |
| `Geometry_Connections.html` | `7-4` | `…Math 7 Modeling` | Math 7 2024 Release, Q18 | 7.M.3, 7.G.B.6 |
| `Ratios_Proportional_Relationships.html` | `r1-4` | `…Math 7 Ratios and Proportional Relationships` | Math 7 2024 Release, Q14 | 7.RP.A.1 |
| `Ratios_Proportional_Relationships.html` | `r3-6` | `…Math 7 Ratios and Proportional Relationships` | Math 7 2024 Release, Q4 | 7.RP.A.2d |
| `Ratios_Proportional_Relationships.html` | `r3-7` | `…Math 7 Ratios and Proportional Relationships` | Math 7 2024 Release, Q1 | 7.RP.A.2b |
| `Ratios_Proportional_Relationships.html` | `r8-5` | `…Math 7 Reasoning` | Math 7 2024 Release, Q24 | 7.R.2e, 7.NS.A.3 |
| `Statistics_and_Probability.html` | `1-3` | `…Math 7 Statistics and Probability` | Math 7 2024 Release, Q34 | 7.SP.A.2 |
| `Statistics_and_Probability.html` | `3-4` | `…Math 7 Statistics and Probability` | Math 7 2024 Release, Q19 | 7.SP.C.5 |

`r6-ex` and `3-3` are the same released item (the 15% tip select-all) used in two modules — that is
deliberate: it assesses 7.EE.A.2 and sits naturally in both percent contexts.

## Data reused from a released item

Distinct from the table above. Here the **item is ours** and honestly labelled `Exam-style ·`; only the *data* comes
from a released question. The distinction matters: a student is never told they are attempting an MCAP question.

| File | qid | Data source | Why the item was not lifted whole |
|---|---|---|---|
| `Statistics_and_Probability.html` | `2-4` | MCAP Math 7 2024 Release, Q27 (7.SP.B.3) — soccer/hockey shoe-size dot plots | Q27 is a drop-down item and the public release renders its menus collapsed as "Choose ...", so the answer options do not exist anywhere in the packet. The dot plots read cleanly at 400 dpi, so the data is reproducible even though the item is not. |

## Adapted from a released item — NOT the item itself

A third category, and the easiest one to get wrong. Here the released item was **changed** — different
numbers, or a different response format — so it is no longer that item and must not carry its name.
These are labelled `Exam-style ·`.

| File | qid | Adapted from | What changed, and why |
|---|---|---|---|
| `Number_System_Connections.html` | `ex-2a` | MCAP 2024 Release, Q11 (7.NS.A.1b-1) | Q11 puts point `k` at `-5` and asks the student to **plot** `k + 4`. This card puts `k` at `-6` and asks them to **type** the value. Almost certainly because the engine had no plot input until 20 Jul 2026 — the task was converted to fit the tool. Both numbers and task changed, so it is not Q11. The faithful reproduction is now `ex-2b`. |

**A correction lived here until 21 Jul 2026.** `4-3` (battery packs) was demoted to `Exam-style` on 20 Jul
with the note *"no packet contains it — searching all eleven for 'battery' returns nothing."* **That search
was wrong.** `4-3` is **MCAP Modeling Q16** (7.M.3, 7.EE.B.4a) — same numbers ($10 / $5 / $18 / $108, equal
AA and AAA counts), same select-all task. The 17 Jul build was right to call it a real capstone; the 20 Jul
demotion rested on a failed text match (the Modeling packet spells it "batteries", and the item never reached
the searched text). On 21 Jul the page was rendered, all six options read off (A `15x=90` ✓, B `23x=98`,
C `33x=108`, D `10+(5+18)x=108`, E `(10+5)x+18=108` ✓, F `(10+5+18)x=108`), the one missing distractor
(`23x=98`) added so the option set matches Q16 exactly, and the **MCAP label restored** with the citation now
in *Verified items* above.

**The lesson (a new trap).** A negative text search is not proof of absence. `pdftotext` had already been shown
to drop figures and collapse drop-downs; here it simply did not surface a phrase that is plainly on the rendered
page. **Before demoting a "not in any packet" item, render the candidate packet pages and look** — the same rule
that governs lifting an item governs un-lifting one. Counting sources against claims (below) stays valuable, but
it cannot tell a *missing* source from an *unfound* one.

## Rows carrying a caveat

**None — closed 20 Jul 2026.** All five rows that previously had packet-only attribution were checked against the
rendered packets and resolved: `2-4` = Q8, `6-4` = Q12, `7-1` = Q13 (it was in the Expressions packet, not Modeling),
`6-5` = Modeling Q26 (7.M.4). The fifth, `4-3`, was demoted as "not a released item" — **but that was itself an error,
corrected 21 Jul: `4-3` is MCAP Modeling Q16** and has been restored (see the correction under "Adapted", above).

**Worth noting how the arithmetic exposed it.** The Expressions packet holds five items; seven manifest rows cited it.
Counting sources against claims is a cheap check that catches what a per-row check cannot, and it is what surfaced
both `4-3` and the `6-5` packet error. Do it whenever a packet is worked through.

## Textbook lifts

Copying textbook questions and exposition into student-facing material is **preferred**, not a
fallback (`PROJECT_STANDARD` §11) — only the source PDFs stay unpublished. Recorded here for
attribution and so a future editor knows what is the book's and what is ours.

Textbook material carries **no exam label**, so a wrong attribution here cannot mislead a student
about what they are sitting. It is still recorded, because knowing a passage is IM's rather than
ours is what lets someone check it against the book.

| File | Where | Source |
|---|---|---|
| `Ratios_Proportional_Relationships.html` | §6 teach card — worked example, tape diagram, `500 + (0.2) × 500 = (1 + 0.2)500` | IM G7 Unit 4 Lesson 6 Summary, Student Ed. p. 39 |
| `Ratios_Proportional_Relationships.html` | `r6-6` — both "agree or disagree" statements, verbatim | IM G7 Unit 4 Lesson 6, task 6.4, Student Ed. p. 38 |
| `Ratios_Proportional_Relationships.html` | `r6-2` — markup (car dealership) + reverse percent (pants), verbatim | IM G7 Unit 4 Lesson 11, Practice Problems 1 & 2, Student Ed. p. 72 |
| `Ratios_Proportional_Relationships.html` | `r6-3` — commission at 5½%, both parts, verbatim | IM G7 Unit 4 Lesson 11, Practice Problem 3, Student Ed. p. 72 |
| `Ratios_Proportional_Relationships.html` | `r6-7` — sales tax as a decimal multiplier, select-all, verbatim | IM G7 Unit 4 Lesson 10, Practice Problem 2, Student Ed. p. 67 |
| `Number_System_Connections.html` | §4 teach card — `a − b = a + (−b)` derived via `? + 5 = 3` | IM G7 Unit 5 Lesson 5 Summary |
| `Number_System_Connections.html` | §6 teach card — distributive derivation of the sign rule | IM G7 Unit 5, multiplying rational numbers |
| `Expressions_Equations_Inequalities.html` | `7-4` — towel bar on a door | CCSS 7.EE.3, the standard's own worked example |
| `Expressions_Equations_Inequalities.html` | `6-5` context | CCSS 7.EE.4b, the standard's own salesperson example |

**Still paraphrased, and should be replaced with the book's own exercises on the next pass:**
`r6-4` (percent increase/decrease) and several Number System practice items. IM Unit 4 Lesson 12 and Unit 5
carry equivalents. Not wrong, but needlessly ours.

**Deliberately not lifted.** IM Unit 4 Lesson 14 PP6 (tape diagrams: decide whether `y` is an increase or a
decrease of `x`) is a good item, but the number of boxes in each diagram could not be read off the render with
certainty. Guessing them would invent the figure. Re-render at higher dpi before using it.

## Known-good items not yet used

Real released items identified on 20 Jul 2026 and reproducible from text, available for future
capstones:

| Packet | Citation | Standard | Item |
|---|---|---|---|
| Ratios | 2024 Release, Q29 | 7.RP.A.1 | Jackson, ⅛ of a patio in ⅖ hour → fraction per hour |
| Ratios | 2024 Release, Q35 | 7.RP.A.3-1 | waxing 1/40 of a 2,000 ft² floor every ½ hour → ft²/hour |
| Ratios | 2024 Release, Q6 | 7.RP.A.2c | proportional graph through (10, 5) → which equation |
| Statistics | 2024 Release, Q19 | 7.SP.C.5 | 12-section spinner, classify three events by likelihood — **read and verified, ready to install** |
| Statistics | 2024 Release, Q34 | 7.SP.A.2 | 25,000 cans, sample of 50, 2 underweight → best estimate |

**Figure-dependent — render the page, never reproduce from the text stub.** `pdftotext` drops figures, and the
remaining text reads like a whole question when it is not. Rebuilding from the stub invents the figure while still
claiming MCAP — the same failure this file exists to prevent.

**Correction (20 Jul 2026):** an earlier version of this file listed Geometry Q28 and Statistics Q19 as unusable for
this reason. That was wrong — it confused "the text extraction is insufficient" with "the item cannot be used." Both
pages were rendered at 125 dpi with `pymupdf`, read, and reproduced faithfully; Q28 is now live as `Geometry 6-4`.
The lesson is the general one: **when extraction fails, render the page — do not fall back to writing your own.**

**Modeling Q23 — rendered at 380 dpi, and not reproducible.** The stem is clean (a tank, every measurement
increased by 25%, asking the percentage increase in water and the days to drink it — both answerable from the scale
factor alone: `1.25³ = 1.953125`, so a **95.3125%** increase and `4 × 1.953125 = 7.8125` days). But the figure is a
**composite solid, not a box**: the top face has a step cut into it, which is why five edge labels do not resolve to
three dimensions, and why the citation carries 7.G.B.6. The notch depth cannot be determined from the single view in
the release, so the solid cannot be redrawn faithfully, and the stem says "with dimensions shown". Reproducing it
would invent geometry. **Do not re-attempt from the PDF** — it needs the original figure or an MSDE source that
states the dimensions in text.

**Statistics Q27 — rendered, and still unusable, for a different reason.** The dot plots read cleanly at 400 dpi
(soccer 8, 9, 10x3, 11x2, 13x2, 15; hockey 7, 9, 10x2, 12x4, 13x2 — both mean 11, both MAD 1.6, medians 10.5 and 12).
But the item is a **drop-down** item and the public release renders the menus collapsed as "Choose ...", so the answer
options are not visible anywhere in the packet. Reproducing it would mean inventing the choices. The *data* is fair to
reuse in an honestly-labelled `Exam-style` item; the *item* is not reproducible. Recorded so nobody re-renders it
hoping for a different result.

**Number System Q11 is now live** as `ex-2b`: the page was rendered, point `k` read off at `-5`, and the item is
answered with the new click-to-plot format (added to the engine 20 Jul). **Ratios Q4 is now live** as `r3-6` — the graph was rendered at 400 dpi and rebuilt from it (line through the origin; P(0.25, 1), Q(1, 4), R(2, 8), S(3, 12)). **Ratios Q1 is now live too** as `r3-7` (21 Jul 2026): the packet page was rendered and each of the four option graphs read off gridline-by-gridline and rebuilt as inline SVG — **A** `y = ½x` through (2,1),(4,2),(6,3) is the key; the distractors are **B** `k = 2`, **C** `k = ⅓`, **D** `k = 3` (B and D are the reciprocal trap). Single-select mc-group, exactly one correct, exam-flagged; the four graphs shuffle per load so position carries no signal.
