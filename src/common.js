/**
 * @type {<T>(choices: T[], randomizer: () => number) => T}
 */
export const choice = (choices, randomizer) => (
    choices[Math.floor(randomizer() * choices.length)]
);

const p = 9;
const q = 7;
const m = 1 << 20;

export const createRandomizer = () => {
    let x = Date.now();
    return () => {
        x = (x * p + q) % m;
        return x / m;
    };
};
