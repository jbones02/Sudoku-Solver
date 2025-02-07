const chai = require('chai');
const SudokuPuzzle = require('../models/sudoku-puzzle.js');
const assert = chai.assert;

const SudokuSolver = require('../controllers/sudoku-solver.js');
let solver = new SudokuSolver;

const SERVER_URL = 'http://localhost:3000'

suite('Unit Tests', () => {
    test('Logic handles a valid puzzle string of 81 characters', done => {
        let result = SudokuPuzzle.validatePuzzleString('..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..');
        assert.deepEqual(result, {});
        
        result = SudokuPuzzle.validatePuzzleString('53..7....6..195....98....6.8...6...34..8..3..7...2...6.6....28....419..5....8..79');
        assert.deepEqual(result, {});
      
        result = SudokuPuzzle.validatePuzzleString('....1.38....5....6.....3.9.....4....8..9.2..3....8....2.4.....6....9....83.6.....');
        assert.deepEqual(result, {});
      
        done();
      });
      

    test('Logic handles a puzzle string with invalid characters', done => {
        const correctResObj = { error: 'Invalid characters in puzzle' };
        let result = SudokuPuzzle.validatePuzzleString('A.9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..');
        assert.deepEqual(result, correctResObj, 'Puzzle string with capital letters should not pass validation');

        result = SudokuPuzzle.validatePuzzleString('..9..5.1.85.4....2@32......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..');
        assert.deepEqual(result, correctResObj, 'Puzzle string with special characters should not pass validation');

        result = SudokuPuzzle.validatePuzzleString('..9..5.1.85.4....2432.. ...1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..');
        assert.deepEqual(result, correctResObj, 'Puzzle string with spaces should not pass validation');

        result = SudokuPuzzle.validatePuzzleString('..9..5.1.85.4....24+2......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..');
        assert.deepEqual(result, correctResObj, 'Puzzle string with operators should not pass validation');

        result = SudokuPuzzle.validatePuzzleString('..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......\t945....4.37.4.3..6..');
        assert.deepEqual(result, correctResObj, 'Puzzle string with non-printable characters should not pass validation');

        done();
    });

    test('Logic handles a puzzle string that is not 81 characters long', done => {
        const correctResObj = { error: 'Expected puzzle to be 81 characters long' };
        let result = SudokuPuzzle.validatePuzzleString('..9..5.1.85.4....2432......1...69.83.9....6.62.71...9......1945....4.37.4.3..6..');
        assert.deepEqual(result, correctResObj, 'Puzzle string 1 character too short should not pass validation');

        result = SudokuPuzzle.validatePuzzleString('.2385');
        assert.deepEqual(result, correctResObj, 'Very short puzzle strings should not pass validation');

        result = SudokuPuzzle.validatePuzzleString('2');
        assert.deepEqual(result, correctResObj, 'Puzzle string that is single digit should not pass validation');

        result = SudokuPuzzle.validatePuzzleString('.');
        assert.deepEqual(result, correctResObj, 'Puzzle string that is single . should not pass validation');
        done();
    });

    test('Logic handles a valid row placement', done => {
        const puzzle = new SudokuPuzzle('..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..');
        let result = solver.rowPlacementIsValid(puzzle, 4, 1, 6);
        assert.equal(result, true, 'Failed to validate row when all placements are valid');

        result = solver.rowPlacementIsValid(puzzle, 0, 0, 7);
        assert.equal(result, true, 'Failed to validate row placement when column placement is invalid');

        result = solver.rowPlacementIsValid(puzzle, 0, 3, 2);
        assert.equal(result, true, 'Failed to validate row placement when region placement is invalid');

        result = solver.rowPlacementIsValid(puzzle, 1, 4, 4);
        assert.equal(result, true, 'Failed to validate row placement when column and region placements are invalid');
        done();
    });

    test('Logic handles an invalid row placement', done => {
        const puzzle = new SudokuPuzzle('..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..');
        let result = solver.rowPlacementIsValid(puzzle, 0, 4, 9);
        console.log('result: ', result);
        assert.equal(result, false);
        done();
    });

    test('Logic handles a valid column placement', done => {
        const puzzle = new SudokuPuzzle('..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..');
        let result = solver.colPlacementIsValid(puzzle, 4, 1, 9);
        assert.equal(result, true, 'Failed to validate column when all placements are valid');

        result = solver.colPlacementIsValid(puzzle, 4, 6, 9);
        assert.equal(result, true, 'Failed to validate column when row is invalid');

        result = solver.colPlacementIsValid(puzzle, 6, 5, 8);
        assert.equal(result, true, 'Failed to validate column when region is invalid');

        result = solver.colPlacementIsValid(puzzle, 4, 1, 4);
        assert.equal(result, true, 'Failed to validate column when row and region are invalid');
    });

    test('Logic handles an invalid column placement', done => {

    });

    test('Logic handles valid region placement', done => {

    });

    test('Logic handles an invalid region placement', done => {
        
    });

    test('Valid puzzle strings pass the solver', done => {

    });

    test('Invalid puzzle strings fail the solver', done => {

    });

    test('Solver returns the expected solution for an incomplete puzzle', done => {

    });
});
