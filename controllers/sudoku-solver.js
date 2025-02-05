const SudokuPuzzle = require('../models/sudoku-puzzle.js')

class SudokuSolver {

  validate(puzzleString) {
    if (puzzleString.length !== 81) {
      return { error: 'Expected puzzle to be 81 characters long' };
    }

    if (!/&[0-9.]+$/.test(puzzleString)) {
      return { error: 'Invalid characters in puzzle' }
    }

    return {};
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
    for (let curRow = 0; curRow < sudokuPuzzle.DIMENSIONS; curRow++) {
      colToCheck.push(sudokuPuzzle.squares[curRow][col]);
    }

    if (colToCheck.includes(val)) {
      return false;
    }

    return true;
  }

  getRegionNumber(row, col) {
    return Math.floor(row /3) * 3 + Math.floor(col / 3);
  }

  getSquaresInRegion(sudokuPuzzle, regionNumber) {
    let squaresInRegion = [];

    const startRow = Math.floor(regionNumber / 3) * 3;
    const startCol = (regionNumber % 3) * 3;

    for (let curRow = 0; curRow < 3; curRow++) {
      for (let curCol = 0; curCol < 3; curCol++) {
        squaresInRegion.push(sudokuPuzzle.squares[startRow + curRow][startCol + curCol]);
      }
    }

    return squaresInRegion;
  }

  regionPlacementIsValid(sudokuPuzzle, row, col, val) {
    const regionNumber = this.getRegionNumber(row, col)
    let squaresInRegion = this.getSquaresInRegion(sudokuPuzzle, regionNumber);

    if (squaresInRegion.includes(val)) {
      return false;
    }
    return true;
  }

  placementIsValid(sudokuPuzzle, row, col, val) {
    return  this.rowPlacementIsValid(sudokuPuzzle, row, val) &&
            this.colPlacementIsValid(sudokuPuzzle, col, val) &&
            this.regionPlacementIsValid(sudokuPuzzle, row, col, val);
  }

  solveRecurse(sudokuPuzzle) {
    if (sudokuPuzzle.isSolved()) {
      return true;
    }

    // Get index of next empty space
    let curSquareIndices = sudokuPuzzle.getNextEmptySquareIndices();
    let curRow = curSquareIndices.row;
    let curCol = curSquareIndices.col;

    // Try all possible nums in empty space
    for (let numToTry = 1; numToTry <= 9; numToTry++) {
      if (this.placementIsValid(sudokuPuzzle, curRow, curCol, numToTry)) {
        sudokuPuzzle.squares[curRow][curCol] = numToTry;
        if (this.solveRecurse(sudokuPuzzle)) {
          return true;
        } else {  // Backtrack if no numbers work
          sudokuPuzzle.squares[curRow][curCol] = '.'
        }
      }
    }
    return false  // If no solution is found

  }

  solve(puzzleString) {
    const sudokuPuzzle = new SudokuPuzzle(puzzleString);
    this.solveRecurse(sudokuPuzzle);
    return sudokuPuzzle.toPuzzleString();
  }
}

module.exports = SudokuSolver;

