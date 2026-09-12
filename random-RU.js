import { generateScramble } from './random-move.js';

const FACES = ['R', 'U'];
const LENGTH = 20;

export function generateRUScramble() {
    return generateScramble(FACES, LENGTH);
}
