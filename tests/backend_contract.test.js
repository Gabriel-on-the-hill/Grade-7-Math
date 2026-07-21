/* Shared-backend contract guard (Grade 7 side).
 *
 * The Apps Script backend is deliberately single-sourced in Grade 8 (HANDOFF D5, PROJECT_STANDARD
 * §6.1): one deployment serves every hub, namespaced by a `hub` id, so copying it here would fork a
 * live backend. The cost of that decision is the gap this file closes — `homework_backend.test.js`
 * runs only in Grade 8, so a Grade 7-only session gets a **green board while the backend half is
 * untested locally** (scrutiny item S9). Homework privacy is enforced by the backend, not the app,
 * so "green but unchecked" is the wrong signal to give.
 *
 * This is NOT a second copy of Grade 8's suite — it does not re-drive the .gs. It guards the four
 * things that are Grade 7's own business:
 *
 *   1. the shared backend is actually reachable  (if it is not, say so — never pass quietly)
 *   2. Grade 7 has not grown a .gs of its own    (that would fork the backend — D5)
 *   3. the backend still namespaces rows by hub  (drop that and Grade 7/Grade 8 data merge)
 *   4. every Grade 7 file that talks to it declares hub id exactly 'grade7'
 *
 * (4) matters more than it looks: both call sites send `hub: <id> || 'default'`. A blanked constant
 * therefore does not error — it silently files this hub's rows into the shared 'default' namespace
 * alongside every other app. That is a data-mixing bug that looks like nothing at all.
 *
 * Behavioural coverage of the backend itself stays in Grade 8: node tests/homework_backend.test.js
 *
 * Run:  node tests/backend_contract.test.js
 */
const fs = require('fs');
const path = require('path');

const DIR = path.join(__dirname, '..');
const BACKEND = path.join(DIR, '..', 'Grade 8', 'Starter_Kit', 'HUB_Sync_Apps_Script.gs');
let fail = 0;
const bad = m => { console.log('FAIL ' + m); fail++; };

// ---- 1. the shared backend is reachable ------------------------------------------------------
if (!fs.existsSync(BACKEND)) {
  console.log('FAIL the shared backend is missing: ' + BACKEND);
  console.log('     D5 keeps one Apps Script deployment for every hub, single-sourced in Grade 8.');
  console.log('     Do NOT fix this by copying the .gs here — that forks a live backend. Restore the');
  console.log('     sibling checkout, or change D5 deliberately and update PROJECT_STANDARD §6.1.');
  process.exit(1);
}
const gs = fs.readFileSync(BACKEND, 'utf8');
console.log('PASS  shared backend found (single-sourced in Grade 8, per D5)');

// ---- 2. Grade 7 must not carry its own backend ------------------------------------------------
const strays = fs.readdirSync(DIR).filter(f => /\.gs$/.test(f))
  .concat(fs.existsSync(path.join(DIR, 'Starter_Kit'))
    ? fs.readdirSync(path.join(DIR, 'Starter_Kit')).filter(f => /\.gs$/.test(f)).map(f => 'Starter_Kit/' + f)
    : []);
if (strays.length) bad('Grade 7 carries its own .gs — that forks the shared backend (D5): ' + strays.join(', '));
else console.log('PASS  Grade 7 declares no backend of its own');

// ---- 3. the backend still namespaces by hub ---------------------------------------------------
// Both tabs carry a hub column, and the sync row key is built hub-first. Lose either and two hubs
// writing the same student name collide.
if (!/\bvar HW_HEADER\s*=\s*\[[^\]]*'hub'/.test(gs)) bad("the homework tab header no longer carries a 'hub' column");
if (!/_sheet\(SHEET_SYNC,\s*\['key',\s*'hub'/.test(gs)) bad("the sync tab header no longer carries a 'hub' column");
// EVERY row key must be hub-first, not merely one of them. Checking that `[hub,` appears somewhere
// is not enough: the .gs builds two keys (the auth pin and the sync row), so dropping hub from one
// still leaves the other matching. A mutation test caught exactly that — the weaker check passed
// with the sync key un-namespaced, which is the case that actually merges two hubs' student data.
const keys = [...gs.matchAll(/var key\s*=\s*\[([^\]]*)\]/g)];
if (!keys.length) bad('parsed 0 row-key constructions — the backend changed shape; fix this guard');
for (const k of keys) {
  if (!/^\s*hub\s*,/.test(k[1])) bad('a row key is not namespaced by hub: [' + k[1].trim() + ']');
}
if (!/var hub\s*=\s*String\(d\.hub\s*\|\|\s*'default'\)/.test(gs)) bad('the backend no longer reads a hub id from the request');
if (!fail) console.log('PASS  backend namespaces rows by hub id');

// ---- 4. every Grade 7 caller declares hub id 'grade7' ------------------------------------------
// Vacuous-pass protection (trap #7): if the scan matches nothing, the guard is broken, not green.
const HTML = fs.readdirSync(DIR).filter(f => /\.html$/.test(f) && !/^index\.html$/.test(f));
let declared = 0;
for (const f of HTML) {
  const h = fs.readFileSync(path.join(DIR, f), 'utf8');
  // modules use G7_SYNC_HUB, the hub itself uses SYNC_HUB_ID; both feed `hub: <id> || 'default'`
  for (const m of h.matchAll(/(G7_SYNC_HUB|SYNC_HUB_ID)\s*=\s*'([^']*)'/g)) {
    declared++;
    if (m[2] !== 'grade7') {
      bad(f + ': ' + m[1] + " = '" + m[2] + "' — expected 'grade7'. A wrong or blank id does not "
        + "error, it files this hub's rows under 'default' with every other app.");
    }
  }
  // A file that posts to the backend but names no hub id would fall through to 'default'.
  if (/hub\s*:\s*(G7_SYNC_HUB|SYNC_HUB_ID)/.test(h) && !/(G7_SYNC_HUB|SYNC_HUB_ID)\s*=\s*'/.test(h)) {
    bad(f + ': sends a hub id it never declares — it will post as \'default\'');
  }
}
if (!declared) bad('parsed 0 hub-id declarations — the constant was renamed; fix this guard');
else if (!fail) console.log('PASS  ' + declared + " hub-id declaration(s), all 'grade7'");

console.log('\nBehavioural coverage of the backend lives in Grade 8: node tests/homework_backend.test.js');
if (fail) { console.log('FAIL ' + fail + ' backend-contract violation(s)'); process.exit(1); }
console.log('PASS  shared-backend contract holds from the Grade 7 side');
