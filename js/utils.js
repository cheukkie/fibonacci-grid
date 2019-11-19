export function isSquare(n) {
    const s = Math.sqrt(n);
    return s * s === n && n > 0 && Math.sqrt(n) % 1 === 0;
}

export function convertToArray(query) {
    return Array.prototype.slice.call(query);
}

export function getRandomInt(minimum, maximum) {
    const min = Math.ceil(minimum);
    const max = Math.floor(maximum);
    return Math.floor(Math.random() * (max - min)) + min; // The max is exclusive and the min is inclusive
}
