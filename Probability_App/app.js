// --- Global Config ---
const VERSION = "1.1"; // Increment this (e.g., to "1.1") to force-reset everyone's progress globally.

const questions = {
    1: [ // Tier 1: The Egg (Simple Events & Sample Spaces) - 12 Questions
        {
            id: 't1_q1',
            text: "The spinner below is divided into 8 equal sections. What is the probability of landing on a 12 or greater?",
            type: 'multiple-choice',
            visual: 'spinner-8',
            options: ["5/8", "1/2", "3/4", "2/8"],
            correct: 2,
            solution: "Numbers >= 12: 12, 14, 17, 18, 20, 22. That is 6 out of 8 sections, which is 6/8 = 3/4."
        },
        {
            id: 't1_q2',
            text: "What is the sample space when rolling two standard dice?",
            type: 'multiple-choice',
            options: ["18", "6", "12", "36"],
            correct: 3,
            solution: "Each die has 6 sides. For two dice, the total outcomes are 6 x 6 = 36."
        },
        {
            id: 't1_q3',
            text: "What is the probability of flipping 4 fair coins 1 time and getting all tails?",
            type: 'multiple-choice',
            options: ["1/4", "1/8", "1/16", "1/32"],
            correct: 2,
            solution: "Each coin has a 1/2 chance of tails. For 4 coins: 1/2 * 1/2 * 1/2 * 1/2 = 1/16."
        },
        {
            id: 't1_q4',
            text: "A number cube with faces numbered 1 to 6 is rolled 15 times. In theory, how many times would you expect to roll a number less than 5?",
            type: 'multiple-choice',
            options: ["2.5", "5", "10", "12.5"],
            correct: 2,
            solution: "Numbers < 5 are 1, 2, 3, 4. P = 4/6 = 2/3. For 15 rolls: (2/3) * 15 = 10."
        },
        {
            id: 't1_q5',
            text: "Based on the sandwich menu, what is the probability of randomly selecting a rye bread with Swiss cheese sandwich?",
            type: 'multiple-choice',
            visual: 'sandwich-table',
            options: ["1/4", "1/3", "1/7", "1/12"],
            correct: 3,
            solution: "4 breads * 3 cheeses = 12 options. One specific combo is 1/12."
        },
        {
            id: 't1_q6',
            text: "A coffee shop offers 2 types of coffee, 3 flavoring, and 2 toppings. How many possible choices are there?",
            type: 'multiple-choice',
            options: ["12 choices", "14 choices", "16 choices", "18 choices"],
            correct: 0,
            solution: "2 * 3 * 2 = 12."
        },
        {
            id: 't1_q7',
            text: "Choose one student from Group 1 (Ava, Antoine, Greg) and one from Group 2 (Mario, Brooke). Which set shows all outcomes?",
            type: 'multiple-choice',
            options: ["Set A (3 pairs)", "Set B (3 pairs)", "Set C (6 pairs)", "Set D (4 pairs)"],
            correct: 2,
            solution: "3 students * 2 students = 6 outcomes. Set C lists all 6."
        },
        {
            id: 't1_q8',
            text: "Choose from 4 jersey colors and 4 pant colors. How many combinations?",
            type: 'multiple-choice',
            options: ["8", "12", "16", "20"],
            correct: 2,
            solution: "4 * 4 = 16."
        },
        {
            id: 't1_q9',
            text: "Joel has 5 Red, 3 Orange, 1 Yellow, and 6 Green mints. P(Orange)?",
            type: 'multiple-choice',
            visual: 'mints-table',
            options: ["1/5", "2/3", "11/15", "4/5"],
            correct: 0,
            solution: "Total = 15. Orange = 3. 3/15 = 1/5."
        },
        {
            id: 't1_q10',
            text: "Max has 50 songs. Based on the graph, what is the P(Rock)?",
            type: 'multiple-choice',
            visual: 'songs-bar',
            options: ["1/2", "1/5", "1/4", "3/50"],
            correct: 0,
            solution: "Total = 50. Rock = 25. 25/50 = 1/2."
        },
        {
            id: 't1_q11',
            text: "A bucket has 7 yellow, 6 green, 3 blue, and 8 red golf balls. P(NOT green)?",
            type: 'multiple-choice',
            options: ["1/4", "1/3", "2/3", "3/4"],
            correct: 3,
            solution: "Total = 7+6+3+8 = 24. Green = 6. Not Green = 24 - 6 = 18. P = 18/24 = 3/4."
        },
        {
            id: 't1_q12',
            text: "63% of students are girls. What is the probability of the complement (NOT selecting a girl)?",
            type: 'multiple-choice',
            options: ["37%", "63%", "27%", "47%"],
            correct: 0,
            solution: "Complement = 100% - 63% = 37%."
        }
    ],
    2: [ // Tier 2: The Hatchling (Predictions & Experimental) - 13 Questions
        {
            id: 't2_q1',
            text: "17/20 voters favored a library. If 75,000 vote, how many likely favor it?",
            type: 'multiple-choice',
            options: ["11,250", "28,500", "63,750", "70,000"],
            correct: 2,
            solution: "17/20 * 75,000 = 63,750."
        },
        {
            id: 't2_q2',
            text: "18/25 voters favored a school. If 50,000 vote, prediction?",
            type: 'multiple-choice',
            options: ["18,000", "36,000", "2,000", "900,000"],
            correct: 1,
            solution: "18/25 * 50,000 = 36,000."
        },
        {
            id: 't2_q3',
            text: "You pick 6 pairs of socks; 4 are white. Best estimate of white socks out of 18 pairs?",
            type: 'multiple-choice',
            options: ["3", "12", "27", "4"],
            correct: 1,
            solution: "4/6 = 2/3. (2/3) * 18 = 12."
        },
        {
            id: 't2_q4',
            text: "Bowl has 240 yellow marbles. Sample of 10 has 4 yellow, 6 green. Total green estimate?",
            type: 'multiple-choice',
            options: ["6", "60", "360", "240"],
            correct: 2,
            solution: "4 yellow : 6 green. 4 units = 240, so 1 unit = 60. 6 * 60 = 360."
        },
        {
            id: 't2_q5',
            text: "Out of 40 selections: 16 Purple, 8 Green, 6 Blue, 9 White, 1 Pink. Expected P(Green)?",
            type: 'multiple-choice',
            options: ["0.125", "0.20", "0.80", "1.0"],
            correct: 1,
            solution: "8/40 = 1/5 = 0.20."
        },
        {
            id: 't2_q6',
            text: "30 holes: Score 2(4), Score 3(14), Score 4(9), Score 5(3). P(2 or 3 next)?",
            type: 'multiple-choice',
            options: ["7/9", "3/5", "3/10", "9/50"],
            correct: 1,
            solution: "(4+14)/30 = 18/30 = 3/5."
        },
        {
            id: 't2_q7',
            text: "100 tosses: 40 Heads, 60 Tails. Experimental P(Tails)?",
            type: 'multiple-choice',
            options: ["1/5", "2/3", "3/5", "4/5"],
            correct: 2,
            solution: "60/100 = 3/5."
        },
        {
            id: 't2_q8',
            text: "Flowers/Plants at 28%. Out of 400 mothers, how many get flowers?",
            type: 'multiple-choice',
            options: ["28", "100", "112", "200"],
            correct: 2,
            solution: "0.28 * 400 = 112."
        },
        {
            id: 't2_q9',
            text: "John got (Blue, 6) 4 times in a row. Spencer says P(Blue, 6) is between 0 and 1/6. Correct?",
            type: 'multiple-choice',
            options: ["Yes, Spencer", "No, Glenn", "No, Morgan", "None"],
            correct: 0,
            solution: "P(B, 6) = 1/4 * 1/6 = 1/24. 1/24 ≈ 0.04, which is in the range."
        },
        {
            id: 't2_q10',
            text: "70 zoo guests: 21 like Monkeys. Predict for 540 people.",
            type: 'multiple-choice',
            visual: 'zoo-table',
            options: ["162", "180", "150", "210"],
            correct: 0,
            solution: "21/70 * 540 = 162."
        },
        {
            id: 't2_q11',
            text: "70 guests: 13 like Penguins. Predict for 720 people.",
            type: 'multiple-choice',
            options: ["134", "130", "140", "150"],
            correct: 0,
            solution: "13/70 * 720 ≈ 134."
        },
        {
            id: 't2_q12',
            text: "50 customers: 11 bought banana. Predict for 100 customers.",
            type: 'multiple-choice',
            options: ["11", "22", "33", "44"],
            correct: 1,
            solution: "11/50 * 100 = 22."
        },
        {
            id: 't2_q13',
            text: "Experimental P(H) = 7/12. Tails appeared 30 times. Total tosses?",
            type: 'multiple-choice',
            options: ["72", "42", "60", "84"],
            correct: 0,
            solution: "P(T) = 5/12. (5/12) * X = 30 -> X = 72."
        }
    ],
    3: [ // Tier 3: The Beast (Compound Events) - 11 Questions
        {
            id: 't3_q1',
            text: "Spinner 1 (1-5), Spinner 2 (Blue, etc). P(Odd AND Blue)?",
            type: 'multiple-choice',
            visual: 'double-spinner-5',
            options: ["3/5", "2/5", "3/10", "3/25"],
            correct: 3,
            solution: "3/5 * 1/5 = 3/25."
        },
        {
            id: 't3_q2',
            text: "Spinner 1 (6 letters), Spinner 2 (1-6). P(R/S AND Even)?",
            type: 'multiple-choice',
            visual: 'double-spinner-6',
            options: ["1/6", "5/36", "1/3", "5/12"],
            correct: 0,
            solution: "2/6 * 3/6 = 1/6."
        },
        {
            id: 't3_q3',
            text: "2 cubes (faces 7-12). P(rolling 7 or 8 on BOTH)?",
            type: 'multiple-choice',
            options: ["1/36", "1/9", "1/6", "2/3"],
            correct: 1,
            solution: "2/6 * 2/6 = 1/9."
        },
        {
            id: 't3_q4',
            text: "Probability of flipping 6 fair coins and getting all heads?",
            type: 'multiple-choice',
            options: ["1/64", "1/36", "1/12", "1/6"],
            correct: 0,
            solution: "(1/2)^6 = 1/64."
        },
        {
            id: 't3_q5',
            text: "1/4 socks are blue. How many picks to get 4 blue on average?",
            type: 'multiple-choice',
            options: ["16", "20", "4", "8"],
            correct: 0,
            solution: "4 / (1/4) = 16."
        },
        {
            id: 't3_q6',
            text: "Roll cube twice. P(first is 5 and second is 4)?",
            type: 'multiple-choice',
            options: ["1/36", "1/30", "1/6", "1/3"],
            correct: 0,
            solution: "1/6 * 1/6 = 1/36."
        },
        {
            id: 't3_q7',
            text: "P(select D letter card AND green color card)? 8 letters, 5 colors.",
            type: 'multiple-choice',
            options: ["1/40", "1/13", "1/8", "1/5"],
            correct: 0,
            solution: "1/8 * 1/5 = 1/40."
        },
        {
            id: 't3_q8',
            text: "Flip coin and roll cube. P(Heads AND > 4)?",
            type: 'multiple-choice',
            options: ["1/12", "1/6", "1/3", "1/2"],
            correct: 1,
            solution: "1/2 * 2/6 = 1/6."
        },
        {
            id: 't3_q9',
            text: "Cube, Coin, Card A/B. P(Even AND Heads)?",
            type: 'multiple-choice',
            options: ["1/4", "1/12", "1/6", "1/2"],
            correct: 0,
            solution: "3/6 * 1/2 = 1/4."
        },
        {
            id: 't3_q10',
            text: "Alana tosses 2 cubes. P(Double Sixes)?",
            type: 'multiple-choice',
            options: ["1/36", "1/12", "1/6", "1/2"],
            correct: 0,
            solution: "1/6 * 1/6 = 1/36."
        },
        {
            id: 't3_q11',
            text: "4 jerseys, 4 pants. P(Yellow jersey with Green pants)?",
            type: 'multiple-choice',
            options: ["1/16", "1/4", "1/8", "1/2"],
            correct: 0,
            solution: "1/4 * 1/4 = 1/16."
        }
    ]
};

