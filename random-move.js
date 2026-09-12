export function generateScramble(faces, length) {
    const moves = [];
    let lastFace = null;

    for (let i = 0; i < length; i++) {
        let face;
        do {
            face = faces[Math.floor(Math.random() * faces.length)];
        } while (face === lastFace);
        lastFace = face;

        const isPrime = Math.random() < 0.5;
        moves.push(isPrime ? `${face}'` : face);
    }

    return moves.join(' ');
}
