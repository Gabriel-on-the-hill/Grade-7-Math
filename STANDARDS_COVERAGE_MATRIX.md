# Grade 7 — standards coverage matrix

**What this is.** Every Grade 7 mathematics requirement, checked one at a time against what the
modules actually ask a student to *do*. Built 20 Jul 2026 by reading the standard text and the module
markup — not from impression, and not from question counts.

**Status 20 Jul 2026 (end of the repair pass): all five domains are built, and every requirement
below is met.** 163 items, 52 exam-grade (32%), 33 skills, every skill carrying at least one
machine-scored exam item. Build log in `PROJECT_STANDARD.md` §10.

**Status 21 Jul 2026 — dual-coded to MCCRS 2025, and every requirement is met in both codings.**
Measured directly from the markup: **176 items, 59 exam-grade (34%), 33 skills** across the five
modules. (Earlier counts in this file were taken by a different method; this one counts every
`data-qid` card and every `data-exam="1"`.)

Three things changed this session, all recorded below:

- **`7.SP.3` was ✅ on paper only.** `2-4` computed both medians and the MAD and stopped — every
  ingredient of the standard, never the inference. Fixed by adding Steps 4–5.
- **`7.AT.C.7`, a brand-new 2025 standard with no 2010 predecessor, was uncovered.** Closed the same
  day by Expressions `6-8`.
- **Three clusters (`7.G.A.2`, `7.G.B.5`, `7.SP.C.8`) move to Math 8 under MCCRS** and are
  **deliberately retained** — Grade 8 has no Geometry or Statistics module to receive them.

**Update 21 Jul 2026:** two real released items lifted — Ratios `r3-7` (MCAP Q1, four-graph select)
and Geometry `7-4` (MCAP Q18, ceramic-tile count) — and Expressions `4-3` restored to the MCAP label
(it is Modeling Q16; the 20 Jul demotion was a search error). Now **165 items, 54 exam-grade**, 33
skills. Also fixed: three "select all" items (Geometry `2-2`/`3-4`, Ratios `r6-7`) were single-select
`mc-group`s that graded on one click — converted to `ms-group` and guarded.

**Why it exists.** [MODULE_REPAIR_BACKLOG.md](MODULE_REPAIR_BACKLOG.md) measured *exam weight vs.
effort*. That is a different question from *does the curriculum get covered*, and a module can pass
one and fail the other. This file is the second question, and it is the checklist the repair work is
being driven from.

## Sources of requirement (all in this folder)

| Document | Standing |
|---|---|
| `Math_Standards.pdf` — CCSS Grade 7, verbatim | **The requirement.** Quoted below. |
| `Curriculum/grade-7-mccrs-math-crosswalk-a.pdf` — MSDE, adopted Jul 2025 | **Official Maryland.** 2010 → 2025 standards mapping. See the transition note below. |
| `Curriculum/grade-7-mccrs-math-standards-companion-guide-a.pdf` — MSDE, v1 Dec 2025 | **Official Maryland.** Unpacked standards, 45 pp. |
| `Grade_7_MCAP_Public_Blueprint-A.pdf` | Domain weighting (23 content items). |
| `<student>/DC CAPE Math Sp24 …blueprint.pdf` via [CAPE_vs_MCAP…](CAPE_vs_MCAP_Grade7_Blueprint_Comparison.md) | **The exam actually sat.** Task-type shapes + point values. |
| `Curriculum/Grade 7 Mathematics Curriculum (2025-2026).md` | ⚠️ **Demoted 21 Jul 2026 — corroborate before use.** See below. |

### The APS curriculum document is not a district document (S3, answered 21 Jul 2026)

It is titled *"Comprehensive Research Report on the Atlanta Public Schools Grade 7 Mathematics
Curriculum"* and it is exactly that — a **report about** a curriculum, not a curriculum. It carries
**no author, no references, no URLs and no retrieval dates**; its prose is uniformly superlative
("unparalleled … juncture", "Epistemological Shift", "definitive linchpin"); and it states checkable
facts with nothing behind them ("input from over 14,000 Georgians", a 20-point APS 2030 proficiency
goal). Provenance is unverifiable, so **it cannot settle a question on its own.** Its sequencing
observation still looks sound and is still worth *considering* — but it is a hypothesis to
corroborate, not a source to cite, and it describes **Georgia**, which is not what this hub is
assessed against.

