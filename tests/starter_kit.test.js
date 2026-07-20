/* Starter Kit configuration guard.
 *
 * The kit is what a NEW grade or subject is stamped from. Until 20 Jul 2026 it shipped a working
 * `g7.` storage prefix, so a new deployment that forgot to change it wrote straight into Grade 7's
 * live data — silently. A storage collision does not throw; it corrupts, and you find out later from
 * a student's record. That is the same defect fixed on 19 Jul (MODULE_REPAIR_BACKLOG §8) sitting
 * latent in the template the fix was never applied to.
 *
 * Two properties are asserted here, and they are the whole point of the change:
 *
 *   1. SINGLE-SOURCED — no file in the kit hardcodes a `gN.` storage literal. §8's lesson is that a
 *      constant only one of the sharing files honours is not a constant: the hub template had
 *      STORE_PREFIX while the module template had ten hardcoded strings.
 *   2. LOUD — the prefix ships as CHANGEME and an unconfigured kit renders a visible [role=alert]
 *      banner. Stamping without editing now fails at the moment someone can fix it in one edit,
 *      instead of quietly months later.
 *
 * A served module must NEVER be in this state, which is why only Starter_Kit/ is scanned.
 *
 * Run:  node tests/starter_kit.test.js
 */
const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

const KIT = path.join(__dirname, '..', 'Starter_Kit');
let fail = 0;
const ok = (c, m) => { console.log((c ? '  ok   ' : '  FAIL ') + m); if (!c) fail++; };

if (!fs.existsSync(KIT)) { console.log('FAIL no Starter_Kit directory'); process.exit(1); }

const FILES = fs.readdirSync(KIT).filter(f => /\.html$/.test(f) && !/\.v\d+bak$/.test(f));
if (!FILES.length) { console.log('FAIL Starter_Kit holds no HTML templates'); process.exit(1); }

function boot(file) {
  const html = fs.readFileSync(path.join(KIT, file), 'utf8');
  const dom = new JSDOM(html, { runScripts: 'dangerously', url: 'http://localhost/' + file, pretendToBeVisual: true });
  return new Promise(res => {
    dom.window.addEventListener('load', () => setTimeout(() => res(dom.window), 0));
    setTimeout(() => res(dom.window), 4000);          // resolve anyway; the assertions report the truth
  });
}

(async () => {
  for (const f of FILES) {
    const src = fs.readFileSync(path.join(KIT, f), 'utf8');
    // strip HTML *and* JS comments: prose explaining which prefix belongs to which deployment is
    // exactly the documentation we want, and must not read as a hardcoded literal.
    const code = src.replace(/<!--[\s\S]*?-->/g, '').replace(/\/\*[\s\S]*?\*\//g, '');

    // 1. no hardcoded storage namespace anywhere outside a comment
    const lits = [...code.matchAll(/'(g\d+)\.[a-zA-Z]*'/g)].map(m => m[0]);
    ok(lits.length === 0, f + ': no hardcoded storage literals' + (lits.length ? ' — found ' + [...new Set(lits)].join(', ') : ''));

    // 2. the namespace ships unconfigured
    ok(/CHANGEME/.test(code), f + ': ships an unconfigured CHANGEME namespace');

    // 3. and says so, visibly, at runtime
    const w = await boot(f);
    const alert = w.document.querySelector('[role="alert"]');
    ok(!!alert, f + ': renders a visible banner while unconfigured');
    if (alert) ok(/not configured/i.test(alert.textContent), f + ': the banner says what to set');
  }

  console.log('\nscanned ' + FILES.length + ' Starter Kit template(s)');
  if (fail) { console.log('FAIL ' + fail + ' assertion(s)'); process.exit(1); }
  console.log('PASS  the kit is single-sourced and cannot silently borrow another deployment\'s storage');
})();
