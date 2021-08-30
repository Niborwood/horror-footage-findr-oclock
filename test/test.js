const assert = require('chai').assert;

const server = "https://horror-footage-api.herokuapp.com/api/v1";

const chai = require('chai');
const chaiHttp = require('chai-http');
chai.should();
chai.use(chaiHttp);



describe('Module to get questions of our quiz', function () {
    const quizModule = require('../app/controllers/quizController');

    describe('Method getAnswersToAQuestion', function () {

        it('Should exists a method getAnswersToAQuestion', function () {
            assert.isFunction(quizModule.getAnswersToAQuestion);
        });
    });
});

describe('Routes of the API', function () {
    /**
     * Test the GET route
     */
    describe('GET /allmovies', () => {
        it("should get all the movies", function (done) {
            chai.request(server)
                .get("/allmovies")
                .end((error, response) => {
                    response.should.have.status(200);
                    done();
                })
        })
    });

    /**
     * Test the GET (by id) route
     */
    describe('GET /movie/:movieId', () => {
        it("should get one movie by ID", function (done) {

            const movieId = 10086;

            chai.request(server)
                .get("/movie/:movieId" + movieId)
                .end((error, response) => {
                    response.should.have.status(200);
                    response.body.should.have.property('id');
                    response.body.should.have.property('name');
                    done();
                })
        })
    });

    /**
     * Test the POST route
     */
     describe('POST /register', () => {
        it("should post new user", function (done) {

            const user = {
                pseudo: "trululu",
                email: "trululu@gmail.fr",
                password: "test"
            };

            chai.request(server)
                .post("/register")
                .send(user)
                .end((error, response) => {
                    response.should.have.status(200);
                done();
                })
        })
    });

    /**
     * Test the PUT route
     */
     describe('PUT /user/:id/rating/movie/:movieId', () => {
        it("should add rating to a movie", function (done) {

            const id = 1;
            const movieId = 10086;
            const rating = {
                rating: 5
            };

            chai.request(server)
                .put("/user/:id/rating/movie/:movieId" + id, movieId)
                .send(rating)
                .end((error, response) => {
                    response.should.have.status(200);
                done();
                })
        })
    });
     
    /**
     * Test the PATCH route
     */
     describe('PATCH /api/v1/user/:id', () => {
        it("should update a user infos", function (done) {

            const id = 3;
            const user = {
                pseudo: "treuleuh",
                email: "trululu@gmail.fr"
            };

            chai.request(server)
                .patch("/api/v1/user/:id" + id)
                .send(user)
                .end((error, response) => {
                    response.should.have.status(200);
                done();
                })
        })
    });

    /**
     * Test the DELETE route
     */
     describe('DELETE /api/v1/user/:id', () => {
        it("should delete a user", function (done) {

            const id = 3;

            chai.request(server)
                .delete("/api/v1/user/:id" + id)
                .end((error, response) => {
                    response.should.have.status(200);
                done();
                })
        })
    });
});