# Grade 7 — module repair backlog

**Status: findings only. Nothing here has been fixed yet.**
Written 18 Jul 2026 after the same audit was run and repaired on Grade 8, so this folder has the
evidence ready for a thorough pass later.

Everything below came from reading the modules and the blueprint, not from impression. Re-run the
guard at any time to see the current state:

```
node tests/exam_coverage.test.js      # fails today, on purpose — it documents this backlog
node tests/math_formatting.test.js    # passes today
```

---

## 1. The headline: effort is inverted against exam weight

The MCAP Grade 7 blueprint has **23 content items + 6 reasoning + 6 modeling = 35 operational
items**. Content splits like this:

| Domain | Exam items | Module | Questions | Exam-grade | Density |
|---|---|---|---|---|---|
| **Ratios & Proportional (7.RP)** | **8 — the heaviest** | `Ratios_Proportional_Relationships` | **17 — the thinnest** | 5 | 29% |
| Equations & Expressions (7.EE) | 5 | `Expressions_Equations_Inequalities` | 26 | 9 | 35% |
| The Number System (7.NS) | 4 | `Number_System_Connections` | **42 — the largest** | **4** | **10%** |
| Geometry (7.G) | 3 | *not built* | — | — | — |
| Statistics & Probability (7.SP) | 3 | *not built* | — | — | — |

**The domain worth the most on the exam has the least practice, and the domain worth the least has
the most.** 7.RP carries twice the exam weight of 7.NS with 40% of the questions. 7.NS has 42
questions and only 4 exam-grade items — a 10% density, the lowest anywhere in either grade.

This is not an argument for deleting Number System work — the standard is *curriculum ∪ exam, never
a trade-off*. It is an argument for **building Ratios up**, and for raising 7.NS's exam density.

**Six of 23 content items (7.G + 7.SP) have no module at all.**

---

## 2. Skills with no exam-grade item

A student can finish these strands completely and produce **no evidence of exam readiness**, while
the dashboard shows the strand as done. This is invisible in a question count.

### `Number_System_Connections` — 42q, only 4 exam
| Skill | Qs | Phases present | Problem |
|---|---|---|---|
| `rationals` | 4 | practice ×4 | no exam, **and no climb at all** |
| `decimals` | 4 | practice ×4 | no exam, **and no climb at all** |
| `addsub-int` | 3 | guided, practice ×2 | no exam |
| `reasoning` | 5 | stretch ×5 | no exam; all constructed-response, none machine-scored |

### `Ratios_Proportional_Relationships` — 17q, 5 exam
| Skill | Qs | Phases present | Problem |
|---|---|---|---|
| `rates` | 3 | practice, apply, practice | no exam |
| `solving` | 2 | practice, apply | no exam |
| `percent` | 2 | practice ×2 | no exam |

### `Expressions_Equations_Inequalities` — 26q, 9 exam (healthiest)
| Skill | Qs | Phases present | Problem |
|---|---|---|---|
| `like-terms` | 3 | practice, guided, practice | no exam |
| `reasoning` | 1 | stretch | no exam, and only one question |
| `realworld` | 1 | exam | only one question |

### `Module_Template` — 7q
`reasoning` — 1q, stretch, no exam. Lower priority (it is a template), but a module stamped from it
inherits the gap.

---

## 3. The climb is broken in places

House flow is **Learn → Guided → Practice → Apply → Exam**. Two skills have *only* practice:

- `rationals` — practice, practice, practice, practice
- `decimals` — practice, practice, practice, practice

No teaching card, no scaffolded step, no application, no exam. Four repetitions of the same rung is
the blocked-practice failure the house rules name explicitly: it feels like mastery and produces
almost none.

---

## 4. Reasoning and Modeling are barely covered

**12 of 35 operational items (34%)** are Reasoning (6) and Modeling (6). Each subclaim is *four
machine-scored 1-point items plus one 3-point and one 4-point constructed response.*

- `reasoning` exists in all three modules but is **stretch-only and never machine-scored**, so it
  cannot register as exam readiness.
- **There is no `modeling` skill anywhere.**
- The 3-point / 4-point constructed-response shape does not appear in any module.

Constructed responses deliberately do **not** count toward exam coverage — they cannot be
machine-scored into the readiness figure, so tagging one `data-exam="1"` would inflate a number it
can never satisfy. Reasoning needs *machine-scored* items in addition to the CRs.

---

## 5. This grade sits DC CAPE, not MCAP

Per `CAPE_vs_MCAP_Grade7_Blueprint_Comparison.md`, this student's exam is **DC CAPE**. The content is
identical (same CCSS 7.RP / 7.NS / 7.EE / 7.G / 7.SP), so the blueprint above is a fair proxy for
weighting — but the *packaging* differs:

- CAPE reports **Task Type 1 / 2 / 3**, not Content / Reasoning / Modeling subclaims.
- CAPE uses **multi-point items** (2-point and 6-point tasks) where MCAP uses 1-point items.

So exam capstones built for this grade should include some **2-point and 6-point PARCC-style task
shapes**, not only 1-point selected response.

---

## 6. Sources available in this folder

All text-extractable with `pdftotext -layout` unless noted. Scanned pages can be rendered with
`pymupdf` and read as images.

| Source | Use |
|---|---|
| **enVision Mathematics Grade 7 Student Edition** (~268k chars) | primary textbook exercises |
| **Illustrative Mathematics G7 Units 7–9 Teacher Guide** (~906k chars) | richest single source |
| **Illustrative Mathematics G7 Units 4–6 Student** (~232k) | exercises |
| `MCAP RELEASES PER TOPIC/` — 2023, 2024, 2025 released items + per-domain sets | **exam capstones** |
| `MCAP Grade 7.pdf` + practice test + answer key | exam-shaped items with verified answers |
| `Grade_7_MCAP_Public_Blueprint-A.pdf` | weighting (above) |
| `Math_Standards.pdf`, MCCRS guides in `Curriculum/` | coverage checking |
| Spectrum Grade 7, Glencoe, Rising/Accelerated summer packets | supplementary |

**Copying textbook questions into modules is preferred**, not a fallback — see §11 of
`PROJECT_STANDARD.md`. Only the source PDFs stay unpublished; their content may be used.

---

## 7. Suggested order of repair

1. **Build up `Ratios_Proportional_Relationships`** — heaviest domain, thinnest module, three skills
   with no exam item. Highest return per hour.
2. **Raise 7.NS exam density** and give `rationals` / `decimals` a real climb rather than four
   practice items each.
3. **Machine-scored reasoning items** in all three modules, so the skill can register readiness.
4. **Introduce a `modeling` skill** and some 2-point / 6-point CAPE-shaped tasks.
5. `like-terms` exam item; `realworld` depth in Expressions.
6. `Module_Template` reasoning gap, so new modules do not inherit it.
7. Longer term: **Geometry (7.G) and Statistics (7.SP) modules** — 6 content items with no module.

Re-run `node tests/exam_coverage.test.js` after each pass; it goes green when §2 is cleared.

---

## 8. One caveat about the guard

`exam_coverage.test.js` originally reported a **pass** on `Number_System_Connections` while reading
nothing at all: cards in this repo are written `class="qcard interactive"`, and the check matched
only `class="qcard"`. It now matches both **and fails when it parses zero skills**, because a pass on
no data is not a pass. If you add a module with different card markup, check the guard still sees it.