// --- Game State ---
let state = {
    currentTier: 1,
    currentQuestionIdx: 0,
    scores: { 1: 0, 2: 0, 3: 0 },
    tierLocked: { 1: false, 2: false, 3: false },
    userAnswers: [],
    xp: 0
};

// --- SVGs & Visuals ---
const visuals = {
    'spinner-8': `<svg viewBox="0 0 100 100" width="180"><circle cx="50" cy="50" r="45" fill="#f8f9fa" stroke="#333" stroke-width="2"/><g stroke="#333"><line x1="50" y1="5" x2="50" y2="95"/><line x1="5" y1="50" x2="95" y2="50"/><line x1="18.18" y1="18.18" x2="81.82" y2="81.82"/><line x1="81.82" y1="18.18" x2="18.18" y2="81.82"/></g><text x="50" y="22" text-anchor="middle" font-size="8">17</text><text x="70" y="32" text-anchor="middle" font-size="8">9</text><text x="78" y="52" text-anchor="middle" font-size="8">14</text><text x="70" y="74" text-anchor="middle" font-size="8">22</text><text x="50" y="82" text-anchor="middle" font-size="8">18</text><text x="30" y="74" text-anchor="middle" font-size="8">20</text><text x="22" y="52" text-anchor="middle" font-size="8">10</text><text x="30" y="32" text-anchor="middle" font-size="8">12</text><circle cx="50" cy="50" r="3" fill="#333"/></svg>`,
    'double-spinner-5': `<div style="display:flex;gap:10px"><div class="spin-box"><p>S1(1-5)</p><svg viewBox="0 0 100 100" width="80"><circle cx="50" cy="50" r="45" fill="#fff" stroke="#333"/><text x="50" y="55" text-anchor="middle" font-size="10">Odd?</text></svg></div><div class="spin-box"><p>S2(Colors)</p><svg viewBox="0 0 100 100" width="80"><circle cx="50" cy="50" r="45" fill="#fff" stroke="#333"/><text x="50" y="55" text-anchor="middle" font-size="10">Blue?</text></svg></div></div>`,
    'double-spinner-6': `<div style="display:flex;gap:10px"><div class="spin-box"><p>S1(Letters)</p><svg viewBox="0 0 100 100" width="80"><circle cx="50" cy="50" r="45" fill="#fff" stroke="#333"/><text x="50" y="55" text-anchor="middle" font-size="10">R/S?</text></svg></div><div class="spin-box"><p>S2(1-6)</p><svg viewBox="0 0 100 100" width="80"><circle cx="50" cy="50" r="45" fill="#fff" stroke="#333"/><text x="50" y="55" text-anchor="middle" font-size="10">Even?</text></svg></div></div>`,
    'sandwich-table': `<table><tr><th>Bread</th><td>Wheat, White, Whole, Rye</td></tr><tr><th>Cheese</th><td>American, Swiss, Cheddar</td></tr></table>`,
    'mints-table': `<table><tr><th>R</th><th>O</th><th>Y</th><th>G</th></tr><tr><td>5</td><td>3</td><td>1</td><td>6</td></tr></table>`,
    'songs-bar': `<svg viewBox="0 0 100 60" width="180"><rect x="10" y="40" width="10" height="20" fill="blue"/><rect x="30" y="10" width="10" height="50" fill="red"/><rect x="50" y="35" width="10" height="25" fill="yellow"/><rect x="70" y="55" width="10" height="5" fill="green"/><text x="35" y="8" font-size="6">Rock: 25/50</text></svg>`,
    'zoo-table': `<table><tr><th>Monkey</th><td>21/70</td></tr><tr><th>Penguin</th><td>13/70</td></tr></table>`
};

