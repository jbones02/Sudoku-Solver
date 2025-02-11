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

    test('Check a puzzle placement with multiple placement conflicts: POST request to /api/check', done => {
        done();
    });

    test('Check a puzzle placement with all placement conflicts: POST request to /api/check', done => {
        done();
    });

    test('Check a puzzle placement with missing required fields: POST request to /api/check', done => {
        done(); 
    });

    test('Check a puzzle placement with invalid characters: POST request to /api/check', done => {
        done(); 
    });

    test('Check a puzzle placement with invlaid characters POST request to /api/check', done => {
        done();
    });
    
    test('Check a puzzle placement with incorrect length: POST request to /api/check', done => {
        done();
    });

    test('Check a puzzle placement with invalid placement coordinate: POST request to /api/check', done => {
        done();
    });

    test('Check a puzzle placement with invalid placement value: POST request to /api/check', done => {
        done();
    });
});