**The authoritative document was in the same folder the whole time.** MCAP is Maryland, and
`Curriculum/` holds the official **MSDE MCCRS** crosswalk and companion guide. Prefer them over the
APS report wherever the two differ; prefer `Math_Standards.pdf` over both for the CCSS text itself.

### ⚠️ Maryland renumbers Grade 7 from SY 2026-2027 — a live decision, not a defect

The MSDE crosswalk is stamped **"Adopted: July 2025; Implementation: SY 2026-2027"** — the school
year starting weeks from now. Grade 7's **five 2010 domains become four**:

| 2025 MCCRS | Previously |
|---|---|
| `7.NOS` Number and Operation Sense | `7.NS` The Number System — **plus `7.EE.B.3`**, which moves to `7.NOS.A.3` |
| `7.AT` Algebraic Thinking (A.1–C.9) | `7.RP` Ratios & Proportional Relationships — **and most of `7.EE`** |
| `7.GR` Geometric Reasoning (A.1–B.4) | `7.G` Geometry |
| `7.DS` Reasoning with Data, Statistics & Probability | `7.SP` Statistics & Probability |

**Expressions & Equations ceases to exist as a domain.** This hub is five modules mapped 1:1 onto the
five 2010 domains, and every code in this matrix, in `MCAP_PROVENANCE.md`, and in each module's
`G7_SKILLS` is 2010-coded.

**Done 21 Jul 2026:** every row in the five tables below now carries its **MCCRS 2025** code beside
its 2010 one, read out of the crosswalk tables directly. Module files, qids and `G7_SKILLS` are
untouched — they carry no standard codes, and **D1/§5 forbids renaming qids** (it orphans stored
student data). This is a labelling layer, never a rename.

Still genuinely unknown from the files here: *when the MCAP **assessment** adopts the 2025 standards*
(the crosswalk governs standards, not the blueprint — `Grade_7_MCAP_Public_Blueprint-A.pdf` is
2010-coded), and whether DC CAPE follows Maryland at all. Citations in `MCAP_PROVENANCE.md` stay
**2010-coded on purpose**: they record what MSDE printed on a released item, and rewriting a citation
to a code the source never used would falsify it.

### Three topics leave Grade 7 — and we are keeping all three

The crosswalk does not merely rename. Against `7.G.A.2`, `7.G.B.5` and `7.SP.C.8` it prints
**"Not applicable — In Math 8"**:

| 2010 | Topic | Where it goes | Ours |
|---|---|---|---|
| 7.G.A.2 | Construct triangles from three measures; unique / more than one / none | Math 8 | Geometry §2, 4 items |
| 7.G.B.5 | Supplementary / complementary / vertical / adjacent → write and solve equations | Math 8 | Geometry §5, 4 items |
| 7.SP.C.8 | Compound events; sample spaces via tables and tree diagrams | Math 8 | Statistics §5, 3 items |

**Decision: retain all eleven items, and mark them rather than remove them.** Three reasons, in
order. (1) **The exam actually sat is DC CAPE, not MCAP** — nothing here shows CAPE following
Maryland's 2025 boundary, and dropping content on an assumption about a different jurisdiction's
timetable is not a trade worth making. (2) Deleting eleven working items because a state moved a
boundary is *a standard quietly dropped* — the one move the house rules exist to prevent. (3) The
content is a prerequisite either way: angle equations feed straight into `7.AT.C.8`, which stays in
Grade 7. **Nothing is removed; the rows are flagged ⚠️ so retention reads as deliberate, not stale.**

**This is also an S6 input.** If these three move *into* Grade 8, the sister app should be gaining
them — check that when the Grade 8 coverage audit happens.

### One genuinely new standard — found, and closed the same day

| MCCRS 2025 | Requirement | Status | Evidence |
|---|---|---|---|
| **7.AT.C.7** | *"Analyze contextual situations to determine whether an equation or inequality best represents the relationship between quantities. **Justify the choice based on the context.**"* | ✅ | **No 2010 predecessor — genuinely new**, and initially uncovered: Expressions taught equations (§5) and inequalities (§6) thoroughly but never asked the student to **choose between them**. Closed 21 Jul 2026 by **`6-8`** (Expressions §6, `apply`, skill `write-eq`): one context and identical numbers under two wordings — *"how many can she buy"* → `18 + 4.5n ≤ 45`, then *"spends exactly all of it"* → `18 + 4.5n = 45` — so only the decision is under test, not the arithmetic. **Step 2 is the standard's "justify" clause**, machine-scored as a choice of reason. Step 4 solves it (`n = 6`). |