// --- UI Logic ---
function init() {
    checkGlobalReset();
    loadState();
    renderMenu();
    updateUI();
}

function checkGlobalReset() {
    const savedVersion = localStorage.getItem('probability_app_version');
    if (savedVersion !== VERSION) {
        localStorage.removeItem('prob_quest_state');
        localStorage.setItem('probability_app_version', VERSION);
    }
}

function updateUI() {
    const xpFill = document.getElementById('xp-bar');
    if (xpFill) xpFill.style.width = `${state.xp}%`;
    const monsters = ['monster_egg.png', 'baby_monster.png', 'teen_monster.png', 'epic_monster_final.png'];
    const labels = ['Egg', 'Hatchling', 'Adolescent', 'Epic Dragon'];

    let stage = 0;
    if (state.tierLocked[1]) stage = 1;
    if (state.tierLocked[2]) stage = 2;
    if (state.tierLocked[3]) stage = 3;

    const mImg = document.getElementById('current-monster-img');
    const mLab = document.getElementById('evolution-label');
    if (mImg) mImg.src = `assets/${monsters[stage]}`;
    if (mLab) mLab.textContent = `${labels[stage]} Stage`;
}

function renderMenu() {
    for (let t = 1; t <= 3; t++) {
        const btn = document.getElementById(`tier-${t}-btn`);
        const status = document.getElementById(`tier-${t}-status`);
        if (!btn) continue;

        if (t > 1 && !state.tierLocked[t - 1]) {
            btn.classList.add('locked');
            btn.disabled = true;
            status.textContent = "Locked";
        } else {
            btn.classList.remove('locked');
            btn.disabled = false;
            status.textContent = state.tierLocked[t] ? "Completed ✅" : "Start Quest!";
        }

        btn.onclick = () => {
            if (state.tierLocked[t]) showTierResults(t);
            else startTier(t);
        };
    }
}

