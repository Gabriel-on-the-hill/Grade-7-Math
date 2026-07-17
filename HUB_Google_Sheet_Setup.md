# Grade 7 Hub — cloud Sheet setup

> **One backend serves every hub.** The SAT hub, Grade 7, Grade 8 and any future hub all talk to
> **one Google Sheet + one Apps Script deployment**. Each app identifies itself with a hub id — Grade 7
> sends `grade7` — so rows are filed per program and can never collide, and one student can be in
> several programs at once.

**If you have already set this up for another hub (e.g. Grade 8): you are done in one step.** Paste the
same `/exec` URL into **Hub → Settings (gear) → Save**. Do **not** create a second Sheet or a second
deployment — that is the one mistake that costs you an afternoon (see *Already have the old Grade 7
logger?* below).

The hub works fully **without** any of this — everything saves in the browser. The Sheet gives you a
cloud copy you can open from anywhere.

---

## First time (~5 minutes, once for ALL hubs)

The canonical script is **`Starter_Kit/HUB_Sync_Apps_Script.gs` in the Grade 8 project**. There is
deliberately **one copy** of it — it is the shared backend for every hub, so a second copy in this repo
would drift out of sync with it. Follow **`Starter_Kit/HUB_Google_Sheet_Setup.md`** there; the short
version:

1. **sheets.new** → name it e.g. `Study Hubs Cloud`.
2. **Extensions → Apps Script**, delete any code, paste all of `HUB_Sync_Apps_Script.gs`, **save**.
3. Run **`setup`** once (the only function you run by hand). Approve the permissions prompt. It creates
   the `Log` and `SyncStore` tabs and prints the `SHEET_ID` line to paste at the top of the script.
4. **Deploy → New deployment → Web app** — *Execute as:* **Me**, *Who has access:* **Anyone**.
5. Copy the **Web app URL** (ends in `/exec`).
6. **Hub → Settings (gear) → paste the URL → Save.** Repeat step 6 in every hub, same URL.

**Check it:** open `<your /exec URL>?op=ping` in a browser. It names the exact Sheet the deployment
writes to and the row counts. If you ever end up with several copies of the Sheet, that is how you tell
which one is live. The hub's Settings → *Test connection* runs the same ping.

---

## What Grade 7 sends

Grade 7's hub id is **`grade7`** — set in code (`SYNC_HUB_ID` in `Grade_7_Math_Hub.html`, `G7_SYNC_HUB`
in each module). **Nothing to configure**, but if you stamp a new module, keep that constant or its rows
land under `default` instead of `grade7`.

Grade 7 uses **both tabs** (as of 16 Jul 2026 — the v1.5 sync layer was ported over from Grade 8, so
the grades are one engine again):

- **`Log`** — the activity feed (every step, struggle, and review session).
- **`SyncStore`** — multi-device sync state. Progress, PINs, homework and reviewed-response marks
  follow the student to any device, and your dashboard sees every student from anywhere.

**Turn on the teacher dashboard, once per device:** Settings → **Teacher sync key** → paste the
`TEACHER_KEY` from your Apps Script → Save. Without it this device still syncs, but only the
signed-in student's own work — which is exactly what a student's device should do. Students never
need the key; their PIN authenticates them and only ever reaches their own record.

Sync is **offline-first**: the hub renders from the browser first, so a slow or unreachable backend
never blocks a lesson; it merges and re-renders when the pull returns. Conflicts resolve
last-write-wins on `lastPracticed`, and a local record that is newer than the cloud is **pushed, never
overwritten**.

The `Log` tab columns:

| when | hub | student | topic | question | event | detail |
|---|---|---|---|---|---|---|
| 2026-07-16 14:02 | grade7 | Damilare | Number System Connections | Q4.2a | struggle | typed "1/4" |
| 2026-07-16 14:03 | grade7 | Damilare | Number System Connections | Q4.2a | step_complete | — |

**Event types:** `step_complete` (right), `struggle` (a wrong attempt — *detail* shows what they typed),
`constructed_response`, `topic_opened`, and `review_opened` (a spaced-review retrieval session, *detail*
= the skill being retrieved).

To get a teacher view, add a tab and `FILTER` or Pivot the **Log** — filter `hub = "grade7"` first, since
every program shares it.

---

## Already have the old Grade 7 logger? (migration)

Earlier versions of this file told you to create a **separate** "Grade 7 Hub — Activity Log" Sheet with
its own 20-line `doPost`. That script had no `hub` column, no auth, and no `SyncStore`. If you deployed
it, you now have a second Sheet collecting Grade 7 rows in isolation.

To move: set up the shared backend above (or reuse the one you already have), then paste **that** `/exec`
URL into Grade 7's Settings. New rows go to the shared `Log` under `hub = grade7`. The old Sheet keeps
its history — nothing is lost — but it stops receiving rows, and you can retire the old deployment.

---

## Data contract

The storage keys and record shape are the source of truth in
**[PROJECT_STANDARD.md](PROJECT_STANDARD.md) §4** — including the retention fields (`reviewStreak`,
`skillStats[k].last/.streak/.day`, `acq*`/`ret*`, `levelStats`). Do not restate them here; that section
and this file must never disagree.
