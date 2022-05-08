import { getInput } from '../input.js';
let input = await getInput(3);

let exampleInput = [
    "00100",
    "11110",
    "10110",
    "10111",
    "10101",
    "01111",
    "00111",
    "11100",
    "10000",
    "11001",
    "00010",
    "01010"
];

let executePart1 = (input) => {   
    let index = 0;
    let getNthBitString = (index) => {
        return input.reduce((prev, curr, ci, arr) => {
            return prev + curr.charAt(index);
        }, "");
    };

    let getCommonBit = (nthBits) => {
        let zeroes = 0;
        for (let i = 0; i < nthBits.length; i++) {
            let curr = nthBits.charAt(i);
            if (curr === "0") {
                zeroes++;
            }
        }
        let ones = nthBits.length - zeroes;
        return zeroes > ones ? "0" : "1";
    }

    let maxInputLen = Math.max(...(input.map(el => el.length)));
    let commonBits = "";
    for (let i = 0; i < maxInputLen; i++) {
        let bitString = getNthBitString(i);
        commonBits += getCommonBit(bitString);
    }

    let gamma = Number.parseInt(commonBits, 2);

    let mask = Number.parseInt("1".repeat(commonBits.length), 2);
    let epsilon = gamma ^ mask;

    let powerConsumption = gamma * epsilon;
    console.log(`Gamma value is ${gamma} (binary ${commonBits}), epsilon value is ${epsilon} (binary ${epsilon.toString(2)}) Giving a power consuption of ${powerConsumption}`);
    return powerConsumption;
}


export default () => {
    let p1 = executePart1(input);
    console.log("Day 3 Part 1: " + p1);

}
