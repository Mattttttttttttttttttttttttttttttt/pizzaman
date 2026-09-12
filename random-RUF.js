import { generateScramble } from './random-move.js';

const FACES = ['R', 'U', 'F'];
const LENGTH = 30;

export function generateRUFScramble() {
    return generateScramble(FACES, LENGTH);
}
