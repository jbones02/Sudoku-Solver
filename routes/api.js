'use strict';

const SudokuSolver = require('../controllers/sudoku-solver.js');
const SudokuPuzzle = require('../models/sudoku-puzzle.js')

module.exports = function (app) {
  
  let solver = new SudokuSolver();

  const getRow = rowLetter => {
    const rowMap = { a: 0, b: 1, c: 2, d: 3, e: 4, f: 5, g: 6, h: 7, i: 8 };
    return rowMap[rowLetter.toLowerCase()];
  }

  app.route('/api/check')
    .post((req, res) => {
      try {
        if(!req.body.puzzle || !req.body.coordinate || !req.body.value) {
          return res.status(200).json({ error: 'Required field(s) missing' })
        }

        const puzzleString = req.body.puzzle;
        const coordinate = req.body.coordinate;
        const val = req.body.value;

        const validationResult = SudokuPuzzle.validatePuzzleString(puzzleString);
        if(validationResult.hasOwnProperty('error')) {
          return res.status(200).json(validationResult);
        }

        if (!SudokuPuzzle.validateCoordinate(coordinate)) {
          return res.status(200).json({ error: 'Invalid coordinate' });
        }

        if(!SudokuPuzzle.validateValue(val)) {
          return res.status(200).json({ error: 'Invalid value' });
        }

        const rowIndex = getRow(coordinate[0]);
        const colIndex = parseInt(coordinate[1]) - 1;

        const conflict = solver.getConflict(puzzleString, rowIndex, colIndex, val);

        const returnObj = !conflict ? { valid: true } : { valid: false, conflict: conflict };
        return res.status(200).json(returnObj);
      } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Server error' });
      }
    });
    
  app.route('/api/solve')
    .post((req, res) => {
      try {
        if (!req.body.puzzle) {
          return res.status(200).json({ error: 'Required field missing' });
        }

        const unsolvedPuzzleString = req.body.puzzle;
        const validationResult = SudokuPuzzle.validatePuzzleString(unsolvedPuzzleString);
        
        if (validationResult.hasOwnProperty("error")) {
          return res.status(200).json(validationResult);
        }

        const result = solver.solve(unsolvedPuzzleString);
        console.log(unsolvedPuzzleString);
        console.log(result);
        return res.status(200).json(result);
      } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Server error' });
      }
    });
};
