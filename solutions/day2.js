import { getInputLines } from '../input.js';

const executePart1 = (input) => {
    let hpos = 0;
    let depth = 0;

    for (let rawInstruction of input) {
        let instruction = rawInstruction.split(" ");
        if (instruction.length !== 2) {
            console.warn(`Invalid input: ${rawInstruction}: Output may be wrong!`);
            continue;
        }
        let command = instruction[0];
        let magnitude = Number.parseInt(instruction[1]);
        switch (command) {
            case "forward":
                hpos += magnitude;
                break;
            case "up":
                depth -= magnitude;
                break;
            case "down":
                depth += magnitude;
                break;
            default:
                console.log("Unknown command");
        }
    }

    console.log(`Stopped at horizontal position ${hpos} and depth ${depth}`);
    let finalPos = hpos * depth;
    return finalPos;
}

const executePart2 = (input) => {
    let hpos = 0;
    let depth = 0;
    let aim = 0;

    for (let rawInstruction of input) {
        let instruction = rawInstruction.split(" ");
        if (instruction.length !== 2) {
            console.warn(`Invalid input: ${rawInstruction}: Output may be wrong!`);
            continue;
        }
        let command = instruction[0];
        let magnitude = Number.parseInt(instruction[1]);
        switch (command) {
            case "forward": 
                hpos += magnitude;
                depth += magnitude * aim;
                break;
            case "up":
                aim -= magnitude;
                break;
            case "down":
                aim += magnitude;
                break;
            default:
                console.error("Unknown command: " + rawInstruction);
        }
    }

    console.log(`Stopped at horizontal position ${hpos} and depth ${depth}`);
    let finalPos = hpos * depth;
    return finalPos;
}

export default async () => {
    let exampleInput = [
        "forward 5",
        "down 5",
        "forward 8",
        "up 3",
        "down 8",
        "forward 2"
    ];
    
    let input = await getInputLines(2);

    let p1 = executePart1(input);
    console.log("Day 2 Part 1: " + p1);

    let p2 = executePart2(input);
    console.log("Day 2 Part 2: " + p2);
}
