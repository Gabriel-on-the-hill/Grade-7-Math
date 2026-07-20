# Grade 7 — standards coverage matrix

**What this is.** Every Grade 7 mathematics requirement, checked one at a time against what the
modules actually ask a student to *do*. Built 20 Jul 2026 by reading the standard text and the module
markup — not from impression, and not from question counts.

**Status 20 Jul 2026 (end of the repair pass): all five domains are built, and every requirement
below is met.** 163 items, 52 exam-grade (32%), 33 skills, every skill carrying at least one
machine-scored exam item. Build log in `PROJECT_STANDARD.md` §10.

**Why it exists.** [MODULE_REPAIR_BACKLOG.md](MODULE_REPAIR_BACKLOG.md) measured *exam weight vs.
effort*. That is a different question from *does the curriculum get covered*, and a module can pass
one and fail the other. This file is the second question, and it is the checklist the repair work is
being driven from.

## Sources of requirement (all in this folder)

| Document | Standing |
|---|---|
| `Math_Standards.pdf` — CCSS Grade 7, verbatim | **The requirement.** Quoted below. |
| `Curriculum/Grade 7 Mathematics Curriculum (2025-2026).md` — APS/Georgia MGSE | Unit sequencing + emphases. Georgia-coded, CCSS-identical in content. |
| `Grade_7_MCAP_Public_Blueprint-A.pdf` | Domain weighting (23 content items). |
| `<student>/DC CAPE Math Sp24 …blueprint.pdf` via [CAPE_vs_MCAP…](CAPE_vs_MCAP_Grade7_Blueprint_Comparison.md) | **The exam actually sat.** Task-type shapes + point values. |

**One divergence worth naming:** the curriculum document in this folder is **Atlanta Public Schools
(Georgia, MGSE)**, the blueprint used for weighting is **Maryland MCAP**, and the exam actually sat is
**DC CAPE**. All three assess identical CCSS Grade 7 domains, so this is safe for *content* — but read
sequencing advice from APS and weighting from MCAP, and shape capstones for CAPE.

**The APS sequence splits 7.RP in two**, which this hub does not: Number System (Aug) → **RP Part 1**
(7.RP.1–2, Oct) → Expressions (Nov–Dec) → **RP Part 2** (7.RP.3 financial percents, Jan) → Geometry
(Feb–Mar) → Statistics (Apr–May). The percent-application work is deliberately placed *after* the
algebra, because `p − 0.20p = 0.80p` is the tool that makes it tractable. Our single Ratios module
puts it before. See "Sequencing" at the bottom.

Legend: ✅ covered · ◐ partial · ❌ absent

---

## 7.RP — Ratios & Proportional Relationships · *8 of 23 MCAP content items — the heaviest domain*

| Std | What the standard requires | Status | Evidence / gap |
|---|---|---|---|
| 7.RP.1 | Unit rates with **ratios of fractions**, lengths/areas, **like or different units** | ✅ | `r1-1` (words/min, $/apple), `r1-2` (3/4 mi in 1/2 hr) |
| 7.RP.2a | Decide whether proportional — equivalent ratios in a table, or a straight line through the origin | ✅ | `r2-2` table; graph worked example |
| 7.RP.2b | Constant of proportionality in tables, graphs, equations, **diagrams, and verbal descriptions** | ✅ | tables `r2-1`, graphs `r3-1`, equations `r8-2`, verbal `r3-4`, tape diagram in the §6 teach card |
| 7.RP.2c | Represent proportional relationships **by equations** (`t = pn`) | ✅ | `r8-2`, `y = kx` teach card |
| 7.RP.2d | Explain what a point `(x, y)` means **in context**, special attention to `(0,0)` and `(1, r)` | ✅ | `r3-3` asks both, in context |
| 7.RP.3 | Multistep ratio & percent: simple interest, tax, **markups and markdowns**, **gratuities and commissions**, **fees**, **percent increase and decrease**, **percent error** | ✅ | all of them — `r6-1` tip/discount/interest, `r6-7` tax (IM), `r6-2` markup + reverse markdown (IM), `r6-3` commission (IM), `r6-4` increase/decrease, `r6-5` percent error, `r6-6` misconceptions (IM) |

## 7.NS — The Number System · *4 of 23 items · 42 questions, the largest module*

