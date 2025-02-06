'use strict';

const SudokuSolver = require('../controllers/sudoku-solver.js');
const SudokuPuzzle = require('../models/sudoku-puzzle.js')

module.exports = function (app) {
  
  let solver = new SudokuSolver();

  app.route('/api/check')
    .post((req, res) => {
      try {
        const puzzleString = req.body.puzzle;
        const coordinate = req.body.coordinate;
        const value = req.body.value;

        if(!req.body.puzzle || !req.body.coordinate || !req.body.value) {
          return res.status(200).json({ error: 'Required field(s) missing' })
        }

        const validationResult = SudokuPuzzle.validatePuzzleString(puzzleString);
        if(validationResult.hasOwnProperty('error')) {
          return res.status(200).json(validationResult);
        }

        if (!SudokuPuzzle.validateCoordinate(coordinate)) {
          return res.status(200).json({ error: 'Invalid coordinate' });
        }

        if(!SudokuPuzzle.validateValue(value)) {
          return res.status(200).json({ error: 'Invalid value' });
        }

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

        const solvedPuzzleString = solver.solve(unsolvedPuzzleString);
        return res.status(200).json({ solution: solvedPuzzleString });
      } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Server error' });
      }
    });
};
