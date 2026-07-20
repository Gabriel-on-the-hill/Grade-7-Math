/* MCAP provenance guard.
 *
 * An item may claim the MCAP label ONLY if it is a real released MCAP item recorded in
 * MCAP_PROVENANCE.md with its citation. A question presented to a student as "MCAP" when it is not
 * one is a false claim about the material they are practising with, and it launders credibility from
 * the genuinely sourced items beside it.
 *
 * This is not a style check. It failed for real on 20 Jul 2026, when 19 assistant-authored capstones
 * shipped titled "MCAP ·" because that was the surrounding title convention. They were MCAP-shaped,
 * not MCAP-sourced.
 *
 * The check runs both ways:
 *   - every card whose text says MCAP must appear in the manifest  (no unlabelled invention)
 *   - every manifest row must point at a card that exists and still claims MCAP  (no stale rows)
 *
 * Run:  node tests/mcap_provenance.test.js
 */
const fs = require('fs');
const path = require('path');

const DIR = path.join(__dirname, '..');
const MANIFEST = path.join(DIR, 'MCAP_PROVENANCE.md');

if (!fs.existsSync(MANIFEST)) { console.log('FAIL MCAP_PROVENANCE.md is missing'); process.exit(1); }

// Rows look like: | `File.html` | `qid` | packet | citation | standard |
// Only rows whose first cell is a .html file are item rows; the "not yet used" table is skipped
// because its first cell is a packet name, not a file.
// Only the "Verified items" table grants an MCAP label. The later tables (textbook lifts, data
// reused from a released item) have the same shape but a different meaning — reading them here would
// let a data-only credit silently authorise a full MCAP claim.
const allowed = new Map();          // "file::qid" -> citation
let inVerified = false;
for (const line of fs.readFileSync(MANIFEST, 'utf8').split('\n')) {
  if (/^##\s/.test(line)) { inVerified = /^##\s+Verified items\s*$/.test(line); continue; }
  if (!inVerified) continue;
  // Keep BOTH the packet and the citation columns: the tell-tale for a mis-filed source ("…2023-
  // released-items…") sits in the packet column, so storing only the citation lets it through.
  const m = line.match(/^\|\s*`([^`]+\.html)`\s*\|\s*`([^`]+)`\s*\|([^|]*)\|([^|]*)\|/);
  if (m) allowed.set(m[1].trim() + '::' + m[2].trim(), (m[3] + ' | ' + m[4]).trim());
}
if (!allowed.size) { console.log('FAIL manifest parsed 0 item rows — the table format changed; fix this guard'); process.exit(1); }

// Three files in MCAP RELEASES PER TOPIC/ are New York State releases, not MCAP (see the manifest's
// "Not MCAP, despite the folder name"). A citation naming one of them is a false MCAP attribution
// even though it looks perfectly well-formed — the earlier version of this guard would have passed it,
// because it only checked that a claim carried *a* citation.
const NOT_MCAP = /\b(20(23|24|25)-released-items|New York|NYSED)\b/i;
for (const [key, citation] of allowed) {
  if (NOT_MCAP.test(citation)) {
    console.log('FAIL ' + key + ': cited to a New York State release — that is not MCAP. '
                + 'Label it NYSED or Exam-style. Citation was: ' + citation);
    process.exitCode = 1;
  }
}
if (process.exitCode) { console.log('\nFAIL non-MCAP citation(s) in the verified table'); process.exit(1); }

// Two rows citing the SAME packet + question number are usually a mistake, and a mistake this guard
// is otherwise blind to: it can prove a claim has a source, never that the item still matches that
// source. On 20 Jul, ex-2a and ex-2b both cited Q11 — ex-2b was the faithful reproduction and ex-2a
// an adaptation (different number, "type it" instead of "plot it") that had inherited the citation.
// Legitimate re-use of one item in two modules exists, so this is an allow-list, not a ban.
const SHARED_OK = new Set([
  'Math 7 2024 Release, Q3',   // the 15% tip select-all: r6-ex and EE 3-3, deliberately both
]);
const byCitation = new Map();
for (const [key, cite] of allowed) {
  const q = (cite.split('|')[1] || cite).trim();
  if (!/Q\d/.test(q)) continue;                   // rows with no question number can't be compared
  if (!byCitation.has(q)) byCitation.set(q, []);
  byCitation.get(q).push(key);
}
for (const [q, keys] of byCitation) {
  if (keys.length > 1 && !SHARED_OK.has(q)) {
    console.log('FAIL ' + keys.length + ' items cite ' + q + ' — ' + keys.join(', '));
    console.log('     If one of them ADAPTED the item (changed numbers or response format) it is no');
    console.log('     longer that item: relabel it Exam-style. If the re-use is deliberate, add the');
    console.log('     citation to SHARED_OK in this file with a note saying why.');
    process.exitCode = 1;
  }
}
if (process.exitCode) { console.log('\nFAIL duplicate citation(s) needing confirmation'); process.exit(1); }

const MODULES = fs.readdirSync(DIR)
  .filter(f => /\.html$/.test(f) && !/_Math_Hub\.html$/.test(f) && !/^index\.html$/.test(f))
  .filter(f => /G7_TOPIC_ID=/.test(fs.readFileSync(path.join(DIR, f), 'utf8')));

let fail = 0;
const seen = new Set();

for (const f of MODULES) {
  const h = fs.readFileSync(path.join(DIR, f), 'utf8');
  const bad = [];
  for (const p of h.split(/<div class="qcard[\s"]/).slice(1)) {
    const qid = (p.match(/data-qid="([^"]+)"/) || [])[1];
    if (!qid || /\+String/.test(qid)) continue;
    const body = p.split(/<\/section>/)[0];

    // A *claim* is what the student reads as "this is an exam question": the card title, or a stem
    // opening "MCAP item ·". A caption crediting where a data set came from is *attribution*, not a
    // claim, and must not be forced to carry a provenance row — otherwise the only way to attribute
    // honestly would be to stop attributing. (Statistics 2-4 is ours, labelled Exam-style, and only
    // its dot-plot data is MCAP's; it is recorded under "Data reused from a released item".)
    const title = (body.match(/<span class="qtitle">([^<]*)/) || [])[1] || '';
    const stems = [...body.matchAll(/<div class="step-label">([\s\S]*?)<\/div>/g)].map(m => m[1]).join(' ');
    const claims = /MCAP/.test(title) || /MCAP\s*item/i.test(stems);
    if (!claims) continue;

    const key = f + '::' + qid;
    seen.add(key);
    if (!allowed.has(key)) {
      bad.push(qid + ': claims MCAP but has no row in MCAP_PROVENANCE.md — source it or drop the label');
      fail++;
    }
  }
  if (bad.length) { console.log('FAIL ' + f); bad.forEach(b => console.log('     ' + b)); }
  else console.log('PASS ' + f);
}

// stale rows: manifest promises a citation for something that no longer claims MCAP
for (const key of allowed.keys()) {
  if (!seen.has(key)) {
    console.log('FAIL stale manifest row: ' + key + ' no longer exists or no longer claims MCAP');
    fail++;
  }
}

console.log('\n' + seen.size + ' MCAP-claiming item(s), ' + allowed.size + ' manifest row(s)');
if (fail) { console.log('FAIL ' + fail + ' provenance violation(s)'); process.exit(1); }
console.log('PASS  every MCAP label is backed by a cited released item');