**One divergence worth naming:** the demoted curriculum document is **Atlanta Public Schools
(Georgia)**, the blueprint used for weighting is **Maryland MCAP**, and the exam actually sat is
**DC CAPE**. All three assess the same CCSS Grade 7 content, so this is safe for *content* — take
weighting from MCAP, shape capstones for CAPE, and treat the APS report's sequencing as a hypothesis
to corroborate rather than a source (see S3 above). Where any of them disagree with
`Math_Standards.pdf` or the MSDE MCCRS documents, those two win.

**The APS sequence splits 7.RP in two**, which this hub does not: Number System (Aug) → **RP Part 1**
(7.RP.1–2, Oct) → Expressions (Nov–Dec) → **RP Part 2** (7.RP.3 financial percents, Jan) → Geometry
(Feb–Mar) → Statistics (Apr–May). The percent-application work is deliberately placed *after* the
algebra, because `p − 0.20p = 0.80p` is the tool that makes it tractable. Our single Ratios module
puts it before. See "Sequencing" at the bottom.

Legend: ✅ covered · ◐ partial · ❌ absent

---

## 7.RP → **7.AT Algebraic Thinking** — Ratios & Proportional Relationships · *8 of 23 MCAP content items — the heaviest domain*

| Std (2010) | **MCCRS 2025** | What the standard requires | Status | Evidence / gap |
|---|---|---|---|---|
| 7.RP.1 | 7.AT.A.1 | Unit rates with **ratios of fractions**, lengths/areas, **like or different units** | ✅ | `r1-1` (words/min, $/apple), `r1-2` (3/4 mi in 1/2 hr) |
| 7.RP.2a | 7.AT.A.2 | Decide whether proportional — equivalent ratios in a table, or a straight line through the origin | ✅ | `r2-2` table; graph worked example |
| 7.RP.2b | 7.AT.A.2 | Constant of proportionality in tables, graphs, equations, **diagrams, and verbal descriptions** | ✅ | tables `r2-1`, graphs `r3-1`, equations `r8-2`, verbal `r3-4`, tape diagram in the §6 teach card, four-graph select `r3-7` (MCAP Q1) |
| 7.RP.2c | 7.AT.A.3 | Represent proportional relationships **by equations** (`t = pn`) | ✅ | `r8-2`, `y = kx` teach card |
| 7.RP.2d | 7.AT.A.3 | Explain what a point `(x, y)` means **in context**, special attention to `(0,0)` and `(1, r)` | ✅ | `r3-3` asks both, in context |
| 7.RP.3 | 7.AT.A.4 | Multistep ratio & percent: simple interest, tax, **markups and markdowns**, **gratuities and commissions**, **fees**, **percent increase and decrease**, **percent error** | ✅ | all of them — `r6-1` tip/discount/interest, `r6-7` tax (IM), `r6-2` markup + reverse markdown (IM), `r6-3` commission (IM), `r6-4` increase/decrease, `r6-5` percent error, `r6-6` misconceptions (IM) |

## 7.NS → **7.NOS Number & Operation Sense** — The Number System · *4 of 23 items · 42 questions, the largest module*

