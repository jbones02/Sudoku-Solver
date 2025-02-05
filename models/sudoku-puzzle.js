class SudokuPuzzle {
    DIMENSIONS = 9;
    NUM_SQUARES = 81;
    squares = [];

    constructor(puzzleString) {
        for (let curRow = 0; curRow < this.DIMENSIONS; curRow++) {
            this.squares.push([])
            for (curSquare = 0; curSquare < this.DIMENSIONS; curSquare++) {
                let curSquareIndexInString = (curRow * 9) + curSquare
                this.squares[curRow].push(puzzleString[curSquareIndexInString]);
            }
        }
    }

    isSolved() {
        for (let curRow = 0; curRow < this.DIMENSIONS; curRow++) {
            for (curCol = 0; curCol < this.DIMENSIONS; curCol++) {
                if (this.squares[curRow][curCol] === '.') {
                    return false;
                }
            }
        }
        return true;
    }

    getNextEmptySquareIndices() {
        for (let curRow = 0; curRow < this.DIMENSIONS; curRow++) {
          for (let curCol = 0; curCol < this.DIMENSIONS; curCol++) {
            if (this.squares[curRow][curCol] === '.') {
              return ({ row: curRow, col: curCol })
            }
          }
        }
        return null;
      }

    toPuzzleString() {
        let puzzleString = ""
        for (let curRow = 0; curRow < this.DIMENSIONS; curRow++) {
            for (let curCol = 0; curCol < this.DIMENSIONS; curCol++) {
                puzzleString += this.squares[curRow][curCol];
            }
        }
        return puzzleString;
    }
}

exports.SudokuPuzzle = SudokuPuzzle;