import { createMovesetScrambler, MOVES } from './moveset-scrambler/moveset-scrambler.js';

// States reachable by R, U and L only.
const scrambler = createMovesetScrambler([MOVES.U, MOVES.R, MOVES.L]);

export const affected = scrambler.affected;

export function generateRUduxScramble() {
    return scrambler.generate();
}