function startTier(tier) {
    state.currentTier = tier;
    state.currentQuestionIdx = 0;
    state.userAnswers = [];
    showScreen('question-screen');
    loadQuestion();
}

function loadQuestion() {
    const qList = questions[state.currentTier];
    const q = qList[state.currentQuestionIdx];

    document.getElementById('question-index').textContent = `Q ${state.currentQuestionIdx + 1}/${qList.length}`;
    document.getElementById('question-text').textContent = q.text;

    const vBox = document.getElementById('question-visuals');
    vBox.innerHTML = visuals[q.visual] || "";
    vBox.classList.toggle('hidden', !q.visual);

    const optCont = document.getElementById('options-container');
    optCont.innerHTML = "";
    q.options.forEach((opt, idx) => {
        const b = document.createElement('button');
        b.className = 'option-btn';
        b.textContent = opt;
        b.onclick = () => selectOption(idx);
        optCont.appendChild(b);
    });
    document.getElementById('feedback-area').classList.add('hidden');
    document.getElementById('next-question-btn').classList.add('hidden');
}

function selectOption(idx) {
    const q = questions[state.currentTier][state.currentQuestionIdx];
    const btns = document.querySelectorAll('.option-btn');
    btns.forEach(b => b.disabled = true);

    const correct = idx === q.correct;
    btns[idx].classList.add(correct ? 'correct' : 'wrong');
    if (!correct) btns[q.correct].classList.add('correct');

    state.userAnswers.push({ text: q.text, correct: correct, sol: q.solution, yours: q.options[idx], theirs: q.options[q.correct] });

    const fb = document.getElementById('feedback-area');
    fb.className = `feedback-box ${correct ? 'correct' : 'wrong'}`;
    document.getElementById('feedback-message').textContent = correct ? "Great Job! Correct!" : "Oops! See the solution later.";
    fb.classList.remove('hidden');
    document.getElementById('next-question-btn').classList.remove('hidden');
}

