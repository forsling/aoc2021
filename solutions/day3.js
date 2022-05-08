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
    let maxInputLen = Math.max(...(input.map(el => el.length)));

    let getNthBitString = (inputArr, index) => {
        return inputArr.reduce((prev, curr) => {
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

    let commonBits = "";
    for (let i = 0; i < maxInputLen; i++) {
        let bitString = getNthBitString(input, i);
        commonBits += getCommonBit(bitString);
    }

    let gamma = Number.parseInt(commonBits, 2);

    let mask = Number.parseInt("1".repeat(commonBits.length), 2);
    let epsilon = gamma ^ mask;

    let powerConsumption = gamma * epsilon;
    console.log(`Gamma value is ${gamma} (binary ${commonBits}), epsilon value is ${epsilon} (binary ${epsilon.toString(2)}) Giving a power consuption of ${powerConsumption}`);
    return powerConsumption;
}

let executePart2 = (input) => {
    let maxInputLen = Math.max(...(input.map(el => el.length)));

    //Positive for more ones, negative for more zeroes, 0 if they are equal
    let getCommonBitMeasure = (bitStrings, index) => {
        let bitnum = 0;
        for (let line of bitStrings) {
            let char = line.charAt(index);
            if (char === "0") {
                bitnum--;
            } else if (char === "1") {
                bitnum++
            }
        }
        return bitnum;
    };

    let filterArray = (array, charFilter) => {
        let workingArray = array;
        for (let i = 0; i < maxInputLen; i++) {
            let commonBitMeasure = getCommonBitMeasure(workingArray, i);
            workingArray = workingArray.filter((value) => {
                return charFilter(value.charAt(i), commonBitMeasure);
            });
            if (workingArray.length == 1) {
                return workingArray[0];
            }
        }
    }

    let oxygenRatingStr = filterArray(input, (char, commonBitMeasure) => {
        let keepChar = commonBitMeasure >= 0 ? "1" : "0";
        return char == keepChar;
    });
    let oxygenRating = Number.parseInt(oxygenRatingStr, 2);

    let co2ScrubString = filterArray(input, (char, commonBitMeasure) => {
        let keepChar = commonBitMeasure >= 0 ? "0" : "1";
        return char == keepChar;
    });
    let co2ScrubRating = Number.parseInt(co2ScrubString, 2);

    let lifeSupportRating = oxygenRating * co2ScrubRating;
    return lifeSupportRating;
}

export default () => {
    let p1 = executePart1(input);
    console.log("Day 3 Part 1: " + p1);

    let p2 = executePart2(input);
    console.log("Day 3 Part 2: " + p2);
}
