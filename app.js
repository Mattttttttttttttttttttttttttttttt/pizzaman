import { ICONS } from './icons.js';
import { generateRUFScramble } from './random-RUF.js';
import { generateRUScramble } from './random-RU.js';

// ─── Mode registry ──────────────────────────────────────────────────────────

const MODES = {
    RUF:  { label: 'R U F', icon: ICONS.puzzle, generate: generateRUFScramble },
    RU: { label: 'R U',   icon: ICONS.puzzle, generate: generateRUScramble },
};

const startDelay = 200;

// ─── DOM refs ───────────────────────────────────────────────────────────────

const modeSelectEl    = document.getElementById('mode-select');
const scrambleTextEl  = document.getElementById('scramble-text');
const newScrambleBtn  = document.getElementById('new-scramble-btn');
const dialEl          = document.getElementById('dial');
const timerDisplayEl  = document.getElementById('timer-display');

newScrambleBtn.innerHTML = ICONS.refresh;
dialEl.style.setProperty('--charge-ms', `${startDelay}ms`);

// ─── State ──────────────────────────────────────────────────────────────────

let mode          = 'RUF';
let scramble      = '';
let phase         = 'idle'; // idle | holding | ready | running
let timerStart    = null;
let intervalId    = null;
let holdTimeout   = null;

// ─── Rendering ──────────────────────────────────────────────────────────────

function formatTime(ms) {
    const s  = Math.floor(ms / 1000);
    const cs = Math.floor((ms % 1000) / 10);
    return `${s}.${cs.toString().padStart(2, '0')}`;
}

function renderModeButtons() {
    modeSelectEl.innerHTML = '';
    for (const [key, def] of Object.entries(MODES)) {
        const btn = document.createElement('button');
        btn.className = 'mode-btn' + (key === mode ? ' active' : '');
        btn.setAttribute('role', 'tab');
        btn.setAttribute('aria-selected', key === mode ? 'true' : 'false');
        btn.innerHTML = `${def.icon}<span>${def.label}</span>`;
        btn.addEventListener('click', () => setMode(key));
        modeSelectEl.appendChild(btn);
    }
}

function renderScramble() {
    scrambleTextEl.textContent = scramble;
}

function setDialPhase(next) {
    phase = next;
    dialEl.classList.remove('holding', 'charging', 'ready', 'running');
    if (next === 'holding') dialEl.classList.add('charging');
    if (next === 'ready')   dialEl.classList.add('charging', 'ready');
    if (next === 'running') dialEl.classList.add('running');
}

// ─── Mode switching ─────────────────────────────────────────────────────────

function setMode(newMode) {
    if (newMode === mode) return;
    mode = newMode;
    renderModeButtons();
    newScramble();
}

function newScramble() {
    scramble = MODES[mode].generate();
    renderScramble();
}

// ─── Timer state machine ────────────────────────────────────────────────────
// idle --(hold)--> holding --(HOLD_MS elapses)--> ready --(release)--> running --(tap)--> idle

function beginHold() {
    if (phase === 'running') {
        stopTimer();
        return;
    }
    if (phase !== 'idle') return;

    setDialPhase('holding');
    holdTimeout = setTimeout(() => setDialPhase('ready'), startDelay);
}

function endHold() {
    if (phase === 'ready') {
        startTimer();
    } else if (phase === 'holding') {
        clearTimeout(holdTimeout);
        setDialPhase('idle');
    }
}

function startTimer() {
    setDialPhase('running');
    timerStart = performance.now();
    intervalId = setInterval(() => {
        timerDisplayEl.textContent = formatTime(performance.now() - timerStart);
    }, 10);
}

function stopTimer() {
    clearInterval(intervalId);
    const elapsed = performance.now() - timerStart;
    timerDisplayEl.textContent = formatTime(elapsed);
    setDialPhase('idle');
    newScramble();
}

// ─── Input handling ─────────────────────────────────────────────────────────

window.addEventListener('keydown', (e) => {
    if (e.repeat) return;

    if (phase === 'running') {
        e.preventDefault();
        stopTimer();
        return;
    }

    if (e.code !== 'Space') return;
    e.preventDefault();
    beginHold();
});

window.addEventListener('keyup', (e) => {
    if (e.code !== 'Space') return;
    e.preventDefault();
    endHold();
});

dialEl.addEventListener('pointerdown', (e) => {
    e.preventDefault();
    beginHold();
});

window.addEventListener('pointerup', () => {
    endHold();
});

newScrambleBtn.addEventListener('click', newScramble);

// ─── Init ───────────────────────────────────────────────────────────────────

renderModeButtons();
newScramble();
timerDisplayEl.textContent = '0.00';
