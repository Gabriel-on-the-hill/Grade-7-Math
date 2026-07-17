# Cloud Sheet setup for a new hub (shared backend)

> **Do not deploy a new backend for a new grade.** The SAT hub, Grade 7, Grade 8 and every future hub
> share **one Google Sheet + one Apps Script deployment**. Each app identifies itself with a **hub id**,
> so rows are filed per program and can never collide — and one student can be in several programs at
> once. A per-grade deployment is the mistake this file exists to prevent.

The hub works fully **without** any of this (everything saves in the browser). The Sheet gives the
teacher a cloud copy they can open from anywhere.

---

## If the backend already exists (the normal case)

**One step.** Paste the existing `/exec` URL into **Hub → Settings (gear) → Save**. Same URL as every
other hub. Then do the *"Give your new hub an id"* section below — that part is per-grade.

## If it does not exist yet (once, ever)

The canonical script is **`Starter_Kit/HUB_Sync_Apps_Script.gs` in the Grade 8 project**, with the full
walkthrough in **`Starter_Kit/HUB_Google_Sheet_Setup.md`** there. There is deliberately **one copy** of
that script — it is the shared backend, so a second copy would drift. The short version:

1. **sheets.new** → name it e.g. `Study Hubs Cloud`.
2. **Extensions → Apps Script**, delete any code, paste all of `HUB_Sync_Apps_Script.gs`, **save**.
3. Run **`setup`** once (the only function you run by hand); approve the prompt. It creates the `Log`
   and `SyncStore` tabs and prints the `SHEET_ID` line to paste at the top of the script.
4. **Deploy → New deployment → Web app** — *Execute as:* **Me**, *Who has access:* **Anyone**.
5. Copy the **Web app URL** (`/exec`) and paste it into every hub's Settings.

**Check it:** `<your /exec URL>?op=ping` names the exact Sheet the deployment writes to. That is how you
tell which Sheet is live if you ever end up with more than one.

> **Never commit the teacher key or the Sheet id into a repo.** `TEACHER_KEY` and `SHEET_ID` stay `''`
> in the repo copy and are filled in **inside the Apps Script editor only** — these repos are public.

---

## Give your new hub an id (per grade — do not skip)

The backend files every row under `String(d.hub || 'default')`. Miss this and your new grade's rows land
under `default`, mixed in with anything else that forgot — the `hub` column exists precisely to keep
programs apart.

Pick a short lowercase id (`grade7`, `grade8`, `grade9`, `sci7`…) and set it in **two places**:

| File | Constant | Example |
|---|---|---|
| `<Grade>_Math_Hub.html` | `var SYNC_HUB_ID='…'` (used by `postSheet`) | `'grade9'` |
| every module | `var G7_SYNC_HUB='…'` (used by `g7sheet`) | `'grade9'` |

They **must match**. Both templates ship the constant set to **`CHANGEME`** — set it in
`Module_Template.html` **before** you stamp your modules, and every stamped copy inherits the right id.
`CHANGEME` is deliberate: it shows up loudly in the Sheet's `hub` column, whereas `default` would look
plausible while quietly mixing your grades together.

**Verify:** practice one step as a student, then check the Sheet's `Log` tab — the `hub` column on the
new row must read your id, not `CHANGEME` and not `default`.

---

## What lands in the Sheet

`Log` tab — the activity feed across all hubs:

| when | hub | student | topic | question | event | detail |
|---|---|---|---|---|---|---|
| 2026-07-16 14:02 | grade9 | Damilare | Linear Functions | Q4.2a | struggle | typed "1/4" |
| 2026-07-16 14:03 | grade9 | Damilare | Linear Functions | Q4.2a | step_complete | — |

**Event types:** `step_complete` (got it right), `struggle` (a wrong attempt — *detail* shows what they
typed), `constructed_response`, `topic_opened`, and `review_opened` (a spaced-review retrieval session;
*detail* = the skill being retrieved).

`SyncStore` tab — multi-device sync state (PINs, homework, per-topic records), **only** for hubs that
carry the cloud-sync layer. A logging-only hub never writes it. Do not edit it by hand.

For a teacher view, add a tab and `FILTER`/Pivot the **Log**, filtering on `hub` first — every program
shares it.

---

## Data contract

Storage keys and the record shape live in the hub's own `PROJECT_STANDARD.md` §4 (start from
`PROJECT_STANDARD_TEMPLATE.md`) — including the retention fields (`reviewStreak`,
`skillStats[k].last/.streak/.day`, `acq*`/`ret*`, `levelStats`). Never restate them here; the standard
is the source of truth and the two must not disagree.
