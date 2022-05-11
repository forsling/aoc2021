import { getText } from '../input.js';let exampleData = 
`be cfbegad cbdgef fgaecd cgeb fdcge agebfd fecdb fabcd edb | fdgacbe cefdb cefbgd gcbe
edbfga begcd cbg gc gcadebf fbgde acbgfd abcde gfcbed gfec | fcgedb cgb dgebacf gc
fgaebd cg bdaec gdafb agbcfd gdcbef bgcad gfac gcb cdgabef | cg cg fdcagb cbg
fbegcd cbd adcefb dageb afcb bc aefdc ecdab fgdeca fcdbega | efabcd cedba gadfec cb
aecbfdg fbg gf bafeg dbefa fcge gcbea fcaegb dgceab fcbdga | gecf egdcabf bgf bfgea
fgeab ca afcebg bdacfeg cfaedg gcfdb baec bfadeg bafgc acf | gebdcfa ecba ca fadegcb
dbcfg fgd bdegcaf fgec aegbdf ecdfab fbedc dacgb gdcebf gf | cefg dcbef fcge gbcadfe
bdfegc cbegaf gecbf dfcage bdacg ed bedf ced adcbefg gebcd | ed bcgafe cdgba cbgef
egadfb cdbfeg cegd fecab cgb gbdefca cg fgcdab egfdb bfceg | gbdfcae bgc cg cgb
gcafb gcf dcaebfg ecagb gf abcdeg gaef cafbge fdbac fegbdc | fgae cfgab fg bagce`;

const parseInput = (inputText) => {
    const outputSegments = [];
    const displays = [];
    for (let line of inputText) {
        const match = line.match(/^([\w ]+) \| ([\w ]+)/);
        outputSegments.push(...match[2].split(" "));
        const inputs = match[1].split(" ").map((val) => { 
            let sortedVal = val.split("").sort().join("");
            return { type: "input", segments: sortedVal, number: null } 
        });
        const outputs = match[2].split(" ").map((val) => { 
            let sortedVal = val.split("").sort().join("");
            return { type: "output", segments: sortedVal, number: null } 
        });
        displays.push({
            digits: [...inputs, ...outputs],
            numbers: {},
            segments: {}
        });
    }
    return { displays, outputSegments };
}

//Counts segments matches of a in b
const countMatchingSegments = (a, b) => {
    if (!b) {
        return false;
    }
    let count = 0;
    a.split("").forEach(segment => {
        if (b.includes(segment)) {
            count++
        }
    });
    return count;
}

const getNumber = (segments, numbers) => {
    if (segments.length === 5) {
        if (numbers[1]) {
            if (countMatchingSegments(segments, numbers[1]) === 2) {
                return 3;
            }
            if (numbers[4]) {
                let count = countMatchingSegments(segments, numbers[4]);
                if (count === 3) {
                    return 5
                } else if (count === 2) {
                    return 2;
                }
            }
        }
    } else if (segments.length === 6) {
        if (numbers[1]) {
            if (countMatchingSegments(segments, numbers[1]) === 1) {
                return 6;
            }
        }
        if (numbers[7]) {
            if (countMatchingSegments(segments, numbers[7]) === 2) {
                return 6;
            }
        }
        if (numbers[4]) {
            if (countMatchingSegments(segments, numbers[4]) === 4) {
                return 9;
            }
        }
        if (numbers[6] && numbers[4]) {
            if (countMatchingSegments(segments, numbers[4]) === 3) {
                return 0;
            }
        }
    }
    return false;
}

const executePart1 = (outputs) => {
    let count = outputs.reduce((prev, curr) => {
        let l = curr.length;
        return prev + (l === 2 || l === 3 || l === 4 || l == 7 ? 1 : 0);
    }, 0);
    return count;
}

const executePart2 = (displays) => {
    const processDisplay = ((displays) => {
        let [ display, ...rest ] = displays;
        if (!display) {
            return;
        }
        let digits = display.digits;
        for (let digit of digits) {
            //Figure out the easy numbers
            let segments = digit.segments;
            let num = false;
            if (segments.length === 2) {
                num = 1
            } else if (segments.length === 3) {
                num = 7
            }  else if (segments.length === 4) {
                num = 4
            } else if (segments.length === 7) {
                num = 8;
            }
            if (num) {
                digit.number = num;
                display.numbers[num] = segments;
                display.segments[segments] = num;
            }
        }
        for (let digit of digits) {
            //Handle numbers we already figured out
            if (digit.number) {
                continue;
            }
            if (display.segments[digit.segments]) {
                digit.number = display.segments[digit.segments];
                continue;
            }

            //Figure out new numbers
            let num = getNumber(digit.segments, display.numbers);
            if (num !== false) {
                digit.number = num;
                display.numbers[num] = digit.segments;
                display.segments[digit.segments] = num;
            }
        }
        processDisplay(rest);
    });
    processDisplay(displays);

    let out = displays.map(disp => disp.digits
        .filter(d => d.type === "output")
        .map(d => d.number)
        .reduce((p, c) => { return `${p}${c}`}, ""));
    let sum = out.reduce((p, c) => { return parseInt(p) + parseInt(c) });
    return sum;
};

export default async () => {
    let text = await getText(8);
    const inputLines = text.split("\n");
    const { displays, outputSegments } = parseInput(inputLines);

    let p1 = executePart1(outputSegments);
    console.log(`Day8 Part 1: ${p1}`);

    let p2 = executePart2(displays);
    console.log(`Day8 Part 2: ${p2}`);
}
