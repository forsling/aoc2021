import { getText } from '../input.js';
import { EOL } from 'os'

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

let execute = (input) => {
    let splitIndex = input.indexOf('\n');

    //Skapa bingobräden
    let rawBoards = input.substring(splitIndex + 1);

    let boardStrings = rawBoards.split(`${EOL}${EOL}`);
    let boards = [];
    for (let boardIndex in boardStrings) {
        let boardString = boardStrings[boardIndex];
        boards.push(new Board(boardString, boardIndex));
    }

    let bingoCalls = input.substring(0, splitIndex).split(',');

    let calls = 0;
    let callNumber = (number) => {
        calls++;
        for (let board of boards) {
            board.call(number);
        }
    }

    for (let call of bingoCalls) {
        callNumber(call)
    }
}


export default async () => {
    let input = await getText(4);
    execute(input);
}
