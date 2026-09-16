import { ICONS } from './icons.js';
import { generateRUFScramble } from './random-RUF.js';
import { generateRUScramble } from './random-RU.js';
import { fillSidebar, caseId } from './sidebar.js';
import { loadSelection, saveSelection } from './selection.js';
import { generateEPScramble, EPSidebar } from './EP.js';

// ─── Mode registry ──────────────────────────────────────────────────────────
// `sidebar` is optional. When present it returns a config for fillSidebar, the
// menu button appears, and `generate` receives the selected case ids.

const MODES = {
    RUF:   { label: 'R U F', icon: ICONS.puzzle, generate: generateRUFScramble },
    RU:    { label: 'R U',   icon: ICONS.puzzle, generate: generateRUScramble },
    EP: { label: 'EP', icon: ICONS.puzzle, generate: generateEPScramble, sidebar: EPSidebar },
};

const startDelay = 200;

// ─── DOM refs ───────────────────────────────────────────────────────────────

const modeSelectEl    = document.getElementById('mode-select');
const scrambleTextEl  = document.getElementById('scramble-text');
const newScrambleBtn  = document.getElementById('new-scramble-btn');
const dialEl          = document.getElementById('dial');
const timerDisplayEl  = document.getElementById('timer-display');
const sidebarEl       = document.getElementById('sidebar');
const menuBtnEl       = document.getElementById('menu-btn');

newScrambleBtn.innerHTML = ICONS.refresh;
menuBtnEl.innerHTML = ICONS.menu;
dialEl.style.setProperty('--charge-ms', `${startDelay}ms`);

// ─── State ──────────────────────────────────────────────────────────────────

let mode          = 'RUF';
let scramble      = '';
let phase         = 'idle'; // idle | holding | ready | running
let timerStart    = null;
let intervalId    = null;
let holdTimeout   = null;

const sidebarConfigs = {}; // mode -> config object (or null), built once
const selections     = {}; // mode -> Set of selected case ids

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

function renderMenuButton() {
    menuBtnEl.classList.toggle('hidden', !sidebarConfig(mode));
}

// ─── Case selection ─────────────────────────────────────────────────────────

function sidebarConfig(m) {
    if (!(m in sidebarConfigs)) {
        sidebarConfigs[m] = typeof MODES[m].sidebar === 'function' ? MODES[m].sidebar() : null;
    }
    return sidebarConfigs[m];
}

function selectionFor(m) {
    const cfg = sidebarConfig(m);
    if (!cfg) return null;
    if (!selections[m]) {
        selections[m] = loadSelection(m, (cfg.cases ?? []).map(caseId));
    }
    return selections[m];
}

function openSidebar() {
    const cfg = sidebarConfig(mode);
    if (!cfg) return;

    fillSidebar(sidebarEl, {
        ...cfg,
        selected: selectionFor(mode),
        onChange: (selected) => saveSelection(mode, selected),
        onCollapse: closeSidebar,
    });

    sidebarEl.inert = false;
    sidebarEl.classList.add('open');
    document.body.classList.add('sidebar-open');
}

function closeSidebar() {
    if (!sidebarEl.classList.contains('open')) return;

    // A focused descendant can't be made inert; move focus out first.
    if (sidebarEl.contains(document.activeElement)) {
        document.activeElement.blur();
    }

    sidebarEl.classList.remove('open');
    sidebarEl.inert = true;

    let revealed = false;
    const reveal = () => {
        if (revealed) return;
        revealed = true;
        sidebarEl.removeEventListener('transitionend', onEnd);
        document.body.classList.remove('sidebar-open');
    };
    const onEnd = (e) => { if (e.target === sidebarEl) reveal(); };

    sidebarEl.addEventListener('transitionend', onEnd);
    setTimeout(reveal, 350); // fallback if transitions are disabled/reduced-motion
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
    closeSidebar();
    renderModeButtons();
    renderMenuButton();
    newScramble();
}

export function newScramble() {
    const selected = selectionFor(mode);
    scramble = selected ? MODES[mode].generate([...selected], scramble) : MODES[mode].generate(scramble);
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

// Typing in the sidebar's search field must not drive the timer.
const isTextInput = (el) => !!el?.closest?.('input, textarea, select, [contenteditable]');

window.addEventListener('keydown', (e) => {
    if (e.repeat || isTextInput(e.target)) return;

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
    if (e.code !== 'Space' || isTextInput(e.target)) return;
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
menuBtnEl.addEventListener('click', openSidebar);

// ─── Init ───────────────────────────────────────────────────────────────────

renderModeButtons();
renderMenuButton();
newScramble();
timerDisplayEl.textContent = '0.00';
