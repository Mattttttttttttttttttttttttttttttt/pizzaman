import { createMovesetScrambler, MOVES } from './moveset-scrambler/moveset-scrambler.js';

// States reachable by R and U only.
const scrambler = createMovesetScrambler([MOVES.U, MOVES.R]);

export const affected = scrambler.affected;

export function generatePostRUduxScramble() {
    return scrambler.generate();
}
