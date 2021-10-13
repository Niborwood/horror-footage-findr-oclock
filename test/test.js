const assert = require('chai').assert;

const server = "https://horror-footage-api.herokuapp.com/api/v1";
// const server = "http://localhost/3001";

const chai = require('chai');
const chaiHttp = require('chai-http');
chai.should();
chai.use(chaiHttp);



describe('User module', function () {
    const userModule = require('../app/controllers/userController');

    describe('Method addUser', function () {

        it('Should exists a method addUser', function () {
            assert.isFunction(userModule.addUser);
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

            chai.request(server)
                .get("/movie/:movieId")
                .set('content-type', 'application/json')
                .send({movieId: 10086})
                .end((error, response) => {
                    response.body.should.be.a('object');
                    done();
                })
        })
    });

    /**
     * Test the POST route
     */
    describe('POST /register', () => {
        it("should post new user", function (done) {

            chai.request(server)
                .post("/register")
                .set('content-type', 'application/json')
                .send({
                    pseudo: "trululu",
                    email: "trululu@gmail.fr",
                    password: "test"
                })
                .end((error, response) => {
                    response.body.should.be.a('object');
                    done();
                })
        })
    });

    /**
     * Test the PUT route
     */
    describe('PUT /user/:id/rating/movie/:movieId', () => {
        it("should add rating to a movie", function (done) {

            chai.request(server)
                .put("/user/:id/rating/movie/:movieId")
                .set('content-type', 'application/json')
                .send({
                    rating: 2,
                    id: 1,
                    movieId: 10086,
                })
                .end((error, response) => {
                    response.should.be.a('object');
                    done();
                })
        })
    });

    /**
     * Test the PATCH route
     */
    describe('PATCH /api/v1/user/:id', () => {
        it("should update a user infos", function (done) {

           chai.request(server)
                .patch("/api/v1/user/:id")
                .send({
                    id: 3,
                    pseudo: "treuleuh",
                    email: "trululu@gmail.fr"
                })
                .end((error, response) => {
                    response.should.be.a('object');
                    done();
                })
        })
    });

    /**
     * Test the DELETE route
     */
    describe('DELETE /api/v1/user/:id', () => {
        it("should delete a user", function (done) {
    
            chai.request(server)
                .delete("/api/v1/user/:id")
                .send({
                    id: 3
                })
                .end((error, response) => {
                    response.should.be.a('object');
                    done();
                })
        })
    });
});