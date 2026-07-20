/* Homework engine — plan validation guard.
 *
 * Drives the REAL hwValidatePlans() out of this folder's *_Math_Hub.html.
 *
 * The rule this protects: validation FAILS CLOSED. One bad plan in a file publishes nothing at all,
 * because a half-published week — some students with homework, some silently without — is worse
 * than an unpublished one and far harder to notice.
 *
 * The backend half of homework (per-student isolation) is NOT guarded here: it lives in the shared
 * Apps Script, single-sourced in Grade 8's Starter_Kit/HUB_Sync_Apps_Script.gs and driven by that
 * repo's tests/homework_backend.test.js — which does assert that a grade7 pull sees no grade8
 * homework. One deployment serves both hubs, so duplicating the script here would fork it.
 * Run:  node tests/homework_publish.test.js
 */
const fs = require('fs');
const path = require('path');
// Auto-detect this repo's hub, so the same suite guards Grade 7, Grade 8 and any future hub.
const DIR = path.join(__dirname, '..');
const HUB = fs.readdirSync(DIR).find(f => /_Math_Hub\.html$/.test(f));
if (!HUB) { console.log('FAIL no *_Math_Hub.html found'); process.exit(1); }
const html = fs.readFileSync(path.join(DIR, HUB), 'utf8');
console.log('hub: ' + HUB);

const fnSrc = (html.match(/function hwValidatePlans\(list\)\{[\s\S]*?\n  \}/) || [])[0];
if (!fnSrc) { console.log('FAIL could not extract hwValidatePlans'); process.exit(1); }

// hub collaborators the validator leans on
const ROSTER = ['A', 'B'];
function resolveName(s) {
  s = String(s || '').trim().toLowerCase();
  for (const r of ROSTER) if (r.toLowerCase() === s) return r;
  return '';
}
const SUBJECTS_BY_ID = { math: { id: 'math' }, sci: { id: 'sci' } };
function subjectById(id) { return SUBJECTS_BY_ID[id] || null; }
const OWNED = { 'expressions-equations': { id: 'expressions-equations' }, 'sci.matter': { id: 'sci.matter' } };
function topicMeta(id) { return OWNED[id] || null; }
var SYNC_HUB_ID = 'grade8';

eval(fnSrc + '\nglobal.__validate = hwValidatePlans;');
const validate = global.__validate;

let pass = 0, fail = 0;
const t = (label, got, want) => {
  const ok = JSON.stringify(got) === JSON.stringify(want);
  console.log((ok ? 'PASS ' : 'FAIL ') + label + (ok ? '' : `  (got ${JSON.stringify(got)}, want ${JSON.stringify(want)})`));
  ok ? pass++ : fail++;
};

const goodItem = { ref: 'module', topic: 'expressions-equations', qid: '2-3' };
const goodPlan = (student = 'A') => ({
  student, subject: 'math',
  sets: [{ id: 's1', label: 'Set 1', releaseOn: '2026-07-20', items: [goodItem] }]
});

// ---- happy path ----
let r = validate([goodPlan()]);
t('valid plan -> no errors', r.errors.length, 0);
t('valid plan -> one publishable plan', r.plans.length, 1);
t('publishable plan is stamped with hub/student/subject',
  [r.plans[0].plan.hub, r.plans[0].student, r.plans[0].subject], ['grade8', 'A', 'math']);
t('a set with no releaseOn is allowed (single set, available now)',
  validate([{ student: 'A', subject: 'math', sets: [{ id: 'x', items: [goodItem] }] }]).errors.length, 0);

// ---- rejections ----
const bad = p => validate([p]).errors.length > 0;
t('unknown student rejected',        bad({ student: 'Nobody', subject: 'math', sets: [{ id: 's', items: [goodItem] }] }), true);
t('unknown subject rejected',        bad({ student: 'A', subject: 'zzz', sets: [{ id: 's', items: [goodItem] }] }), true);
t('no sets rejected',                bad({ student: 'A', subject: 'math', sets: [] }), true);
t('set without id rejected',         bad({ student: 'A', subject: 'math', sets: [{ items: [goodItem] }] }), true);
t('duplicate set id rejected',       bad({ student: 'A', subject: 'math', sets: [{ id: 'd', items: [goodItem] }, { id: 'd', items: [goodItem] }] }), true);
t('bad releaseOn format rejected',   bad({ student: 'A', subject: 'math', sets: [{ id: 's', releaseOn: '20/07/2026', items: [goodItem] }] }), true);
t('set with no items rejected',      bad({ student: 'A', subject: 'math', sets: [{ id: 's', items: [] }] }), true);
t('bad ref rejected',                bad({ student: 'A', subject: 'math', sets: [{ id: 's', items: [{ ref: 'wat' }] }] }), true);
t('module item without qid rejected', bad({ student: 'A', subject: 'math', sets: [{ id: 's', items: [{ ref: 'module', topic: 'expressions-equations' }] }] }), true);
t('module item on an UNOWNED topic rejected',
  bad({ student: 'A', subject: 'math', sets: [{ id: 's', items: [{ ref: 'module', topic: 'not-ours', qid: '1-1' }] }] }), true);
t('bank item without id rejected',   bad({ student: 'A', subject: 'math', sets: [{ id: 's', items: [{ ref: 'bank' }] }] }), true);

// ---- the load-bearing rule ----
r = validate([goodPlan('A'), { student: 'Nobody', subject: 'math', sets: [{ id: 's', items: [goodItem] }] }]);
t('FAIL CLOSED: one bad plan publishes NOTHING', r.plans.length, 0);
t('...and the good plan is still reported as valid input', r.errors.length, 1);

// ---- multiple students stay separate ----
r = validate([goodPlan('A'), goodPlan('B')]);
t('two students -> two separate plans', r.plans.map(p => p.student), ['A', 'B']);

// ---- the shipped example plan must reference real topics and real qids -------------------------
// An example is documentation, and documentation that does not run is a trap: this file is what a new
// deployment copies, so a stale qid in it becomes their first failed publish.
(function(){
  const EX = path.join(DIR, 'Starter_Kit', 'homework-plans.example.json');
  if (!fs.existsSync(EX)) { console.log('FAIL Starter_Kit/homework-plans.example.json is missing'); fail++; return; }
  const plans = JSON.parse(fs.readFileSync(EX, 'utf8'));
  const byTopic = {};
  for (const f of fs.readdirSync(DIR).filter(f => /\.html$/.test(f))) {
    const h = fs.readFileSync(path.join(DIR, f), 'utf8');
    const id = (h.match(/G7_TOPIC_ID='([^']+)'/) || [])[1];
    if (!id) continue;
    byTopic[id] = new Set([...h.matchAll(/data-qid="([^"]+)"/g)].map(m => m[1]).filter(q => !/\+String/.test(q)));
  }
  let refs = 0, bad = 0;
  for (const plan of plans) for (const set of (plan.sets || [])) for (const it of (set.items || [])) {
    if (it.ref !== 'module') continue;
    refs++;
    if (!byTopic[it.topic]) { console.log('  bad topic  "' + it.topic + '"'); bad++; }
    else if (!byTopic[it.topic].has(it.qid)) { console.log('  bad qid    ' + it.topic + '/' + it.qid); bad++; }
  }
  t('example plan: all ' + refs + ' references resolve to a real topic and qid', bad, 0);
})();

console.log('\n' + pass + ' passed, ' + fail + ' failed');
process.exit(fail ? 1 : 0);
