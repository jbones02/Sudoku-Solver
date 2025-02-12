const chai = require("chai");
const chaiHttp = require('chai-http');
const assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

const SERVER_URL = 'http://localhost:3000'

suite('Functional Tests', () => {
    test('Solve a puzzle with valid puzzle string: POST request to /api/solve', done => {
        chai.request(SERVER_URL)
            .post('/api/solve')
            .send({ puzzle: '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..'})
            .end((err, res) => {
                const correctResObj = { solution: '769235418851496372432178956174569283395842761628713549283657194516924837947381625'}
                assert.deepEqual(res.body, correctResObj);
                done();
            })
    });

    test('Solve a puzzle with missing puzzle string: POST request to /api/solve', done => {
        chai.request(SERVER_URL)
            .post('/api/solve')
            .send({})
            .end((err, res) => {
                const correctResObj = { error: 'Required field missing'};
                assert.deepEqual(res.body, correctResObj);
                done();
            });
    });

    test("Logic handles a puzzle string with invalid characters", done => {
        chai.request(SERVER_URL)
            .post('/api/solve')
            .send({ puzzle: 'p.9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..'})
            .end((err, res) => {
                const correctResObj = { error: 'Invalid characters in puzzle' }
                assert.deepEqual(correctResObj, res.body);
                chai.request(SERVER_URL)
                    .post('/api/solve')
                    .send({ puzzle: '..9..5.1.85.4....2432......1...69.83.9,....6.62.71...9......1945....4.37.4.3..6..' })
                    .end((err, res) => {
                        assert.deepEqual(correctResObj, res.body);
                        chai.request(SERVER_URL)
                        .post('/api/solve')
                        .send({ puzzle: '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6./' })
                        .end((err, res) => {
                            assert.deepEqual(correctResObj, res.body);
                        });
                    });
                done();
            });
    });

    test('Solve a puzzle with incorrect length: POST request to /api/solve', done => {
        chai.request(SERVER_URL)
        .post('/api/solve')
        .send({ puzzle: '..9..5.1.85.4....2432......1...69.83.9....6.62.71...9......1945....4.37.4.3..6..' })  // 1 character short
        .end((err, res) => {
            const correctResObj = { error: 'Expected puzzle to be 81 characters long' };
            assert.deepEqual(correctResObj, res.body);
            chai.request(SERVER_URL)
            .post('/api/solve')
            .send({ puzzle: '23.' })
            .end((err, res) => {
                assert.deepEqual(correctResObj, res.body);
                chai.request(SERVER_URL)
                .post('/api/solve')
                .send({ puzzle: '.' })
                .end((err, res) => {
                    assert.deepEqual(correctResObj, res.body);
                    chai.request(SERVER_URL)
                    .post('/api/solve')
                    .send({ puzzle: '1' })
                    .end((err, res) => {
                        assert.deepEqual(correctResObj, res.body);
                        done();
                    })
                })
            })
        })
    });

    test('Solve a puzzle that cannot be solved: POST request to /api/solve', done => {
        chai.request(SERVER_URL)
            .post('/api/solve')
            .send({ puzzle: '..95.5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..' })
            .end((err, res) => {
                const correctResObj = { error: 'Puzzle cannot be solved' };
                assert.deepEqual(res.body, correctResObj);
                done();
            })
    });

    test('Check a puzzle placement with all fields: POST request to /api/check', done => {
        chai.request(SERVER_URL)
        .post('/api/check')
        .send({ 
            puzzle: '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..',
            coordinate: 'A9',
            value: '8'
        })
        .end((err, res) => {
            const correctResObj = { valid: true }
            assert.deepEqual(res.body, correctResObj);
        })
        done();
    });

    test('Check a puzzle placement with single placement conflict: POST request to /api/check', done => {
        // When row is invalid
        chai.request(SERVER_URL)
        .post('/api/check')
        .send({ 
            puzzle: '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..',
            coordinate: 'A7',
            value: '9'
        })
        .end((err, res) => {
            let correctResObj = { valid: false, conflict: ['row'] }
            assert.deepEqual(res.body, correctResObj);
            
            // When column is invalid
            chai.request(SERVER_URL)
                .post('/api/check')
                .send({
                    puzzle: '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..',
                    coordinate: 'E4',
                    value: '3'
                })
                .end((err, res) => {
                    let correctResObj = { valid: false, conflict: ['column'] }
                    assert.deepEqual(res.body, correctResObj);

                    // When region is invalid
                    chai.request(SERVER_URL)
                        .post('/api/check')
                        .send({
                            puzzle: '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..',
                            coordinate: 'G5',
                            value: '3'
                        })
                        .end((err, res) => {
                            let correctResObj = { valid: false, conflict: ['region'] }
                            assert.deepEqual(res.body, correctResObj);
                            done();
                        })
                })
        })
    });

    test('Check a puzzle placement with multiple placement conflicts: POST request to /api/check', done => {
        // When row and column are invalid
        chai.request(SERVER_URL)
            .post('/api/check')
            .send({
                puzzle: '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..',
                coordinate: 'D4',
                value: '3'
            })
            .end((err, res) => {
                let correctResObj = { valid: false, conflict: ['row', 'column'] };
                assert.deepEqual(res.body, correctResObj, 'Failed to detect invalid row and column');

                // When row and region are invalid
                chai.request(SERVER_URL)
                    .post('/api/check')
                    .send({
                        puzzle: '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..',
                        coordinate: 'B5',
                        value: '4'
                    })
                    .end((err, res) => {
                        let correctResObj = { valid: false, conflict: ['row', 'region'] };
                        assert.deepEqual(res.body, correctResObj, 'failed to detect invalid row and region');

                        // When column and region are invalid
                        chai.request(SERVER_URL)
                            .post('/api/check')
                            .send({
                                puzzle: '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..',
                                coordinate: 'C6',
                                value: '5'
                            })
                            .end((err, res) => {
                                let correctResObj = { valid: false, conflict: ['column', 'region'] };
                                assert.deepEqual(res.body, correctResObj, 'Failed to dtect invalid column and region');
                                done();
                            })
                    })
            });
    });

    test('Check a puzzle placement with all placement conflicts: POST request to /api/check', done => {
        chai.request(SERVER_URL)
        .post('/api/check')
        .send({
            puzzle: '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..',
            coordinate: 'E5',
            value: '6'
        })
        .end((err, res) => {
            const correctResObj = { valid: false, conflict: ['row', 'column', 'region'] };
            assert.deepEqual(res.body, correctResObj);
            done();
        });
    })

    test('Check a puzzle placement with missing required fields: POST request to /api/check', done => {
        const correctResObj = { error: 'Required field(s) missing' };

        // When puzzle is missing
        chai.request(SERVER_URL)
            .post('/api/check')
            .send({
                coordinate: 'E5',
                value: '6'
            })
            .end((err, res) => {
                assert.deepEqual(res.body, correctResObj, 'Failed to handle missing puzzle');

                // When coordinate is missing
                chai.request(SERVER_URL)
                    .post('/api/check')
                    .send({
                        puzzle: '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..',
                        value: '5'
                    })
                    .end((err, res) => {
                        assert.deepEqual(res.body, correctResObj, 'Failed to handle missing coordinate');

                        // When value is missing
                        chai.request(SERVER_URL)
                            .post('/api/check')
                            .send({
                                puzzle: '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..',
                                coordinate: 'C6',
                            })
                            .end((err, res) => {
                                assert.deepEqual(res.body, correctResObj, 'Failed to handle missing value');
                                done();
                            })
                    })
            })
    });

    test('Check a puzzle placement with invalid characters: POST request to /api/check', done => {
        // Invalid character in puzzle
        chai.request(SERVER_URL)
            .post('/api/check')
            .send({
                puzzle: '..9..5.1.85.4....2432...p..1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..',
                coordinate: 'A1',
                value: '7'
            })
            .end((err, res) => {
                const correctResObj = { error: 'Invalid characters in puzzle' }
                assert.deepEqual(res.body, correctResObj);
                done();
            })
    });
    
    test('Check a puzzle placement with incorrect length: POST request to /api/check', done => {
        chai.request(SERVER_URL)
            .post('/api/check')
            .send({
                puzzle: '..9..5.1.85.4....2432....1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..',
                coordinate: 'A1',
                value: '7'
            })
            .end((err, res) => {
                const correctResObj = { error: 'Expected puzzle to be 81 characters long' }
                assert.deepEqual(res.body, correctResObj, 'Failed to detect puzzle too short');
                done();
            });
    });

    test('Check a puzzle placement with invalid placement coordinate: POST request to /api/check', done => {
        chai.request(SERVER_URL)
        .post('/api/check')
        .send({
            puzzle: '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..',
            coordinate: 'J1',
            value: '7'
        })
        .end((err, res) => {
            const correctResObj = { error: 'Invalid coordinate' };
            assert.deepEqual(res.body, correctResObj);
            done();
        });
    });

    test('Check a puzzle placement with invalid placement value: POST request to /api/check', done => {
        chai.request(SERVER_URL)
        .post('/api/check')
        .send({
            puzzle: '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..',
            coordinate: 'A1',
            value: '.'
        })
        .end((err, res) => {
            const correctResObj = { error: 'Invalid value' };
            assert.deepEqual(res.body, correctResObj)
            done();
        });
    });
});

