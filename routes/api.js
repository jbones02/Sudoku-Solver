'use strict';

const SudokuSolver = require('../controllers/sudoku-solver.js');

module.exports = function (app) {
  
  let solver = new SudokuSolver();

  app.route('/api/check')
    .post((req, res) => {

    });
    
  app.route('/api/solve')
    .post((req, res) => {
      try {
        if (!res.body.puzzle) {
          return res.status(200).json({ error: 'Required field missing' })
        }

        const unsolvedPuzzleString = res.body.puzzle

        const error = SudokuSolver.validate(unsolvedPuzzleString);

        // If there is an error, return

        const solvedPuzzleString = SudokuSolver.solve(unsolvedPuzzleString);
        return res.status(200).json({ solution: solvedPuzzleString });
      } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Server error' });
      }
    });
};
