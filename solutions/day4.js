import { readFileSync } from 'fs';
//let input = await getInput(4);

let exampleData = `7,4,9,5,11,17,23,2,0,14,21,24,10,16,13,6,15,25,12,22,18,20,8,19,3,26,1

22 13 17 11  0
 8  2 23  4 24
21  9 14 16  7
 6 10  3 18  5
 1 12 20 15 19

 3 15  0  2 22
 9 18 13 17  5
19  8  7 25 23
20 11 10 24  4
14 21 16 12  6

14 21 17 24  4
10 16 15  9 19
18  8 23 26 20
22 11 13  6  5
 2  0 12  3  7`;

class Slot {
    constructor(value) {
        this.value = value;
        this.called = false;
    }
}

class Board {
    constructor(boardstring, boardIndex) {
        this.boardIndex = boardIndex;
        this.slots = [];
        this.lastCalled = null;
        this.hasBingo = false;
        boardstring = boardstring.trim();
        let t1 = boardstring.replace(/\n/g, " ");
        let t2 = t1.split(/\s+/);
        for (let s of t2) {
            this.slots.push(new Slot(s));
        }
    }

    getSlotIndexByNumber(number) {
        for (let i in this.slots) {
            let slot = this.slots[i];
            if (slot.value == number) {
                return i;
            }
        }
        return false;
    }

    call(number) {
        if (this.hasBingo) {
            return;
        }
        let sIndex = this.getSlotIndexByNumber(number);
        if (sIndex) {
            this.lastCalled = number;
            sIndex = Number.parseInt(sIndex)
            this.slots[sIndex].called = true;

            function checkBingoForSlots(slots) {
                let bingoStatus = true;
                for (let slot of slots) {
                    if (!slot.called) {
                        bingoStatus = false;
                        break;
                    }
                }
                return bingoStatus;
            }
        
            //Eftersom diagonaler inte räknas behöver vi endast undersöka om 
            //raden eller kolumnen för det utropade numret har gett bingo.

            let row = Math.ceil((sIndex + 1) / 5);
            let rowSlots = this.getRow(row);
            if (checkBingoForSlots(rowSlots)) {
                this.hasBingo = true;
                this.callBingo();
                return;
            }

            let column = (sIndex % 5) + 1;
            let columnSlots = this.getCol(column);
        
            if (checkBingoForSlots(columnSlots)) {
                this.hasBingo = true;
                this.callBingo();
            }            
        }
    }

    callBingo() {
        let score = this.getScore();
        console.log(`Bingo for board ${this.boardIndex} with score: ${score}`);
    }

    getRow(rowNum) {
        let toIndex = rowNum * 5;
        let row = this.slots.slice(toIndex-5, toIndex);
        return row;
    }

    getCol(colNum) {
        let baseNum = colNum - 1;
        let getSlots = (num, foundSlots = []) => {
            let slot = this.slots[num];
            if (typeof slot !== 'undefined') {
                foundSlots.push(slot);
                return getSlots(num + 5, foundSlots);
            }
            return foundSlots;
        }
        return getSlots(baseNum);
    }

    getScore() {
        let unmarkedScore = 0;
        for (let slot of this.slots) {
            if (!slot.called) {
                unmarkedScore += Number.parseInt(slot.value);
            }
        }
        let finalScore = unmarkedScore * Number.parseInt(this.lastCalled);
        return finalScore;
    }
}

let executePart1 = (input) => {
    let splitIndex = input.indexOf('\n');

    //Skapa bingobräden
    let rawBoards = input.substring(splitIndex + 1);
    let boardStrings = rawBoards.split("\n\n");
    let boards = [];
    for (let boardIndex in boardStrings) {
        let boardString = boardStrings[boardIndex];
        boards.push(new Board(boardString, boardIndex));
    }

    let bingoCalls = input.substring(0, splitIndex).split(',');

    let calls = 0;
    let callNumber = (number) => {
        calls++;
        console.log(`Calling ${number} (call ${calls})`)
        for (let board of boards) {
            board.call(number);
        }
    }

    for (let call of bingoCalls) {
        callNumber(call)
    }
}


export default () => {
    let input = readFileSync("input/day4.txt", 'utf8');
    executePart1(input);
    console.log("Day 3 Part 1: " + p1);

}
