const SudokuPuzzle = require('../models/sudoku-puzzle.js')

class SudokuSolver {
  rowPlacementIsValid(sudokuPuzzle, rowIndex, colIndex, val) {
    let squaresInRow = [...sudokuPuzzle.squares[rowIndex]];
    squaresInRow[colIndex] = '.';  // Exclude square being checked
    console.log('result in function: ', !squaresInRow.includes(val.toString()));
    return !squaresInRow.includes(val.toString());
}

  colPlacementIsValid(sudokuPuzzle, rowIndex, colIndex, val) {
    let squaresInCol = [];

    // Get vals in col being checked
    for (let curRow = 0; curRow < sudokuPuzzle.DIMENSIONS; curRow++) {
      squaresInCol.push(sudokuPuzzle.squares[curRow][colIndex]);
    }
    squaresInCol[rowIndex] = '.'  // Exclude square being checked

    return !squaresInCol.includes(val.toString());
  }

  getRegionNumber(row, col) {
    return Math.floor(row /3) * 3 + Math.floor(col / 3);
  }

  getSquaresInRegion(sudokuPuzzle, regionNumber, rowIndex, colIndex) {
    let squaresInRegion = [];

    const startRow = Math.floor(regionNumber / 3) * 3;
    const startCol = (regionNumber % 3) * 3;

    for (let curRow = 0; curRow < 3; curRow++) {
      for (let curCol = 0; curCol < 3; curCol++) {
        if ((startRow + curRow) === rowIndex && (startCol + curCol) === colIndex) {  // Exclude square being checked
          squaresInRegion.push('.');
        } else {
          squaresInRegion.push(sudokuPuzzle.squares[startRow + curRow][startCol + curCol]);
        }

      }
    }

    return squaresInRegion;
  }

  regionPlacementIsValid(sudokuPuzzle, rowIndex, colIndex, val) {
    const regionNumber = this.getRegionNumber(rowIndex, colIndex)
    let squaresInRegion = this.getSquaresInRegion(sudokuPuzzle, regionNumber, rowIndex, colIndex);
    return !squaresInRegion.includes(val.toString());
  }

  placementIsValid(sudokuPuzzle, rowIndex, colIndex, val) {
    return  this.rowPlacementIsValid(sudokuPuzzle, rowIndex, colIndex, val) &&
            this.colPlacementIsValid(sudokuPuzzle, rowIndex, colIndex, val) &&
            this.regionPlacementIsValid(sudokuPuzzle, rowIndex, colIndex, val);
  }

  solveRecurse(sudokuPuzzle) {
    // Get index of next empty space
    let curSquareIndices = sudokuPuzzle.getNextEmptySquareIndices();
    if (!curSquareIndices) {
      return true;
    }

    let curRow = curSquareIndices.row;
    let curCol = curSquareIndices.col;

    // Try all possible nums in empty space
    for (let numToTry = 1; numToTry <= 9; numToTry++) {
      const numToTryStr = numToTry.toString();
      
      if (this.placementIsValid(sudokuPuzzle, curRow, curCol, numToTryStr)) {
        sudokuPuzzle.squares[curRow][curCol] = numToTryStr;
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
    const isSolved = this.solveRecurse(sudokuPuzzle);
    if (!isSolved) return { error: 'Puzzle cannot be solved' }
    return { solution: sudokuPuzzle.toPuzzleString() };
  }

  getConflict(puzzleString, rowIndex, colIndex, val) {
    const sudokuPuzzle = new SudokuPuzzle(puzzleString);
    let conflicts = []

    if (!this.rowPlacementIsValid(sudokuPuzzle, rowIndex, colIndex, val)) conflicts.push('row');
    if (!this.colPlacementIsValid(sudokuPuzzle, rowIndex, colIndex, val)) conflicts.push('column');
    if (!this.regionPlacementIsValid(sudokuPuzzle, rowIndex, colIndex, val)) conflicts.push('region');

    return conflicts.length === 0 ? null : conflicts;
  }
}

module.exports = SudokuSolver;

