import { ICONS } from './icons.js';

const startDelay = 200;
const MAX_TARGET_ATTEMPTS = 250;
const MOVE_NAME_TO_INDEX = Object.fromEntries(ftosolver.move2str.map((name, index) => [name, index]));

const scrambleTextEl = document.getElementById('scramble-text');
const newScrambleBtn = document.getElementById('new-scramble-btn');
const dialEl = document.getElementById('dial');
const timerDisplayEl = document.getElementById('timer-display');

newScrambleBtn.innerHTML = ICONS.refresh;
dialEl.style.setProperty('--charge-ms', `${startDelay}ms`);

let phase = 'idle';
let timerStart = null;
let intervalId = null;
let holdTimeout = null;
let generating = false;

const SOLVED = new ftosolver.FtoCubie();
const RU_MOVES = [0, 12]; // cstimer move indices: U, R
const AFFECTED = findAffectedPieces();

document.getElementById('cp-indices').textContent = list(AFFECTED.cp);
document.getElementById('ep-indices').textContent = list(AFFECTED.ep);
document.getElementById('uf-indices').textContent = list(AFFECTED.uf);
document.getElementById('rl-indices').textContent = list(AFFECTED.rl);

function list(values) {
    return values.join(', ');
}

function findAffectedPieces() {
    const affected = {
        cp: new Set(),
        co: new Set(),
        ep: new Set(),
        uf: new Set(),
        rl: new Set(),
    };

    for (const move of RU_MOVES) {
        const moveCube = ftosolver.FtoCubie.moveCube[move];
        for (let i = 0; i < 6; i++) {
            if (moveCube.cp[i] !== SOLVED.cp[i] || moveCube.co[i] !== SOLVED.co[i]) {
                affected.cp.add(i);
                affected.co.add(i);
            }
        }
        for (const key of ['ep', 'uf', 'rl']) {
            for (let i = 0; i < 12; i++) {
                if (moveCube[key][i] !== SOLVED[key][i]) {
                    affected[key].add(i);
                }
            }
        }
    }

    return Object.fromEntries(Object.entries(affected).map(([key, set]) => [key, [...set].sort((a, b) => a - b)]));
}

function formatTime(ms) {
    const s = Math.floor(ms / 1000);
    const cs = Math.floor((ms % 1000) / 10);
    return `${s}.${cs.toString().padStart(2, '0')}`;
}

function setDialPhase(next) {
    phase = next;
    dialEl.classList.remove('holding', 'charging', 'ready', 'running');
    if (next === 'holding') dialEl.classList.add('charging');
    if (next === 'ready') dialEl.classList.add('charging', 'ready');
    if (next === 'running') dialEl.classList.add('running');
}

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
    timerDisplayEl.textContent = formatTime(performance.now() - timerStart);
    setDialPhase('idle');
    newScramble();
}

function randomInt(max) {
    return Math.floor(Math.random() * max);
}

function shuffled(values) {
    const arr = values.slice();
    for (let i = arr.length - 1; i > 0; i--) {
        const j = randomInt(i + 1);
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

function permutationParity(values) {
    let parity = 0;
    for (let i = 0; i < values.length; i++) {
        for (let j = i + 1; j < values.length; j++) {
            parity ^= values[i] > values[j] ? 1 : 0;
        }
    }
    return parity;
}

function randomEvenImage(indices) {
    let image;
    do {
        image = shuffled(indices);
    } while (permutationParity(image));
    return image;
}

function applySubsetPermutation(target, key, indices, image) {
    for (let i = 0; i < indices.length; i++) {
        target[key][indices[i]] = image[i];
    }
}

function makeTarget() {
    const target = new ftosolver.FtoCubie();
    applySubsetPermutation(target, 'cp', AFFECTED.cp, randomEvenImage(AFFECTED.cp));
    applySubsetPermutation(target, 'ep', AFFECTED.ep, randomEvenImage(AFFECTED.ep));
    applySubsetPermutation(target, 'uf', AFFECTED.uf, shuffled(AFFECTED.uf));
    applySubsetPermutation(target, 'rl', AFFECTED.rl, shuffled(AFFECTED.rl));
    return target;
}

function parseMoves(sequence) {
    if (!sequence || sequence === 'FTO Solver ERROR!') return null;
    return sequence.trim().split(/\s+/).map((move) => MOVE_NAME_TO_INDEX[move]).filter((move) => move !== undefined);
}

function isExactTarget(scramble, target) {
    const moves = parseMoves(scramble);
    if (!moves) return false;
    const reached = ftosolver.applyMoves(new ftosolver.FtoCubie(), moves);
    return samePermutation(reached, target, 'cp', 6)
        && samePermutation(reached, target, 'co', 6)
        && samePermutation(reached, target, 'ep', 12)
        && sameCenterColors(reached, target, 'uf')
        && sameCenterColors(reached, target, 'rl');
}

function samePermutation(a, b, key, length) {
    for (let i = 0; i < length; i++) {
        if (a[key][i] !== b[key][i]) return false;
    }
    return true;
}

function sameCenterColors(a, b, key) {
    for (let i = 0; i < 12; i++) {
        if (Math.floor(a[key][i] / 3) !== Math.floor(b[key][i] / 3)) return false;
    }
    return true;
}

function hasOnlyRUPiecesMoved(target) {
    for (const key of ['cp', 'co']) {
        for (let i = 0; i < 6; i++) {
            if (!AFFECTED.cp.includes(i) && target[key][i] !== SOLVED[key][i]) return false;
        }
    }
    for (const key of ['ep', 'uf', 'rl']) {
        for (let i = 0; i < 12; i++) {
            const isChanged = key === 'ep'
                ? target[key][i] !== SOLVED[key][i]
                : Math.floor(target[key][i] / 3) !== Math.floor(SOLVED[key][i] / 3);
            if (!AFFECTED[key].includes(i) && isChanged) return false;
        }
    }
    return true;
}

function generateScramble() {
    for (let attempt = 0; attempt < MAX_TARGET_ATTEMPTS; attempt++) {
        const target = makeTarget();
        if (!hasOnlyRUPiecesMoved(target)) continue;
        const scramble = ftosolver.solveCubie(target, true);
        if (isExactTarget(scramble, target)) {
            return scramble;
        }
    }
    throw new Error('Could not generate a validated post-RUduction target.');
}

async function newScramble() {
    if (generating) return;
    generating = true;
    newScrambleBtn.disabled = true;
    scrambleTextEl.textContent = 'Generating...';

    await new Promise(requestAnimationFrame);
    try {
        scrambleTextEl.textContent = generateScramble();
    } catch (error) {
        console.error(error);
        scrambleTextEl.textContent = 'Generation failed. Try again.';
    } finally {
        generating = false;
        newScrambleBtn.disabled = false;
    }
}

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

window.addEventListener('pointerup', endHold);
newScrambleBtn.addEventListener('click', newScramble);

newScramble();
