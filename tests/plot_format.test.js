/* Plot-input format guard (6th item format, added 2026-07-20).
 *
 * The plot is a UI painted on top of a hidden .ans-input, deliberately: clicking writes into that
 * input and the ordinary engine does the rest (checkInput's tolerance/text match, setStepDisabled's
 * locking, restoreProgress's re-fill, g7revReset's clearing). PROJECT_STANDARD §7.2 forbids
 * hand-rolling the answer handlers, and this does not — so what needs proving is that the pointer
 * layer honours the invariants the engine already enforces:
 *
 *   1. a click places a point and writes a value in the expected format
 *   2. a click on a LOCKED step writes nothing (no keyboard/mouse bypass of the lock ladder)
 *   3. a wrong placement is marked wrong and does not advance progress
 *   4. the correct placement grades and advances, through the normal .check-btn path
 *   5. snapping is exact — a click between ticks lands ON a tick, never between
 *
 * Run:  node tests/plot_format.test.js
 */
const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

const DIR = path.join(__dirname, '..');
const FILE = 'Module_Template.html';

let fail = 0;
const ok = (c, m) => { console.log((c ? '  ok   ' : '  FAIL ') + m); if (!c) fail++; };

function boot(file) {
  const html = fs.readFileSync(path.join(DIR, file), 'utf8');
  const dom = new JSDOM(html, { runScripts: 'dangerously', url: 'http://localhost/' + file, pretendToBeVisual: true });
  return new Promise((res, rej) => {
    const t = setTimeout(() => rej(new Error('no load event')), 5000);
    dom.window.addEventListener('load', () => { clearTimeout(t); setTimeout(() => res(dom.window), 0); });
  });
}

// jsdom gives every element a zero-size rect, so a real click cannot be simulated by coordinates.
// Drive the engine's own placement path instead, with a synthetic rect, then assert on the value.
function place(w, box, clientX, clientY) {
  // jsdom reports a zero-size rect for everything; the engine falls back to viewBox units when the
  // measured width is 0, so clientX/clientY map straight onto viewBox coordinates here.
  const hit = box.querySelector('.hit');
  const ev = new w.MouseEvent('click', { bubbles: true, clientX, clientY });
  hit.dispatchEvent(ev);
}

(async () => {
  let w;
  try { w = await boot(FILE); } catch (e) { console.log('FAIL ' + FILE + ' — ' + e.message); process.exit(1); }
  const d = w.document;
  console.log(FILE);

  const card = d.querySelector('.qcard[data-qid="d10"]');
  ok(!!card, 'the plot demo card d10 exists');
  if (!card) process.exit(1);

  const steps = card.querySelectorAll('.step');
  const line = steps[0], grid = steps[1];
  const lineBox = line.querySelector('.plotbox'), gridBox = grid.querySelector('.plotbox');
  ok(!!lineBox && !!gridBox, 'both a number-line and a grid plot render');
  ok(!!lineBox.querySelector('svg') && !!gridBox.querySelector('svg'), 'both painted an svg');

  const lineInp = lineBox.querySelector('.ans-input');
  ok(lineInp && lineInp.type === 'hidden', 'the value lives in a hidden .ans-input (engine does the checking)');

  // --- 2. a locked step must not accept a placement --------------------------------------------
  ok(grid.classList.contains('locked'), 'step 2 starts locked');
  const gridInp = gridBox.querySelector('.ans-input');
  ok(gridInp.disabled === true, 'the locked step disabled its hidden input');
  place(w, gridBox, 100, 100);
  ok(gridInp.value === '', 'clicking a LOCKED plot writes nothing — the lock ladder holds');

  // --- 1 + 5. placement and snapping ------------------------------------------------------------
  // number line spans -10..10 across x 26..334; x=180 is the midpoint => 0
  place(w, lineBox, 180, 52);
  ok(lineInp.value === '0', 'a click at the midpoint places exactly 0 (got "' + lineInp.value + '")');
  // a click deliberately between two ticks must snap onto one
  place(w, lineBox, 187, 52);
  ok(Number.isInteger(parseFloat(lineInp.value)), 'a click between ticks snaps to a tick, never between (got "' + lineInp.value + '")');

  const done = () => Number(d.getElementById('op-done').textContent);

  // --- 3. wrong placement grades wrong and does not advance -------------------------------------
  const before = done();
  place(w, lineBox, 180, 52);                    // 0, but the key is -3
  line.querySelector('.check-btn').click();
  ok(done() === before, 'a wrong placement does not advance progress');

  // --- 4. correct placement grades through the ordinary check path ------------------------------
  // -3 sits at x = 26 + ((-3) - (-10))/20 * 308
  const x = 26 + (7 / 20) * 308;
  place(w, lineBox, x, 52);
  ok(lineInp.value === '-3', 'clicking at -3 writes "-3" (got "' + lineInp.value + '")');
  line.querySelector('.check-btn').click();
  ok(done() > before, 'the correct placement advances progress via the normal .check-btn path');
  ok(!grid.classList.contains('locked'), 'completing step 1 unlocked step 2');

  // --- grid writes an "x,y" pair ----------------------------------------------------------------
  // grid: x 0..6 across 44..344, y 0..20 across 260..16 ; (3,12) => x=194, y=113.6
  place(w, gridBox, 44 + (3 / 6) * 300, 260 - (12 / 20) * 244);
  ok(gridInp.value === '3,12', 'a grid click writes "x,y" (got "' + gridInp.value + '")');
  grid.querySelector('.check-btn').click();
  ok(done() > before + 1, 'the grid placement grades and advances too');

  console.log('\n' + (fail ? 'FAIL ' + fail + ' assertion(s)' : 'PASS  plot input places, snaps, respects locks, and grades through the engine'));
  process.exit(fail ? 1 : 0);
})();