| Std (2010) | **MCCRS 2025** | What the standard requires | Status | Evidence / gap |
|---|---|---|---|---|
| 7.NS.1 | 7.NOS.A.1 | Represent addition/subtraction on a **horizontal or vertical** number line | ✅ | horizontal SVGs in §2, and a vertical elevation line in `2-5` — satisfies the APS "both" reading too |
| 7.NS.1a | 7.NOS.A.1 | Situations where **opposite quantities combine to make 0** | ✅ | `8-5` pelican `60 + (-60)`; teach card |
| 7.NS.1b | 7.NOS.A.1 | `p + q` as the number **a distance \|q\| from p**; additive inverses sum to 0; interpret sums in real-world contexts | ✅ | the §2 worked example states and works the "distance \|q\| from p" framing directly |
| 7.NS.1c | 7.NOS.A.1 | Subtraction as **adding the additive inverse**, `p − q = p + (−q)`; distance = `\|a − b\|` | ✅ | teach card; `2-2`, `4-1` |
| 7.NS.1d | 7.NOS.A.1 | Apply **properties of operations** as strategies to add and subtract | ✅ | `4-3` (opposites cancel), plus the §4 worked example deriving `a − b = a + (−b)` (IM U5 L5) |
| 7.NS.2a | 7.NOS.A.2 | Multiplication extended to rationals **by requiring the properties of operations, particularly the distributive property**, leading to `(−1)(−1) = 1` and the sign rules; interpret products in context | ✅ | §6 worked example runs IM's derivation: distributing over `−5 × (3 + (−3)) = 0` forces `(−5)(−3) = 15`, and `(−1)(−1) = 1` |
| 7.NS.2b | 7.NOS.A.2 | Integers can be divided (divisor ≠ 0); `−(p/q) = (−p)/q = p/(−q)`; interpret quotients in context | ✅ | stated and worked in the §6 teach card, divisor-≠-0 included |
| 7.NS.2c | 7.NOS.A.2 | Properties of operations as strategies to **multiply and divide** | ✅ | `6-5` shortcut, `6-2` (IM U5 L9 PP3), and the §6 worked example |
| 7.NS.2d | 7.NOS.A.2 | Convert a rational number to a decimal **using long division**; know it terminates or repeats | ✅ | §3 worked example performs both divisions and watches the remainder; the factor shortcut is reframed as a prediction the division confirms |
| 7.NS.3 | 7.NOS.A.2 | Solve real-world problems with the four operations | ✅ | §7, §8 |

## 7.EE → **dissolved: 7.AT.B/C + 7.NOS.A.3** — Expressions, Equations & Inequalities · *5 of 23 items · healthiest module*

| Std (2010) | **MCCRS 2025** | What the standard requires | Status | Evidence / gap |
|---|---|---|---|---|
| 7.EE.1 | 7.AT.B.5 | Add, subtract, factor, expand linear expressions **with rational coefficients** | ✅ | `1-4` (`0.5x`, `−1.25x`), `2-5` (⅓ and 0.4 outside the bracket) |
| 7.EE.2 | 7.AT.B.6 | Rewriting an expression reveals structure (`a + 0.05a = 1.05a`) | ✅ | §3 — well done |
| 7.EE.3 | **7.NOS.A.3** | Multi-step problems with rational numbers **in any form**; convert between forms; **assess the reasonableness of answers using mental computation and estimation** | ✅ | `7-1` multi-step; `7-4` estimate-then-compute, using the standard's own towel-bar example |
| 7.EE.4a | 7.AT.C.8 | `px + q = r` and `p(x + q) = r` with **specific rational numbers**; solve fluently; **compare an algebraic to an arithmetic solution** | ✅ | `5-6` (`−3x + 7 = 1`, `⅔x − 4 = 10`), `5-7` (`1.5(x + 4) = 21`); compare via `5-4` |
| 7.EE.4b | 7.AT.C.9 | Inequalities of the form **`px + q > r`** with rational p, q, r; **graph the solution set**; interpret in context | ✅ | `6-6` solves `3x + 5 > 20` and `−2x + 1 ≤ 9` (sign flip); graphing and interpretation already covered |

## 7.G → **7.GR Geometric Reasoning** — Geometry · *3 of 23 items* · ✅ **built** — `Geometry_Connections.html`, 28 items, 9 exam-grade

| Std (2010) | **MCCRS 2025** | Requirement | Status | Evidence |
|---|---|---|---|---|
| 7.G.1 | 7.GR.A.1 | Scale drawings: actual lengths and areas; reproduce at a different scale | ✅ | §1 `1-1`…`1-4`, including redraw-at-a-new-scale; areas scale by the square of the factor |
| 7.G.2 | ⚠️ **Math 8** | Construct triangles from three measures; unique / more than one / none | ✅ | §2 `2-1`…`2-4`, triangle inequality and the AAA case |
| 7.G.3 | 7.GR.A.2 | 2-D figures from slicing 3-D figures | ✅ | §3 prism, pyramid, cylinder; capstone is **real MCAP Q20** |
| 7.G.4 | 7.GR.B.3 | Area and circumference of a circle; informal derivation of their relationship | ✅ | §4, including the wedge-rearrangement argument for `A = ½ × C × r` |
| 7.G.5 | ⚠️ **Math 8** | Supplementary / complementary / vertical / adjacent angles → **write and solve equations** | ✅ | §5 `5-1`…`5-4`, every one as an equation |
| 7.G.6 | 7.GR.B.4 | Area, volume, surface area of composite 2-D and 3-D objects | ✅ | §6; capstone is **real MCAP Q28** (L-shaped prism, figure rebuilt from the rendered page); modelling capstone `7-4` is **real MCAP Q18** (ceramic-tile count, unit conversion) |

