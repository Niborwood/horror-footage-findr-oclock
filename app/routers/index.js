const express = require('express');

const router = express.Router();

// Les controllers :
const movieController = require('../controllers/movieController');
const userController = require('../controllers/userController');
const watchlistController = require('../controllers/watchlistController');
const watchedMovieController = require('../controllers/watchedMovieController');
const ratingController = require('../controllers/ratingController');
const quizController = require('../controllers/quizController');
const errorController = require('../controllers/errorController');

// Le middleware de vérification du token avant l'accès aux routes :
const jwtMiddleware = require('../services/jwt');

// Mon schema de vérification des infos du user avec joi :
const validate = require('../validations/validate');
const userSchema = require('../validations/schema/user');
// const updateUserSchema = require('../validations/schema/updateUser');
// const updatePasswordSchema = require('../validations/schema/updatePassword');


// Les routes :

router.get('/api/v1/confirm/:confirmationCode', userController.verifyUser);

router.get('/api/v1/searchmovies', quizController.searchMovies);

router.post('/api/v1/quiz', quizController.getAnswersToAQuestion);

router.get('/api/v1/questions', quizController.getNumberOfQuestions);

/**
 * Return all movies of the API
 * @route GET /allmovies
 * @returns {object} 200 - All movies
 */
router.get('/api/v1/allmovies', movieController.getAllMovies);

router.get('/api/v1/selection/:limit', movieController.movieSelection);

router.post('/api/v1/register', validate('body', userSchema), userController.addUser);

router.post('/api/v1/login', userController.userLogged);

//! Si on met en place le refresh token :
// router.post('/api/v1/refreshtoken', userController.getRefreshToken);

router.route('/api/v1/user/:id')
    .get(userController.findUser)
    .patch(jwtMiddleware.authenticateToken, userController.updateUser) //  validate('body update', updateUserSchema),
    .delete(jwtMiddleware.authenticateToken, userController.deleteUser);

router.patch('/api/v1/user/:id/change', jwtMiddleware.authenticateToken, userController.changePassword); //  validate('body update password', updatePasswordSchema),

router.get('/api/v1/user/:id/details', userController.getAllDetails);

router.route('/api/v1/user/:id/watchlist/:movieId')
    .post(jwtMiddleware.authenticateToken, watchlistController.addMovieToWatchlist)
    .patch(jwtMiddleware.authenticateToken, watchlistController.editMovieWatchlist); 

router.route('/api/v1/user/:id/watched/:movieId')
    .post(jwtMiddleware.authenticateToken, watchedMovieController.addWatchedMovie)
    .patch(jwtMiddleware.authenticateToken, watchedMovieController.editWatchedMovie);

router.route('/api/v1/user/:id/rating/movie/:movieId')
    .put(jwtMiddleware.authenticateToken, ratingController.addRating);

router.get('/api/v1/user/:id/ratings', userController.allRatings);

router.get('/api/v1/user/:id/ratings/movie/:movieId', userController.oneRating);

router.get('/api/v1/movie/:movieId/ratings', movieController.allRatingsMovie);

router.post('/api/v1/quiz', quizController.getAnswersToAQuestion);

router.get('/api/v1/searchmovies', quizController.searchMovies);

router.get('/api/v1/movie/:movieId', movieController.movieResult);

// CSRF TOKEN ROUTE
router.get('/api/v1/csrf-token', userController.getCsrfToken);

router.use(errorController.resourceNotFound);

module.exports = router;