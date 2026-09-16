import ftosolver from './ftocta.js';

// Generates scrambles whose effect is confined to the pieces a given set of
// moves can touch. Every piece outside that domain is left solved, so the
// result is drillable with only those moves.

export const DEFAULT_MAX_ATTEMPTS = 250;

export const SOLVED = new ftosolver.FtoCubie();

export const MOVE_NAME_TO_INDEX = Object.fromEntries(
    ftosolver.move2str.map((name, index) => [name, index])
);

// Clockwise move indices, for building move sets.
export const MOVES = {
    U: MOVE_NAME_TO_INDEX.U,
    F: MOVE_NAME_TO_INDEX.F,
    R: MOVE_NAME_TO_INDEX.R,
    L: MOVE_NAME_TO_INDEX.L,
    D: MOVE_NAME_TO_INDEX.D,
    B: MOVE_NAME_TO_INDEX.B,
    r: MOVE_NAME_TO_INDEX.r,
    l: MOVE_NAME_TO_INDEX.l,
};

const PERM_KEYS = ['ep', 'uf', 'rl'];

// Which piece indices the given moves can disturb, per state array.
export function findAffectedPieces(moveIndices) {
    const affected = { cp: new Set(), co: new Set(), ep: new Set(), uf: new Set(), rl: new Set() };

    for (const move of moveIndices) {
        const moveCube = ftosolver.FtoCubie.moveCube[move];
        for (let i = 0; i < 6; i++) {
            if (moveCube.cp[i] !== SOLVED.cp[i] || moveCube.co[i] !== SOLVED.co[i]) {
                affected.cp.add(i);
                affected.co.add(i);
            }
        }
        for (const key of PERM_KEYS) {
            for (let i = 0; i < 12; i++) {
                if (moveCube[key][i] !== SOLVED[key][i]) affected[key].add(i);
            }
        }
    }

    return Object.fromEntries(
        Object.entries(affected).map(([key, set]) => [key, [...set].sort((a, b) => a - b)])
    );
}

function randomInt(max) {
    return Math.floor(Math.random() * max);
}

export function shuffled(values) {
    const arr = values.slice();
    for (let i = arr.length - 1; i > 0; i--) {
        const j = randomInt(i + 1);
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

export function permutationParity(values) {
    let parity = 0;
    for (let i = 0; i < values.length; i++) {
        for (let j = i + 1; j < values.length; j++) {
            parity ^= values[i] > values[j] ? 1 : 0;
        }
    }
    return parity;
}

export function randomEvenImage(indices) {
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

// A random state that only permutes pieces inside the affected domain.
export function makeTarget(affected) {
    const target = new ftosolver.FtoCubie();
    applySubsetPermutation(target, 'cp', affected.cp, randomEvenImage(affected.cp));
    applySubsetPermutation(target, 'ep', affected.ep, randomEvenImage(affected.ep));
    applySubsetPermutation(target, 'uf', affected.uf, shuffled(affected.uf));
    applySubsetPermutation(target, 'rl', affected.rl, shuffled(affected.rl));
    return target;
}

export function parseMoves(sequence) {
    if (!sequence || sequence === 'FTO Solver ERROR!') return null;
    return sequence
        .trim()
        .split(/\s+/)
        .map((move) => MOVE_NAME_TO_INDEX[move])
        .filter((move) => move !== undefined);
}

function samePermutation(a, b, key, length) {
    for (let i = 0; i < length; i++) {
        if (a[key][i] !== b[key][i]) return false;
    }
    return true;
}

// Centers share a colour across three slots, so compare colour, not slot.
function sameCenterColors(a, b, key) {
    for (let i = 0; i < 12; i++) {
        if (Math.floor(a[key][i] / 3) !== Math.floor(b[key][i] / 3)) return false;
    }
    return true;
}

export function isExactTarget(scramble, target) {
    const moves = parseMoves(scramble);
    if (!moves) return false;
    const reached = ftosolver.applyMoves(new ftosolver.FtoCubie(), moves);
    return samePermutation(reached, target, 'cp', 6)
        && samePermutation(reached, target, 'co', 6)
        && samePermutation(reached, target, 'ep', 12)
        && sameCenterColors(reached, target, 'uf')
        && sameCenterColors(reached, target, 'rl');
}

export function hasOnlyAffectedPiecesMoved(target, affected) {
    for (const key of ['cp', 'co']) {
        for (let i = 0; i < 6; i++) {
            if (!affected.cp.includes(i) && target[key][i] !== SOLVED[key][i]) return false;
        }
    }
    for (const key of PERM_KEYS) {
        for (let i = 0; i < 12; i++) {
            const isChanged = key === 'ep'
                ? target[key][i] !== SOLVED[key][i]
                : Math.floor(target[key][i] / 3) !== Math.floor(SOLVED[key][i] / 3);
            if (!affected[key].includes(i) && isChanged) return false;
        }
    }
    return true;
}

// Synchronous generation. Throws if no validated target is found in time.
export function generateScrambleSync(affected, maxAttempts = DEFAULT_MAX_ATTEMPTS) {
    for (let attempt = 0; attempt < maxAttempts; attempt++) {
        const target = makeTarget(affected);
        if (!hasOnlyAffectedPiecesMoved(target, affected)) continue;
        const scramble = ftosolver.solveCubie(target, true);
        if (isExactTarget(scramble, target)) return scramble;
    }
    throw new Error('Could not generate a validated target for this move set.');
}

// Builds a generator bound to one move set. `generate` is async so callers can
// show a loading state; the solve itself is synchronous and can be slow.
export function createMovesetScrambler(moveIndices, { maxAttempts = DEFAULT_MAX_ATTEMPTS } = {}) {
    let affected = null;

    const getAffected = () => (affected ??= findAffectedPieces(moveIndices));

    return {
        moveIndices,
        get affected() { return getAffected(); },
        async generate() {
            // Yield once so a pending loading state can paint first.
            await new Promise((resolve) => setTimeout(resolve, 0));
            return generateScrambleSync(getAffected(), maxAttempts);
        },
    };
}