## 7.SP → **7.DS Reasoning with Data, Statistics & Probability** — Statistics & Probability · *3 of 23 items* · ✅ **built** — `Statistics_and_Probability.html`, 20 items, 7 exam-grade

| Std (2010) | **MCCRS 2025** | Requirement | Status | Evidence |
|---|---|---|---|---|
| 7.SP.1 | 7.DS.A.1 | Samples represent populations; random sampling supports valid inference | ✅ | §1 teach card + `1-1` |
| 7.SP.2 | 7.DS.A.2 | Use a random sample to draw inferences; gauge variation | ✅ | `1-2` scaling up; capstone is **real MCAP Q34** |
| 7.SP.3 | 7.DS.B.3 | Visual overlap; difference of centres as a multiple of a variability measure | ✅ | `2-4` — **fixed 21 Jul 2026 (S2)**: it computed both medians and the MAD as three separate numbers and stopped, so the standard's distinctive demand was never asked. Steps 4–5 added: express the gap between the centres as a multiple of the MAD (`1.5 ÷ 1.6 = 0.94`), then read what that says about overlap. Dot-plot data from released Q27 |
| 7.SP.4 | 7.DS.B.3 | Measures of centre and variability to compare two populations | ✅ | `2-1`…`2-3`: median, mean, **MAD** |
| 7.SP.5 | 7.DS.C.4 | Probability as a number 0–1; likelihood language | ✅ | §3; capstone is **real MCAP Q19** (12-section spinner) |
| 7.SP.6 | 7.DS.C.5 | Approximate probability from data; predict relative frequency | ✅ | §4 `4-1`, `4-2`, `4-4` |
| 7.SP.7 | 7.DS.C.6 | Develop a probability model; compare it to observed frequencies | ✅ | `4-3` — is the model wrong, or is that ordinary variation? |
| 7.SP.8 | ⚠️ **Math 8** | Compound events: sample space via tables or trees | ✅ | §5 `5-1`…`5-3` |

**Grade-level guard held (§2.8):** mean / median / range / MAD only — no grouped-frequency statistics.
`Probability_Lesson.html` has been **retired** (20 Jul 2026) — it sat on the pre-v1.4 engine, was never wired in,
and 7.SP is now served properly by a module stamped from the current `Module_Template.html`.

---

## Exam-shape requirement (DC CAPE, the exam actually sat)

CAPE is **31 items / 52 points**, and the shape differs from anything the modules currently author:

- **Type 1** concepts & procedures — 20 × 1-pt + **5 × 2-pt** = 30 pts
- **Type 2** reasoning — 2 × 3-pt + 1 × 4-pt = **10 pts**
- **Type 3** modeling — 2 × 3-pt + **1 × 6-pt** = **12 pts**

**42% of the exam is multi-point reasoning and modelling tasks.** Now addressed: every module carries a
**machine-scored `reasoning` capstone** (error analysis — the reasoning *is* the answer) and a
**multi-part `modeling` capstone** in the Type 3 shape (one situation, several dependent parts).
Constructed responses sit alongside them, but no strand depends on a CR to register readiness,
because a CR cannot be machine-scored into the figure.

---

## Sequencing

The APS curriculum runs **7.RP.3 (financial percents) after Expressions**, so students meet
`p − 0.20p = 0.80p` before markup, commission and percent change. Our Ratios module holds all of
7.RP and sits before Expressions in the hub order.

**Resolved 20 Jul 2026 — by a pointer, not a restructure.** Splitting Ratios into Part 1 / Part 2
would mean renaming qids, which §5 forbids because it orphans stored student data. Instead §6 now
opens with an explicit prerequisite note pointing at Expressions §3, and the §6 worked example ties
the percent-increase identity back to the same rewriting move. That satisfies "no advanced concept
before its prerequisite" without touching anything a student has already done.

The hub lets a student open any available topic, so unit order is guidance rather than a gate; the
note is where the guidance belongs.
