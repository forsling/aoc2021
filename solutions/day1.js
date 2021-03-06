import { getInputLines, getIntInputLines } from '../input.js';

function executePart1(input) {
    let increases = 0;
    for (let i = 1; i < input.length; i++) {
        let current = Number.parseInt(input[i]);
        let previous = Number.parseInt(input[i - 1]);
        if (current > previous) {
            increases++;
        }
    }
    return increases;
}

function executePart2(input) {
    let increases = 0;
    let previousSum = false;
    for (let i = 0; i < input.length; i++) {
        if (i + 2 >= input.length) {
            //length is the smallest index that does not exist in the input
            //we need to be able to read i+2 for our three measurements
            break;
        }
        let currentSum = input[i] + input[i + 1] + input[i + 2];
        if (previousSum && currentSum > previousSum) {
            increases++;
        }
        previousSum = currentSum;
    }
    return increases;
}

const executePart2b = (input, prevSum = false, increases = 0) => {
    let [a, b, c, ...rest] = input;
    if (!c) {
        return increases;
    } 
    const sum = a + b + c;
    return executePart2b([b, c, ...rest], sum, (increases += prevSum && sum > prevSum ? 1 : 0));
}

export default async () => {
    const input = await getInputLines(1);
    const p1 = executePart1(input);

    const numInput = await getIntInputLines(1);
    const p2 = executePart2(numInput);
    const p2b = executePart2b(numInput);

    console.log(`Day 1 Part 1: ${p1}`);
    console.log(`Day 1 Part2a: ${p2} Part2b: ${p2b}`);
}
