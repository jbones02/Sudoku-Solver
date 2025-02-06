class SudokuPuzzle {
    constructor(puzzleString) {
        this.DIMENSIONS = 9;
        this.NUM_SQUARES = 81;
        this.squares = [];

        for (let curRow = 0; curRow < this.DIMENSIONS; curRow++) {
            this.squares.push([])
            for (let curSquare = 0; curSquare < this.DIMENSIONS; curSquare++) {
                let curSquareIndexInString = (curRow * 9) + curSquare
                this.squares[curRow].push(puzzleString[curSquareIndexInString]);
            }
        }
    }

    isSolved() {
        for (let curRow = 0; curRow < this.DIMENSIONS; curRow++) {
            for (let curCol = 0; curCol < this.DIMENSIONS; curCol++) {
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

    // Returns an error message object if puzzle string is invalid
    static validatePuzzleString(puzzleString) {
        if (puzzleString.length !== 81) {
            return { error: 'Expected puzzle to be 81 characters long' };
          }
      
          if (!/^[0-9.]+$/.test(puzzleString)) {
            return { error: 'Invalid characters in puzzle' }
          }
      
          return {};
    }

    static validateCoordinate(coordinate) {
        const coordinateRegex = /^[a-iA-I][1-9]$/;
        return coordinateRegex.test(coordinate);
    }

    static validateValue(value) {
        const valueRegex = /^[1-9]$/;
        return valueRegex.test(value);
    }
}

module.exports = SudokuPuzzle;