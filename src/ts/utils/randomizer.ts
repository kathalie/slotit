export function randomUniqueNumbers(n: number, limit: number): number[] {
    const setOfNumbers = new Set<number>();

    do {
        setOfNumbers.add(getRandomInt(0, limit + 1));
    } while(setOfNumbers.size < limit);

    return Array.from(setOfNumbers);
}

export function getRandomInt(min: number, max: number): number {
    min = Math.ceil(min);
    max = Math.floor(max);

    return Math.floor(Math.random() * (max - min) + min);
    // The maximum is exclusive and the minimum is inclusive
}

export function getRandomBoolean() {
    return getRandomInt(0, 2) === 0;
}
