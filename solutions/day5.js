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
    for (let i = 0; i < grid.length; i++) {
        let line = "";
        for (let j = 0; j < grid[0].length; j++) { 
            line += `${grid[i][j]} `;
        }
        console.log(line.trim() + "\n");
    }
}

class Line {
    constructor(lineString) {
        const pattern = /(\d+),(\d+) -> (\d+),(\d+)/;
        const match = lineString.match(pattern);
        this.from = { x: parseInt(match[1]), y: parseInt(match[2]) };
        this.to = { x: parseInt(match[3]), y: parseInt(match[4]) };
    }

    isVertical() {
        return this.from.x === this.to.x;
    }

    isHorizontal() {
        return this.from.y === this.to.y;
    }

    isDiagonal45Deg() {
        return !this.isVertical() 
            && !this.isHorizontal() 
            && Math.abs(this.from.x - this.to.x) === Math.abs(this.from.y - this.to.y);
    }
}

const execute = (input) => {
    const gridSize = 1000;
    const grid = Array(gridSize);
    for (let i = 0; i < grid.length; i++) {
        grid[i] = Array(gridSize).fill(0);
    }

    const drawLine = (grid, x, y, toX, toY) => {
        grid[y][x]++;
        if (x == toX && y == toY) {
            return;
        }
        let newX = x + (x == toX ? 0 : x < toX ? 1 : -1);
        let newY = y + (y == toY ? 0 : y < toY ? 1 : -1);
        drawLine(grid, newX, newY, toX, toY);
    }

    for (let l of input) {
        drawLine(grid, l.from.x, l.from.y, l.to.x, l.to.y);
    }

    const gridCount = (grid, cellEval) => {
        let count = 0;
        for (let row = 0; row < grid.length; row++) {
            for (let col = 0; col < grid[0].length; col++) { 
                if (cellEval(grid[row][col])) {
                    count++;
                }
            }
        }
        return count;
    }
    
    let result = gridCount(grid, (cellVal) => cellVal >= 2);
    return result;
}

export default () => {
    let rawInput = readFileSync("input/day5.txt", 'utf8');
    let inputLines = rawInput.split("\n");

    const allLines = [];
    for (let line of inputLines) {
        allLines.push(new Line(line));
    }

    const nonDiagLines = allLines.filter((l) => l.isHorizontal() || l.isVertical());
    const p1 = execute(nonDiagLines);
    console.log(`Day 5 Part 1: ${p1}`);

    const allGoodLines = allLines.filter((l) => l.isHorizontal() || l.isVertical() || l.isDiagonal45Deg());
    const p2 = execute(allGoodLines);
    console.log(`Day 5 Part 2: ${p2}`);
}
