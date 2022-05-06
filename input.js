import { readFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';

export const getInput = async (day) => {
    try {
        let path = `input/day${day}.txt`;
        if (!existsSync(path)) {
            console.error(`Cannot get input for ${day} as path ${path} does not exist`);
            return false;
        }
        let rawInput = await readFile(path, 'utf-8');
        let inputArray = rawInput.split("\n");
        return inputArray
    } catch (err) {
        console.error(`Unable to get input for day ${day}: ` + err.toString());
    }
}

export const getIntInput = async (day) => {
    let rawInput = await getInput(day);
    let intArray = rawInput.filter((val, index) => {
        let parsedInt = Number.parseInt(val);
        if (Number.isNaN(parsedInt)) {
            console.warn(`Skipped index ${index} with value ${val}: cannot be parsed to int.`);
            return false;
        } else {
            return true;
        }
    }).map((num) => {
        return Number.parseInt(num);
    });
    return intArray;
}