| Std | What the standard requires | Status | Evidence / gap |
|---|---|---|---|
| 7.NS.1 | Represent addition/subtraction on a **horizontal or vertical** number line | ✅ | horizontal SVGs in §2, and a vertical elevation line in `2-5` — satisfies the APS "both" reading too |
| 7.NS.1a | Situations where **opposite quantities combine to make 0** | ✅ | `8-5` pelican `60 + (-60)`; teach card |
| 7.NS.1b | `p + q` as the number **a distance \|q\| from p**; additive inverses sum to 0; interpret sums in real-world contexts | ✅ | the §2 worked example states and works the "distance \|q\| from p" framing directly |
| 7.NS.1c | Subtraction as **adding the additive inverse**, `p − q = p + (−q)`; distance = `\|a − b\|` | ✅ | teach card; `2-2`, `4-1` |
| 7.NS.1d | Apply **properties of operations** as strategies to add and subtract | ✅ | `4-3` (opposites cancel), plus the §4 worked example deriving `a − b = a + (−b)` (IM U5 L5) |
| 7.NS.2a | Multiplication extended to rationals **by requiring the properties of operations, particularly the distributive property**, leading to `(−1)(−1) = 1` and the sign rules; interpret products in context | ✅ | §6 worked example runs IM's derivation: distributing over `−5 × (3 + (−3)) = 0` forces `(−5)(−3) = 15`, and `(−1)(−1) = 1` |
| 7.NS.2b | Integers can be divided (divisor ≠ 0); `−(p/q) = (−p)/q = p/(−q)`; interpret quotients in context | ✅ | stated and worked in the §6 teach card, divisor-≠-0 included |
| 7.NS.2c | Properties of operations as strategies to **multiply and divide** | ✅ | `6-5` shortcut, `6-2` (IM U5 L9 PP3), and the §6 worked example |
| 7.NS.2d | Convert a rational number to a decimal **using long division**; know it terminates or repeats | ✅ | §3 worked example performs both divisions and watches the remainder; the factor shortcut is reframed as a prediction the division confirms |
| 7.NS.3 | Solve real-world problems with the four operations | ✅ | §7, §8 |

## 7.EE — Expressions, Equations & Inequalities · *5 of 23 items · healthiest module*

| Std | What the standard requires | Status | Evidence / gap |
|---|---|---|---|
| 7.EE.1 | Add, subtract, factor, expand linear expressions **with rational coefficients** | ✅ | `1-4` (`0.5x`, `−1.25x`), `2-5` (⅓ and 0.4 outside the bracket) |
| 7.EE.2 | Rewriting an expression reveals structure (`a + 0.05a = 1.05a`) | ✅ | §3 — well done |
| 7.EE.3 | Multi-step problems with rational numbers **in any form**; convert between forms; **assess the reasonableness of answers using mental computation and estimation** | ✅ | `7-1` multi-step; `7-4` estimate-then-compute, using the standard's own towel-bar example |
| 7.EE.4a | `px + q = r` and `p(x + q) = r` with **specific rational numbers**; solve fluently; **compare an algebraic to an arithmetic solution** | ✅ | `5-6` (`−3x + 7 = 1`, `⅔x − 4 = 10`), `5-7` (`1.5(x + 4) = 21`); compare via `5-4` |
| 7.EE.4b | Inequalities of the form **`px + q > r`** with rational p, q, r; **graph the solution set**; interpret in context | ✅ | `6-6` solves `3x + 5 > 20` and `−2x + 1 ≤ 9` (sign flip); graphing and interpretation already covered |

## 7.G — Geometry · *3 of 23 items* · ✅ **built** — `Geometry_Connections.html`, 28 items, 9 exam-grade

| Std | Requirement | Status | Evidence |
|---|---|---|---|
| 7.G.1 | Scale drawings: actual lengths and areas; reproduce at a different scale | ✅ | §1 `1-1`…`1-4`, including redraw-at-a-new-scale; areas scale by the square of the factor |
| 7.G.2 | Construct triangles from three measures; unique / more than one / none | ✅ | §2 `2-1`…`2-4`, triangle inequality and the AAA case |
| 7.G.3 | 2-D figures from slicing 3-D figures | ✅ | §3 prism, pyramid, cylinder; capstone is **real MCAP Q20** |
| 7.G.4 | Area and circumference of a circle; informal derivation of their relationship | ✅ | §4, including the wedge-rearrangement argument for `A = ½ × C × r` |
| 7.G.5 | Supplementary / complementary / vertical / adjacent angles → **write and solve equations** | ✅ | §5 `5-1`…`5-4`, every one as an equation |
| 7.G.6 | Area, volume, surface area of composite 2-D and 3-D objects | ✅ | §6; capstone is **real MCAP Q28** (L-shaped prism, figure rebuilt from the rendered page) |

## 7.SP — Statistics & Probability · *3 of 23 items* · ✅ **built** — `Statistics_and_Probability.html`, 20 items, 7 exam-grade

| Std | Requirement | Status | Evidence |
|---|---|---|---|
| 7.SP.1 | Samples represent populations; random sampling supports valid inference | ✅ | §1 teach card + `1-1` |
| 7.SP.2 | Use a random sample to draw inferences; gauge variation | ✅ | `1-2` scaling up; capstone is **real MCAP Q34** |
| 7.SP.3 | Visual overlap; difference of centres as a multiple of a variability measure | ✅ | `2-4`, using the dot-plot data from released Q27 |
| 7.SP.4 | Measures of centre and variability to compare two populations | ✅ | `2-1`…`2-3`: median, mean, **MAD** |
| 7.SP.5 | Probability as a number 0–1; likelihood language | ✅ | §3; capstone is **real MCAP Q19** (12-section spinner) |
| 7.SP.6 | Approximate probability from data; predict relative frequency | ✅ | §4 `4-1`, `4-2`, `4-4` |
| 7.SP.7 | Develop a probability model; compare it to observed frequencies | ✅ | `4-3` — is the model wrong, or is that ordinary variation? |
| 7.SP.8 | Compound events: sample space via tables or trees | ✅ | §5 `5-1`…`5-3` |

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
