const chai = require("chai");
const chaiHttp = require('chai-http');
const assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', () => {
    /*
    test("Logic handles a valid puzzle string of 81 characters", done => {
        chai.request(SERVER_URL)
            .post('/api/solve')
            .send({ puzzle: '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..'})
            .end((err, res) => {
                assert.notProperty(res.body, 'error');
                done();
            })
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
                        })
                    })
                done();
            })
    });

    test("Logic handles a puzzle string that is not 81 characters long", done => {
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
    */
});

