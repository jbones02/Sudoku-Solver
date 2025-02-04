class SudokuPuzzle {
    DIMENSIONS = 9;
    NUM_SQUARES = 81;
    squares = [];

    constructor(puzzleString) {
        for (curRow = 0; curRow < this.NUM_SQUARES; curRow++) {
            this.squares.push([])
            for (curSquare = 0; curSquare < this.DIMENSIONS; curSquare++) {
                curSquareVal = (curRow * 9) + curSquare
                this.squares[curRow].push(puzzleString[curSquareVal]);
            }
        }
    }
}

exports.SudokuPuzzle = SudokuPuzzle;