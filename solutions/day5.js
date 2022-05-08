import { readFileSync } from 'fs';

let exampleData = [
    "0,9 -> 5,9",
    "8,0 -> 0,8",
    "9,4 -> 3,4",
    "2,2 -> 2,1",
    "7,0 -> 7,4",
    "6,4 -> 2,0",
    "0,9 -> 2,9",
    "3,4 -> 1,4",
    "0,0 -> 8,8",
    "5,5 -> 8,2"
]

const printGrid = (grid) => {
    console.log("  0 1 2 3 4 5 6 7 8 9")
    for (let i = 0; i < grid.length; i++) {
        let line = `${i} `;
        for (let j = 0; j < grid.length; j++) { 
            line += `${grid[i][j]} `;
        }
        console.log(line.trim() + "\n");
    }
}

class Line {
    constructor(lineString) {
        console.log(lineString);
        let pattern = /(\d+),(\d+) -> (\d+),(\d+)/;
        let match = lineString.match(pattern);
        this.from = { x: parseInt(match[1]), y: parseInt(match[2]) };
        this.to = { x: parseInt(match[3]), y: parseInt(match[4]) };

        this.vertical = this.from.x === this.to.x 
        this.horizontal = this.from.y === this.to.y;
        this.diagonal = !this.vertical && !this.horizontal;
    }
}

function gridCount(grid) {
    let count = 0;
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid.length; j++) { 
            if (grid[j][i] >= 2) {
                count++
            }
        }
    }
    return count;
}


let executePart1 = (input) => {
    const gridSize = 1000;
    let grid = Array(gridSize);
    for (let i = 0; i < grid.length; i++) {
        grid[i] = Array(gridSize).fill(0);
    }

    let allLines = [];
    for (let line of input) {
        allLines.push(new Line(line));
    }

    let nonDiagonal = allLines.filter((l) => !l.diagonal);

    let drawLine = (line) => {
        let fromX = line.from.x;
        let fromY = line.from.y;
        let toX = line.to.x;
        let toY = line.to.y;
        if (line.horizontal) {
            let lower = Math.min(fromX, toX);
            let distance = Math.abs(fromX - toX);
            for (let i = lower; i <= lower + distance; i++) {
                grid[fromY][i]++;
            }
        }
        if (line.vertical) {
            let lower = Math.min(fromY, toY);
            let distance = Math.abs(fromY - toY);
            for (let i = lower; i <= lower + distance; i++) {
                grid[i][fromX]++;
            }
        }
    }

    for (let l of nonDiagonal) {
        drawLine(l);
    }
    //printGrid(grid);

    let result = gridCount(grid);
    console.log(`Overlapping cells: ${result}`);
}

export default () => {
    let rawInput = readFileSync("input/day5.txt", 'utf8');
    let inputLines = rawInput.split("\n");
    executePart1(inputLines);

}


