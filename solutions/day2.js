

import { getInput } from '../input.js';
let realInput = await getInput(2);

let exampleInput = [
    "forward 5",
    "down 5",
    "forward 8",
    "up 3",
    "down 8",
    "forward 2"
];

const execute = (input) => {
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
    console.log(`Final position (multiplied) is ${finalPos}`);
    return finalPos;
}

export default () => {
    let p1 = execute(exampleInput);
    console.log("Day 2: " + p1);
}
