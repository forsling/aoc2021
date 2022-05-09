import { readFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';

export const getText = async (day) => {
    let path = `input/day${day}.txt`;
    if (!existsSync(path)) {
        console.error(`Cannot get input for ${day} as path ${path} does not exist`);
        return false;
    }
    return await readFile(path, 'utf-8');
}

export const getInputLines = async (day) => {
    let text = await getText(day);
    let inputArray = text.split("\n");
    return inputArray
}

export const getIntInputLines = async (day) => {
    let rawInput = await getInputLines(day);
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