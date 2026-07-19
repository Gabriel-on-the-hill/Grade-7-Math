# Grade 7 — module repair backlog

**Status: §§1–7 are findings only — none of the content work has been done yet.**
**§8 (the shared storage namespace) is FIXED as of 19 Jul 2026** — see that section.
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

## 8. FIXED 19 Jul 2026 — platform, not content: the two hubs shared one storage namespace

**This is not a module repair, but it belongs here because Grade 7 was one of the two victims.**

**Outcome:** Grade 8 now owns `g8.` (commit `b92c15e` in that repo), with a one-time per-device
migration. **Grade 7 keeps `g7.` and needed no code change** — its hub and its modules already agree
on that prefix, so it is self-consistent. Nothing is outstanding here for this folder.

**One correction to the analysis below, because it under-scoped the job.** The text originally called
this "a one-constant change plus a migration." It was not. The **modules never used `STORE_PREFIX` at
all** — each one hardcoded `'g7.current'`, `'g7.data'`, `'g7.pins'` and `'g7.sheetURL'`, ten literals
per file, so the hub's constant never governed them. Changing only the hub would have split hub from
modules: the dashboard would read `g8.data` while the modules kept writing `g7.data`, and **a
student's work would have silently stopped appearing** — a worse failure than the one being fixed,
and one that looks exactly like "no work done." The real change was the constant, plus `G7_STORE` in
three live modules and both Starter Kit templates, plus the migration.

**Read this as a general lesson:** a constant that is only honoured by one of the files that shares it
is not a constant. Before renaming one, grep for the literal, not just for the constant's name.

*The original finding is kept below, as written, for the record.*

### The defect

Both hubs declare `var STORE_PREFIX='g7.'` (line ~336 in each). So on any device that opens both —
the tutor's, always — `g7.roster`, `g7.data`, `g7.pins`, `g7.current`, `g7.teacherPass` and
`g7.syncKey` are **one shared set of keys**.

`applySeeds()` then rewrites the roster on **every boot**, unconditionally, and prunes the PIN of any
name not in *this* hub's seed (`Grade_7_Math_Hub.html`, in `applySeeds`, the `if(ROSTER_SEED.length)`
branch — note there is no `seedv` guard on it, unlike the passcode branch below it):

| Tutor opens | Effect on the shared store |
|---|---|
| Grade 8 | roster ← the Grade 8 seed; **the Grade 7 student's PIN is deleted** |
| then Grade 7 | roster ← `['<student>']`; **both Grade 8 students' PINs are deleted** |
| then Grade 8 | the Grade 7 PIN is deleted again… |

It self-heals on the next cloud pull (PINs return with the teacher key), so it looks harmless — but
the churn is masking a real fault, and it is the **same root cause** behind three symptoms already
hit in July 2026:

1. A deleted `Homework`/SyncStore row **reappeared** — the tutor's device republished another
   grade's student, because the push loop iterated every student in the shared `g7.data`.
   *(Fixed 19 Jul by a roster-membership guard on push — the symptom, not the cause.)*
2. A **Grade 7 student appeared on the Grade 8 dashboard** — the dashboard listed anyone found in
   shared data. *(Fixed 19 Jul by scoping the dashboard to the hub's own roster.)*
3. **Removing a student from the roster changed nothing**, because the roster governs sign-in while
   the data lives in the shared store.

### The fix, and why it needs care

Give each hub its own prefix (`g7.` → `g8.` for Grade 8; keep `g7.` here). It is a one-constant
change **plus a migration**: every existing device already holds that student's PINs, progress and
device binding under `g7.`. Shipping the rename without a migration would strand a student's work
and PIN on their own device and make them look like a brand-new user.

Suggested approach: on boot, if the new prefix has no data and the old one does, copy the keys this
hub owns across once, and record that the migration ran.

### Related, separate: a single teacher console

Two dashboards is *sufficient* but the wrong shape for a tutor who teaches both grades — two URLs to
answer one question. More importantly, **a student's history spans grades**: the Grade 8 student was
Grade 7 in 2025–26, so her record lives under two hub ids, and no per-hub dashboard can ever show
that trajectory.

The data is already unified — the Sheet namespaces by `hub`, and the `Homework` and `Log` tabs both
carry a `hub` column. **Only the view is split.** One teacher-key-gated console that pulls every hub
and groups by grade would do it.

**Order:** fix `STORE_PREFIX` first (it is the root cause of three symptoms), then build the console
if wanted. Do **not** add a third dashboard for Grade 7 — that multiplies the problem.

**Status 19 Jul 2026:** the `STORE_PREFIX` prerequisite is done, so the console is unblocked and is
now the open item in this section. It is still a *want*, not a defect — nothing is broken without it.

## 9. One caveat about the guard

`exam_coverage.test.js` originally reported a **pass** on `Number_System_Connections` while reading
nothing at all: cards in this repo are written `class="qcard interactive"`, and the check matched
only `class="qcard"`. It now matches both **and fails when it parses zero skills**, because a pass on
no data is not a pass. If you add a module with different card markup, check the guard still sees it.
