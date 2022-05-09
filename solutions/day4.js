import { getText } from '../input.js';
import { EOL } from 'os'

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
            this.slots.push({ number: s, called: false});
        }
    }

    getSlotIndexByNumber(number) {
        for (let i in this.slots) {
            let slot = this.slots[i];
            if (slot.number == number) {
                return i;
            }
        }
        return false;
    }

    call(number) {
        //Return true if the number made the board get bingo, false otherwise
        if (this.hasBingo) {
            return false;
        }
        let sIndex = this.getSlotIndexByNumber(number);
        if (sIndex) {
            this.lastCalled = number;
            sIndex = Number.parseInt(sIndex)
            this.slots[sIndex].called = true;

            //We only need to check the row and column for bingo,
            //as numbers are called, since diagonals are not allowed 
            function checkBingoForSlots(...rowsAndCols) {
                for (let slots of rowsAndCols) {
                    let bingoStatus = true;
                    for (let slot of slots) {
                        if (!slot.called) {
                            bingoStatus = false;
                            break;
                        }
                    }
                    if (bingoStatus) {
                        return true;
                    }
                }
                return false;
            }
        
            let row = Math.ceil((sIndex + 1) / 5);
            let rowSlots = this.getRow(row);

            let column = (sIndex % 5) + 1;
            let columnSlots = this.getCol(column);
        
            if (checkBingoForSlots(rowSlots, columnSlots)) {
                this.hasBingo = true;
                return this;
            }
        }
        return false;
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
                unmarkedScore += Number.parseInt(slot.number);
            }
        }
        let finalScore = unmarkedScore * Number.parseInt(this.lastCalled);
        return finalScore;
    }
}

let execute = (input) => {
    let splitIndex = input.indexOf('\n');

    let rawBoards = input.substring(splitIndex + 1);
    let boardStrings = rawBoards.split(`${EOL}${EOL}`);
    let boards = [];
    for (let boardIndex in boardStrings) {
        let boardString = boardStrings[boardIndex];
        boards.push(new Board(boardString, boardIndex));
    }

    let bingoCalls = input.substring(0, splitIndex).split(',');
    let firstBoard = null;
    let lastBoard = null;
    for (let number of bingoCalls) {
        for (let board of boards) {
            let bingoBoard = board.call(number);
            if (bingoBoard) {
                if (!firstBoard) {
                    firstBoard = bingoBoard;
                }
                lastBoard = bingoBoard;
            }
        }
    }
    return { firstBoard, lastBoard }
}

export default async () => {
    let input = await getText(4);
    let { firstBoard, lastBoard } = execute(input);
    if (firstBoard) {
        console.log(`Day 4 Part 1: First board to get bingo was board ${firstBoard.boardIndex} with score: ${firstBoard.getScore()}`);
        console.log(`Day 4 Part 2: Last board to get bingo was board ${lastBoard.boardIndex} with score: ${lastBoard.getScore()}`);
    } else {
        console.log(`No board was able to get bingo! :(`);
    }

}