document.getElementById('next-question-btn').onclick = () => {
    state.currentQuestionIdx++;
    if (state.currentQuestionIdx < questions[state.currentTier].length) loadQuestion();
    else completeTier();
};

function completeTier() {
    const score = state.userAnswers.filter(a => a.correct).length;
    state.scores[state.currentTier] = score;
    state.tierLocked[state.currentTier] = true;
    state.xp = Math.min(100, state.xp + 34);
    saveState();
    showTierResults(state.currentTier);
}

function showTierResults(tier) {
    showScreen('result-screen');
    const score = state.scores[tier];
    const total = questions[tier].length;
    document.getElementById('final-score').textContent = `${score}/${total}`;

    const monImgs = ['monster_egg.png', 'baby_monster.png', 'teen_monster.png', 'epic_monster_final.png'];
    document.getElementById('evo-monster-img').src = `assets/${monImgs[tier]}`;

    const solList = document.getElementById('solutions-list');
    solList.innerHTML = "<h3>Review Your Answers</h3>";
    state.userAnswers.forEach(ans => {
        const d = document.createElement('div');
        d.className = "solution-card";
        d.innerHTML = `<p><b>Q:</b> ${ans.text}</p><p><b>Result:</b> ${ans.correct ? '✅' : '❌'}</p><p><b>Explanation:</b> ${ans.sol}</p><hr>`;
        solList.appendChild(d);
    });

    const summary = `Tier ${tier} Completed! Score: ${score}/${total}.`;
    document.getElementById('submission-text').textContent = summary;
    document.getElementById('copy-summary-btn').onclick = () => {
        navigator.clipboard.writeText(summary);
        alert("Copied to clipboard!");
    };
    updateUI();
}

function showScreen(id) {
    document.querySelectorAll('section').forEach(s => s.classList.remove('active'));
    document.getElementById(id).classList.add('active');
}

function saveState() { localStorage.setItem('prob_quest_state', JSON.stringify(state)); }
function loadState() {
    const s = localStorage.getItem('prob_quest_state');
    if (s) state = JSON.parse(s);
}

document.getElementById('back-to-menu').onclick = () => showScreen('menu-screen');
document.getElementById('finish-tier-btn').onclick = () => { renderMenu(); showScreen('menu-screen'); };

// Teacher Reset Logic: Add ?reset=true to the end of the URL in your browser to clear all progress.
if (window.location.search.includes('reset=true')) {
    localStorage.removeItem('prob_quest_state');
    window.location.href = window.location.pathname;
}

init();
