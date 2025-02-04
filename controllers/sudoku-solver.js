const SudokuPuzzle = require('../models/sudoku-puzzle.js')

class SudokuSolver {

  validate(puzzleString) {
    if (puzzleString.length !== 81) {
      return true;
    }
    return false;
  }

  checkRowPlacement(sudokuPuzzle, row, val) {
    const rowToCheck = sudokuPuzzle.squares[row];
    if (rowToCheck.includes(val)) {
      return false;
    }
    return true;
  }

  checkColPlacement(sudokuPuzzle, col, val) {
    let colToCheck = [];

    // Get vals in col being checked
    for (curRow = 0; curRow < sudokuPuzzle.DIMENSIONS; curRow++) {
      colToCheck.push(sudokuPuzzle.squares[curRow][col]);
    }

    if (colToCheck.includes(val)) {
      return false;
    }

    return true;
  }

  getRegionNumber() {
    /* Region numbering convention:
          0 1 2
          3 4 5
          6 7 8
    */
    if (row <= 2) {
      if (col <=2) {
        return 0;
      } else if (col <= 5) {
        return 1;
      } else {
        return 2;
      }
    } else if (row <=5) {
      if (col <=2) {
        return 3;
      } else if (col <=5) {
        return 4;
      } else {
        return 5;
      }
    } else {
      if (col <= 2) {
        return 6;
      } else if (col <= 5) {
        return 7;
      } else {
        return 8;
      }
    }
  }

  checkRegionPlacement(sudokuPuzzle, row, col, val) {

  }

  solverRecurse(sudokuPuzzle) {
    
  }

  solve(puzzleString) {
    const sudokuPuzzle = new SudokuPuzzle(puzzleString);
  }
}

module.exports = SudokuSolver;

