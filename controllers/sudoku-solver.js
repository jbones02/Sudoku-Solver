const SudokuPuzzle = require('../models/sudoku-puzzle.js')

class SudokuSolver {

  validate(puzzleString) {
    if (puzzleString.length !== 81) {
      return true;
    }
    return false;
  }

  rowPlacementIsValid(sudokuPuzzle, row, val) {
    const rowToCheck = sudokuPuzzle.squares[row];
    if (rowToCheck.includes(val)) {
      return false;
    }
    return true;
  }

  colPlacementIsValid(sudokuPuzzle, col, val) {
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

  getSquaresInRegion(sudokuPuzzle, regionNumber) {
    let squaresInRegion = [];

    const startRow = Math.floor(regionNumber / 3) * 3;
    const startCol = (regionNumber % 3) * 3;

    for (let i = 0; i < 3; r++) {
      for (let j = 0; j < 3; j++) {
        squaresInRegion.push(sudokuPuzzle.squares[startRow + r][startCol + c]);
      }
    }

    return squaresInRegion;
  }

  regionPlacementIsValid(sudokuPuzzle, row, col, val) {
    let squaresInRegion;
    this.getSquaresInRegion(sudokuPuzzle, squaresInRegion);

    if (squaresInRegion.includes(val)) {
      return false;
    }
    return true;
  }

  solveRecurse(sudokuPuzzle) {
    
  }

  solve(puzzleString) {
    const sudokuPuzzle = new SudokuPuzzle(puzzleString);
  }
}

module.exports = SudokuSolver;

