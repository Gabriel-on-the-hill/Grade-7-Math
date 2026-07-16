/* Grade 7 Hub — behavioral verification suite (PROJECT_STANDARD §7.4)
 * Run:  npm install jsdom   then   node tests/behavioral_test_suite.js <folder-with-html-files>
 * Covers: gate, sign-in → PIN → app, device binding, teacher modal + dashboard,
 * module wrong→retry→correct, struggle logging, exam first-attempt-only,
 * fraction equivalence + simplify nudge, locked steps, persistence, settings gate.
 * 85 assertions (incl. v1.4.2 anti-cheat, the v1.4.3 section report card, and the MR-1
 * spaced-review due-for-review ladder). Exit code 0 = all pass.
 */
const {JSDOM}=require('jsdom');const fs=require('fs');const path=require('path');
const DIR=(process.argv[2]||'.').replace(/\/?$/,'/');
let pass=0,fail=0;const ok=(c,m)=>{c?pass++:(fail++,console.log('  FAIL:',m));};
function load(file,seed,rnd){
  const html=fs.readFileSync(path.join(DIR,file),'utf8');
  const dom=new JSDOM(html,{runScripts:'dangerously',url:'https://x.test/'+file,
    beforeParse(w){const store=Object.assign({'g7.gate':'ok'},seed||{});
      w.localStorage.clear();Object.keys(store).forEach(k=>w.localStorage.setItem(k,store[k]));
      if(rnd)w.Math.random=rnd;
      w.matchMedia=w.matchMedia||(()=>({matches:false,addListener(){},removeListener(){}}));
      w.fetch=()=>Promise.resolve();w.confirm=()=>true;w.scrollTo=()=>{};}});
  dom.window.dispatchEvent(new dom.window.Event('load'));return dom;
}
// ---- HUB: cold boot -> seeded roster -> PIN create -> app ----
(function(){
  const dom=load('Grade_7_Math_Hub.html');const d=dom.window.document;
  ok(!d.getElementById('g7gate'),'hub: gate removed when g7.gate=ok');
  ok(!d.getElementById('view-signin').classList.contains('hidden'),'hub: sign-in visible on cold boot');
  const tile=d.querySelector('.name-tile');ok(tile&&tile.textContent.includes('Fareedah'),'hub: seeded roster tile Fareedah');
  tile.click();
  ok(!d.getElementById('pinModal').classList.contains('hidden'),'hub: PIN modal opens');
  ok(d.getElementById('pin-go').textContent.includes('Set PIN'),'hub: create-PIN mode first time');
  d.getElementById('pin1').value='1234';d.getElementById('pin2').value='1234';d.getElementById('pin-go').click();
  ok(!d.getElementById('view-app').classList.contains('hidden'),'hub: app view after PIN create');
  ok(d.getElementById('greeting').textContent.includes('Fareedah'),'hub: greeting has name');
  ok(dom.window.localStorage.getItem('g7.device')==='Fareedah','hub: device bound');
  ok(d.getElementById('greeting-sub').textContent.includes('DC CAPE'),'hub: CAPE exam seed applied for Fareedah');
})();
// ---- HUB: wrong PIN rejected; device binding shows one tile ----
(function(){
  const dom=load('Grade_7_Math_Hub.html',{'g7.roster':'["Fareedah","Ada"]','g7.seedv':'["Fareedah"]','g7.pins':'{"Fareedah":"1234"}','g7.device':'Fareedah'});
  const d=dom.window.document;
  ok(d.querySelectorAll('.name-tile').length===1,'hub: device binding shows only bound student');
  ok(d.getElementById('show-all-names'),'hub: show-all link present');
  d.getElementById('show-all-names').click();
  ok(d.querySelectorAll('.name-tile').length===2,'hub: show-all reveals roster');
  d.querySelector('.name-tile').click();
  d.getElementById('pin1').value='9999';d.getElementById('pin-go').click();
  ok(d.getElementById('pin-err').textContent.includes('Incorrect'),'hub: wrong PIN rejected');
  d.getElementById('pin1').value='1234';d.getElementById('pin-go').click();
  ok(!d.getElementById('view-app').classList.contains('hidden'),'hub: right PIN signs in');
})();
// ---- HUB: teacher modal via seeded pass; dashboard renders ----
(function(){
  const dom=load('Grade_7_Math_Hub.html');const d=dom.window.document;
  d.getElementById('tb-teacher').click();
  ok(!d.getElementById('teacherModal').classList.contains('hidden'),'hub: teacher modal opens');
  ok(d.getElementById('tm-title').textContent==='Teacher access','hub: enter mode (seeded pass)');
  d.getElementById('tm-pass').value='wrong';d.getElementById('tm-go').click();
  ok(d.getElementById('tm-err').textContent.includes('Incorrect'),'hub: wrong teacher pass rejected');
  d.getElementById('tm-pass').value='  gAbE ';d.getElementById('tm-go').click();
  ok(!d.getElementById('view-teacher').classList.contains('hidden'),'hub: dashboard opens (case-insens+trim)');
  ok(d.getElementById('dash').innerHTML.includes('Fareedah'),'hub: dashboard shows student');
})();
// ---- HUB: settings gear requires teacher passcode (v1.4.1) ----
(function(){
  const dom=load('Grade_7_Math_Hub.html');const d=dom.window.document;
  d.getElementById('tb-settings').click();
  ok(d.getElementById('settingsModal').classList.contains('hidden'),'gate: settings NOT opened directly');
  ok(!d.getElementById('teacherModal').classList.contains('hidden'),'gate: teacher modal opened instead');
  ok(d.getElementById('tm-sub').textContent.includes('Settings'),'gate: modal labelled for Settings');
  ok(d.getElementById('tm-go').textContent==='Open Settings','gate: button labelled Open Settings');
  d.getElementById('tm-pass').value='wrong';d.getElementById('tm-go').click();
  ok(d.getElementById('settingsModal').classList.contains('hidden'),'gate: wrong pass keeps settings closed');
  d.getElementById('tm-pass').value='Gabe';d.getElementById('tm-go').click();
  ok(!d.getElementById('settingsModal').classList.contains('hidden'),'gate: right pass opens settings');
  ok(d.getElementById('view-teacher').classList.contains('hidden'),'gate: dashboard NOT opened by settings flow');
  d.dispatchEvent(new dom.window.KeyboardEvent('keydown',{key:'Escape',bubbles:true}));
  ok(d.getElementById('settingsModal').classList.contains('hidden'),'a11y: Escape closes settings');
})();
// ---- HUB: teacher flow still goes to dashboard ----
(function(){
  const dom=load('Grade_7_Math_Hub.html');const d=dom.window.document;
  d.getElementById('tb-teacher').click();
  ok(d.getElementById('tm-go').textContent==='Open dashboard','gate: teacher flow unchanged');
  d.getElementById('tm-pass').value='Gabe';d.getElementById('tm-go').click();
  ok(!d.getElementById('view-teacher').classList.contains('hidden'),'gate: dashboard opens for teacher flow');
})();
// ---- MODULE: wrong -> retry -> correct; persistence; exam first-attempt ----
(function(){
  const seed={'g7.current':'Fareedah','g7.roster':'["Fareedah"]'};
  const dom=load('Number_System_Connections.html',seed);const d=dom.window.document;const w=dom.window;
  ok(!d.getElementById('g7gate'),'mod: gate removed');
  ok(d.getElementById('g7name').textContent==='Fareedah','mod: student name shown');
  const card=d.querySelector('.qcard[data-qid="2-2"]');const step=card.querySelector('.step');
  const inp=step.querySelector('.ans-input');const btn=step.querySelector('.check-btn');
  inp.value='99';btn.click();
  ok(inp.classList.contains('wrong'),'mod: wrong answer marked wrong');
  let data=JSON.parse(w.localStorage.getItem('g7.data'));
  let topic=data.students.Fareedah.topics['number-system'];
  ok(topic.struggles.length===1&&topic.struggles[0].your==='99','mod: struggle logged with typed value');
  inp.value='8';btn.click();
  ok(inp.classList.contains('correct')&&step.classList.contains('completed'),'mod: correct completes step');
  data=JSON.parse(w.localStorage.getItem('g7.data'));topic=data.students.Fareedah.topics['number-system'];
  ok(topic.correct===1&&topic.attempts===2,'mod: attempts/correct tallied');
  ok(topic.sectionTotals['2']>0,'mod: sectionTotals written');
  const mcCard=d.querySelector('.qcard[data-qid="3-3"]');const g=mcCard.querySelector('.mc-group');
  const isRight=b=>{const k=b.getAttribute('data-k')||'';const dc=Buffer.from(k.slice(3),'base64').toString();return dc.slice(dc.indexOf('|')+1)==='1';};
  const opts=Array.prototype.slice.call(g.querySelectorAll('.mc-option'));
  const wrongOpt=opts.find(b=>!isRight(b)),rightOpt=opts.find(isRight);
  wrongOpt.click();
  ok(wrongOpt.classList.contains('wrong')&&wrongOpt.classList.contains('disabled'),'mod: MC wrong eliminated');
  ok(rightOpt.classList.contains('cooldown'),'mod: MC cooldown applied');
  rightOpt.classList.remove('cooldown');
  rightOpt.click();
  ok(g.classList.contains('answered')&&rightOpt.classList.contains('correct'),'mod: MC retry correct');
  const fb=g.parentElement.querySelector('.mc-feedback');
  ok(fb&&fb.textContent.indexOf('Correct')>=0,'mod: MC explanation revealed after answer');
  const ex=d.querySelector('.qcard[data-qid="ex-2a"]');const exStep=ex.querySelector('.step');
  const exInp=exStep.querySelector('.ans-input');const exBtn=exStep.querySelector('.check-btn');
  exInp.value='5';exBtn.click(); exInp.value='-2';exBtn.click();
  data=JSON.parse(w.localStorage.getItem('g7.data'));topic=data.students.Fareedah.topics['number-system'];
  ok(topic.exam.attempts===1&&topic.exam.correct===0,'mod: exam-readiness counts FIRST attempt only');
  const fr=d.querySelector('.qcard[data-qid="5-2"]');const frStep=fr.querySelector('.step');
  const frInp=frStep.querySelector('.ans-input');frInp.value='-2/8';frStep.querySelector('.check-btn').click();
  ok(frInp.classList.contains('correct'),'mod: equivalent fraction accepted');
  ok((frStep.querySelector('.feedback')||{}).textContent.includes('simplify'),'mod: simplify nudge shown');
  const locked=d.querySelector('.step.locked');
  ok(!locked||locked.querySelector('input,button')===null||locked.querySelector('input,button').disabled,'mod: locked step controls disabled');
  const saved={};['g7.gate','g7.current','g7.data','g7.roster'].forEach(k=>saved[k]=w.localStorage.getItem(k));
  const dom2=load('Number_System_Connections.html',saved);const d2=dom2.window.document;
  const step2=d2.querySelector('.qcard[data-qid="2-2"] .step');
  ok(step2.classList.contains('completed'),'mod: progress restored after reload');
  ok(d2.getElementById('op-done').textContent!=='0','mod: overall counter restored');
})();
// ---- HUB reads module data: dashboard skill lines + struggles ----
(function(){
  const data={students:{Fareedah:{topics:{'number-system':{title:'NS',tree:{'2-2':{steps:{0:true}}},totalSteps:107,sectionTotals:{'2':10},lastPracticed:Date.now(),attempts:2,correct:1,skillStats:{'numberline':{attempts:2,misses:1}},struggles:[{qid:'2-2',label:'Q',skill:'numberline',skillLabel:'Number line',your:'99',ts:Date.now()}],exam:{attempts:1,correct:0},responses:[]}}}}};
  const dom=load('Grade_7_Math_Hub.html',{'g7.data':JSON.stringify(data),'g7.teacherPass':'Gabe','g7.passv':'Gabe'});
  const d=dom.window.document;
  d.getElementById('tb-teacher').click();d.getElementById('tm-pass').value='Gabe';d.getElementById('tm-go').click();
  const dash=d.getElementById('dash').innerHTML;
  ok(dash.includes('Number line'),'hub: skill line rendered from module data');
  ok(dash.includes('missed'),'hub: miss counts shown');
  ok(dash.includes('exam-readiness')||dash.includes('Exam'),'hub: exam readiness line');
})();
// ---- v1.4.2 anti-cheat: copy-block on question cards ----
(function(){
  const dom=load('Number_System_Connections.html',{'g7.current':'Fareedah'});const d=dom.window.document;
  const lbl=d.querySelector('.qcard .step-label');
  let e=new dom.window.Event('copy',{bubbles:true,cancelable:true});lbl.dispatchEvent(e);
  ok(e.defaultPrevented,'anticheat: copy from question text blocked');
  const inp=d.querySelector('.qcard input.ans-input');
  e=new dom.window.Event('copy',{bubbles:true,cancelable:true});inp.dispatchEvent(e);
  ok(!e.defaultPrevented,'anticheat: copy from input allowed');
  const cut=new dom.window.Event('cut',{bubbles:true,cancelable:true});lbl.dispatchEvent(cut);
  ok(cut.defaultPrevented,'anticheat: cut from question text blocked');
})();
// ---- v1.4.2 anti-cheat: MC option shuffle (3+ options; pairs untouched) ----
(function(){
  const dom=load('Number_System_Connections.html',{'g7.current':'Fareedah'},()=>0);const d=dom.window.document;
  const g=d.querySelector('.qcard[data-qid="3-3"] .mc-group');
  const txt=Array.prototype.map.call(g.querySelectorAll('.mc-option'),b=>b.textContent.trim());
  ok(txt.length===3,'anticheat: 3-option group intact');
  ok(txt[0].indexOf('0.3 exactly')<0,'anticheat: 3+ option group reordered');
  const p=d.querySelector('.qcard[data-qid="1-2"] .mc-group');
  const pt=Array.prototype.map.call(p.querySelectorAll('.mc-option'),b=>b.textContent.trim());
  ok(pt[0]==='-8'&&pt[1]==='-3','anticheat: 2-option pairs not shuffled');
  const isR=b=>{const k=b.getAttribute('data-k')||'';const dc=Buffer.from(k.slice(3),'base64').toString();return dc.slice(dc.indexOf('|')+1)==='1';};
  const correct=Array.prototype.find.call(g.querySelectorAll('.mc-option'),isR);
  correct.click();
  ok(g.classList.contains('answered')&&correct.classList.contains('correct'),'anticheat: shuffled MC still checks correctly');
})();
// ---- v1.4.2 hint policy: exam capstones carry no hints ----
(function(){
  ['Number_System_Connections.html','Ratios_Proportional_Relationships.html'].forEach(f=>{
    const s=fs.readFileSync(path.join(DIR,f),'utf8');let bad=0;
    const parts=s.split(/(<div class="qcard[^>]*>)/);
    for(let i=1;i<parts.length;i+=2){const body=parts[i+1].split('<script')[0];if(parts[i].indexOf('data-exam')>=0&&body.indexOf('hint-btn')>=0)bad++;}
    ok(bad===0,f+': exam cards hint-free ('+bad+' still hinted)');
  });
})();
// ---- v1.4.3 section report card: renders, reconciles, updates, links ----
(function(){
  const dom=load('Number_System_Connections.html',{'g7.current':'Fareedah'});const d=dom.window.document;
  const box=d.getElementById('sec-report');
  ok(box&&box.innerHTML.includes('Your section scores'),'report: panel renders');
  const vals=Array.prototype.map.call(box.querySelectorAll('.sec-row .val'),v=>v.textContent);
  const totalFromRows=vals.reduce((a,v)=>a+parseInt(v.split('/')[1]),0);
  ok(String(totalFromRows)===d.getElementById('op-total').textContent,'report: row totals equal overall total');
  ok(vals.every(v=>v.trim().startsWith('0/')),'report: all zero on cold start');
  const step=d.querySelector('.qcard[data-qid="2-2"] .step');
  step.querySelector('.ans-input').value='8';step.querySelector('.check-btn').click();
  const after=Array.prototype.map.call(d.querySelectorAll('#sec-report .sec-row .val'),v=>v.textContent);
  ok(after.some(v=>v.trim().startsWith('1/')),'report: updates after completing a step');
  const link=d.querySelector('#sec-report .sec-row a');
  ok(link&&link.getAttribute('href').charAt(0)==='#','report: rows link to their section');
})();
// ---- v1.4.3 hub: student topic cards show section bars ----
(function(){
  const data={students:{Fareedah:{topics:{'number-system':{title:'NS',tree:{'2-2':{steps:{0:true}}},totalSteps:107,sectionTotals:{'1':10,'2':12},lastPracticed:Date.now(),attempts:1,correct:1,skillStats:{},struggles:[],exam:{attempts:0,correct:0},responses:[]}}}}};
  const dom=load('Grade_7_Math_Hub.html',{'g7.data':JSON.stringify(data),'g7.current':'Fareedah'});
  const d=dom.window.document;
  const card=d.querySelector('.tcard.avail[data-id="number-system"]');
  ok(card&&card.innerHTML.includes('secbars'),'hub: student card shows section bars');
  ok(card.innerHTML.includes('Section 1: 0/10'),'hub: bar tooltip has section counts');
})();
// ---- MR-1: spaced review — due-for-review ladder (read-only over g7.data) ----
(function(){
  const DAY=86400000, now=Date.now();
  const R=load('Grade_7_Math_Hub.html').window.__hubReview;
  ok(R&&typeof R.due==='function','review: hub exposes __hubReview API');
  ok(R.rungs.join(',')==='1,3,7,21,42','review: ladder rungs are 1/3/7/21/42 days');
  ok(R.streak({attempts:20,correct:19,skillStats:{}})===4,'review: high accuracy + evidence earns the top rung');
  ok(R.streak({attempts:20,correct:8,skillStats:{}})===0,'review: low accuracy stays on the bottom rung');
  ok(R.streak({attempts:1,correct:1,skillStats:{}})===0,'review: one lucky correct is not a streak (evidence cap)');
  ok(R.streak({attempts:20,correct:19,skillStats:{roots:{attempts:8,misses:4}}})===3,'review: a currently-shaky skill pulls the rung back one');
  ok(R.due({attempts:20,correct:19,skillStats:{},lastPracticed:now-50*DAY}).dueNow===true,'review: aged mastered topic is due (past its 42d rung)');
  ok(R.due({attempts:20,correct:19,skillStats:{},lastPracticed:now-5*DAY}).dueNow===false,'review: just-practiced mastered topic is not due');
  ok(R.due({attempts:0,correct:0,skillStats:{},lastPracticed:0})===null,'review: unstarted topic is never eligible');
  ok(R.due({attempts:3,correct:1,skillStats:{},lastPracticed:now-2*DAY}).dueNow===true,'review: a shaky topic returns fast (1d rung)');
  const topics={a:{attempts:20,correct:19,skillStats:{},lastPracticed:now-50*DAY},   // rung 42d, 8d overdue
                b:{attempts:6,correct:5,skillStats:{},lastPracticed:now-40*DAY},      // rung 7d, 33d overdue
                c:{attempts:10,correct:9,skillStats:{},lastPracticed:now}};           // just practiced
  const list=R.list(topics,['a','b','c'],now);
  ok(list.length===2,'review: only overdue topics are listed (just-practiced excluded)');
  ok(list[0].id==='b'&&list[1].id==='a','review: most-overdue first');
})();
(function(){
  const DAY=86400000, now=Date.now();
  const seed=lp=>({students:{Fareedah:{topics:{'number-system':{title:'NS',tree:{},totalSteps:107,sectionTotals:{},lastPracticed:lp,attempts:20,correct:19,struggles:[],skillStats:{},exam:{attempts:0,correct:0},responses:[]}}}}});
  const store=lp=>({'g7.data':JSON.stringify(seed(lp)),'g7.current':'Fareedah'});
  const d=load('Grade_7_Math_Hub.html',store(now-50*DAY)).window.document;
  const dr=d.getElementById('due-review');
  ok(dr&&dr.querySelectorAll('.review-item').length===1,'review: hub surfaces a due item for an aged mastered topic');
  ok(dr.textContent.includes('Number System Connections'),'review: due item names the topic');
  ok(dr.querySelector('.review-item').getAttribute('data-id')==='number-system','review: due item links into its module');
  const d2=load('Grade_7_Math_Hub.html',store(now)).window.document;
  ok(d2.getElementById('due-review').innerHTML==='','review: nothing surfaced right after practice');
})();
// ---- MR-1 phase-2: stored streak wins over the inferred proxy ----
(function(){
  const DAY=86400000, now=Date.now();
  const R=load('Grade_7_Math_Hub.html').window.__hubReview;
  ok(R.streak({reviewStreak:2,attempts:1,correct:1,skillStats:{}})===2,'review(p2): stored reviewStreak overrides the inferred proxy');
  ok(R.streak({reviewStreak:0,attempts:20,correct:19,skillStats:{}})===0,'review(p2): stored 0 wins even when accuracy is high');
  ok(R.due({reviewStreak:4,attempts:1,correct:1,skillStats:{},lastPracticed:now-50*DAY}).dueNow===true,'review(p2): stored top rung schedules 42d (due at 50d)');
  ok(R.due({reviewStreak:4,attempts:1,correct:1,skillStats:{},lastPracticed:now-10*DAY}).dueNow===false,'review(p2): stored top rung not due at 10d');
})();
// ---- MR-1 phase-2: module engine writes the streak per spaced session ----
(function(){
  const DAY=86400000, now=Date.now(), today=Math.floor(now/DAY);
  const mk=(rs,rd)=>{const t={title:'NS',tree:{},totalSteps:107,sectionTotals:{},lastPracticed:now,attempts:0,correct:0,struggles:[],skillStats:{},exam:{attempts:0,correct:0},responses:[]};if(rs!==undefined)t.reviewStreak=rs;if(rd!==undefined)t.reviewDay=rd;return {students:{Fareedah:{topics:{'number-system':t}}}};};
  const rec=w=>JSON.parse(w.localStorage.getItem('g7.data')).students.Fareedah.topics['number-system'];
  let w=load('Number_System_Connections.html',{'g7.current':'Fareedah','g7.data':JSON.stringify(mk())}).window;
  w.__modReview.review(true,true);w.__modReview.review(true,true);
  ok(rec(w).reviewStreak===undefined,'review(engine): under 3 first-attempts does not commit a session');
  w.__modReview.review(true,true);
  ok(rec(w).reviewStreak===1&&rec(w).reviewDay===today,'review(engine): a clean 3-item session sets streak 1 for today');
  w.__modReview.review(true,true);
  ok(rec(w).reviewStreak===1,'review(engine): more clean items the same visit do not double-advance');
  w=load('Number_System_Connections.html',{'g7.current':'Fareedah','g7.data':JSON.stringify(mk(2,today-1))}).window;
  w.__modReview.review(true,true);w.__modReview.review(true,true);w.__modReview.review(true,true);
  ok(rec(w).reviewStreak===3,'review(engine): a passing return advances the streak one rung (2->3)');
  w=load('Number_System_Connections.html',{'g7.current':'Fareedah','g7.data':JSON.stringify(mk(3,today-1))}).window;
  w.__modReview.review(true,false);w.__modReview.review(true,false);w.__modReview.review(true,true);
  ok(rec(w).reviewStreak===0,'review(engine): a failing return resets the streak to 0');
  w=load('Number_System_Connections.html',{'g7.current':'Fareedah','g7.data':JSON.stringify(mk(3,today))}).window;
  w.__modReview.review(true,true);w.__modReview.review(true,true);w.__modReview.review(true,true);
  ok(rec(w).reviewStreak===3,'review(engine): a second session the same day does not advance the streak');
})();
// ---- AN-4: acquisition vs retention buckets (engine) ----
(function(){
  const DAY=86400000, now=Date.now(), today=Math.floor(now/DAY);
  const fresh={students:{Fareedah:{topics:{'number-system':{title:'NS',tree:{},totalSteps:107,sectionTotals:{},lastPracticed:now,attempts:0,correct:0,struggles:[],skillStats:{},exam:{attempts:0,correct:0},responses:[]}}}}};
  const aged={students:{Fareedah:{topics:{'number-system':{title:'NS',tree:{},totalSteps:107,sectionTotals:{},lastPracticed:now-50*DAY,attempts:20,correct:19,struggles:[],skillStats:{},exam:{attempts:0,correct:0},responses:[],reviewStreak:4,reviewDay:today-50}}}}};
  const rec=w=>JSON.parse(w.localStorage.getItem('g7.data')).students.Fareedah.topics['number-system'];
  let w=load('Number_System_Connections.html',{'g7.current':'Fareedah','g7.data':JSON.stringify(fresh)}).window;
  ok(w.__modReview.wasDue({lastPracticed:now,attempts:0})===false,'AN-4: an unstarted/just-practiced topic is not due (acquisition)');
  w.__modReview.review(true,true);w.__modReview.review(true,false);
  ok(rec(w).acqFirst===2&&rec(w).acqCorrect===1&&rec(w).retFirst===undefined,'AN-4: first-attempts on a not-due topic bucket as acquisition');
  w=load('Number_System_Connections.html',{'g7.current':'Fareedah','g7.data':JSON.stringify(aged)}).window;
  ok(w.__modReview.wasDue({reviewStreak:4,lastPracticed:now-50*DAY,attempts:20})===true,'AN-4: an aged topic past its 42d rung is due (retention)');
  w.__modReview.review(true,true);w.__modReview.review(true,true);
  ok(rec(w).retFirst===2&&rec(w).retCorrect===2&&rec(w).acqFirst===undefined,'AN-4: first-attempts on a due topic bucket as retention');
})();
// ---- AN-4: teacher dashboard shows acquisition vs retention ----
(function(){
  const data={students:{Fareedah:{topics:{'number-system':{title:'Number System Connections',tree:{},totalSteps:107,sectionTotals:{},lastPracticed:Date.now(),attempts:10,correct:8,struggles:[],skillStats:{},exam:{attempts:0,correct:0},responses:[],acqFirst:20,acqCorrect:17,retFirst:10,retCorrect:6}}}}};
  const d=load('Grade_7_Math_Hub.html',{'g7.current':'Fareedah','g7.roster':JSON.stringify(['Fareedah']),'g7.data':JSON.stringify(data)}).window.document;
  d.getElementById('tb-teacher').click();d.getElementById('tm-pass').value='Gabe';d.getElementById('tm-go').click();
  const dash=d.getElementById('dash');
  ok(dash.textContent.includes('Retrieval'),'AN-4: dashboard shows the retrieval readout');
  ok(dash.textContent.includes('first-time')&&dash.textContent.includes('85%'),'AN-4: acquisition accuracy shown (17/20 = 85%)');
  ok(dash.textContent.includes('on review')&&dash.textContent.includes('60%'),'AN-4: retention accuracy shown (6/10 = 60%)');
  ok(!!dash.querySelector('.retain-line b.warn'),'AN-4: retention well below acquisition is flagged for the teacher');
})();
// ---- AS-4: per-skill difficulty calibration on the teacher dashboard ----
(function(){
  const data={students:{Fareedah:{topics:{'number-system':{title:'Number System Connections',tree:{},totalSteps:107,sectionTotals:{},lastPracticed:Date.now(),attempts:30,correct:23,struggles:[],skillStats:{easy1:{attempts:10,misses:0},hard1:{attempts:10,misses:5},sweet1:{attempts:10,misses:2},few:{attempts:2,misses:0}},exam:{attempts:0,correct:0},responses:[]}}}}};
  const d=load('Grade_7_Math_Hub.html',{'g7.current':'Fareedah','g7.roster':JSON.stringify(['Fareedah']),'g7.data':JSON.stringify(data)}).window.document;
  d.getElementById('tb-teacher').click();d.getElementById('tm-pass').value='Gabe';d.getElementById('tm-go').click();
  const dash=d.getElementById('dash');
  ok(dash.querySelectorAll('.cal-chip').length===3,'AS-4: only skills with enough evidence (>=4 attempts) are calibrated');
  ok(dash.querySelector('.cal-chip.easy')&&dash.querySelector('.cal-chip.easy').textContent==='too easy','AS-4: >90% first-attempt flagged too easy (advance)');
  ok(dash.querySelector('.cal-chip.hard')&&dash.querySelector('.cal-chip.hard').textContent==='too hard','AS-4: <70% first-attempt flagged too hard (re-teach)');
  ok(dash.querySelector('.cal-chip.sweet')&&dash.querySelector('.cal-chip.sweet').textContent==='on target','AS-4: ~85% band flagged on target');
})();
// ---- AS-4 (automatic): the lesson's own Learn->Stretch ladder supplies the difficulty level ----
(function(){
  const dom=load('Number_System_Connections.html',{'g7.current':'Fareedah','g7.roster':'["Fareedah"]'});
  const d=dom.window.document,w=dom.window;
  const rec=()=>JSON.parse(w.localStorage.getItem('g7.data')).students.Fareedah.topics['number-system'].levelStats||{};
  const card=d.querySelector('.qcard[data-qid="2-2"]');    // Practice -> level 2 (target)
  const step=card.querySelector('.step');
  step.querySelector('.ans-input').value='99';step.querySelector('.check-btn').click();
  ok(rec()['2']&&rec()['2'].attempts===1&&rec()['2'].misses===1,'AS-4: a Practice item logs to level 2 (target)');
  step.querySelector('.ans-input').value='8';step.querySelector('.check-btn').click();
  ok(rec()['2'].attempts===2&&rec()['2'].misses===1,'AS-4: the retry logs to the same level');
  ok(!rec()['1']&&!rec()['3']&&!rec()['4'],'AS-4: nothing leaks into other levels');
})();
// ---- AS-4: dashboard shows where strength failed; stretch stays out of pass/fail ----
(function(){
  const data={students:{Fareedah:{topics:{'number-system':{title:'Number System Connections',tree:{},totalSteps:107,sectionTotals:{},lastPracticed:Date.now(),attempts:53,correct:38,struggles:[],skillStats:{},exam:{attempts:0,correct:0},responses:[],levelStats:{1:{attempts:20,misses:1},2:{attempts:20,misses:6},3:{attempts:10,misses:6},4:{attempts:3,misses:2}}}}}}};
  const d=load('Grade_7_Math_Hub.html',{'g7.current':'Fareedah','g7.roster':JSON.stringify(['Fareedah']),'g7.data':JSON.stringify(data)}).window.document;
  d.getElementById('tb-teacher').click();d.getElementById('tm-pass').value='Gabe';d.getElementById('tm-go').click();
  const ll=d.querySelector('.level-line');
  ok(ll&&ll.textContent.includes('Foundational 95%'),'AS-4: foundational level reported');
  ok(ll.textContent.includes('Target 70%'),'AS-4: target level reported');
  ok(ll.textContent.includes('Exam 40%'),'AS-4: exam (assessed bar) reported');
  ok(d.querySelector('.lv.low')&&d.querySelector('.lv.low').textContent.includes('Exam'),'AS-4: the level where strength failed is flagged');
  ok(d.querySelector('.lv-focus')&&d.querySelector('.lv-focus').textContent==='Focus: Exam','AS-4: focus point = first curriculum level below the bar');
  ok(!!d.querySelector('.lv.beyond')&&ll.textContent.includes('Stretch (beyond)'),'AS-4: stretch reported separately as beyond the standard');
  ok(!d.querySelector('.lv.beyond.low'),'AS-4: a low stretch score is never flagged as failure');
})();
// ---- SYNC: the connection test tells the truth (it used to claim success unconditionally) ----
(function(){
  const w=load('Grade_7_Math_Hub.html').window;
  const pt=w.__hubPing.text;
  ok(typeof pt==='function','sync: hub exposes the ping status formatter');
  ok(/No response from that URL/.test(pt(null)),'sync: no response is reported as a failure, not "sent"');
  ok(/No response from that URL/.test(pt({ok:false,error:'boom'})),'sync: an error reply is reported as a failure');
  const good=pt({ok:true,sheet:'Study Hubs Cloud',id:'abc',log:42,sync:17});
  ok(/Connected/.test(good),'sync: a live backend reports Connected');
  ok(good.includes('Study Hubs Cloud'),'sync: the test names WHICH sheet it writes to');
  ok(good.includes('42')&&good.includes('17'),'sync: the test reports Log/SyncStore row counts');
})();
// ---- Static regression checks on the fixed content ----
(function(){
  const hub=fs.readFileSync(path.join(DIR,'Grade_7_Math_Hub.html'),'utf8');
  ok(hub.includes("grade7-hub-backup-")&&!hub.includes("grade8-hub-backup-"),'fix: backup filename grade7');
  const ns=fs.readFileSync(path.join(DIR,'Number_System_Connections.html'),'utf8');
  ok(ns.includes('Size of each monthly payment')&&!ns.includes('Monthly change to her balance'),'fix: 7-3 relabelled');
  ok(!ns.includes('-48 ÷ 4'),'fix: 7-3 expression now 48 ÷ 4');
  const rp=fs.readFileSync(path.join(DIR,'Ratios_Proportional_Relationships.html'),'utf8');
  ok(!rp.includes('each)</button>'),'fix: r1-3 giveaway removed');
})();
console.log(`\n${pass} passed, ${fail} failed`);process.exit(fail?1:0);
