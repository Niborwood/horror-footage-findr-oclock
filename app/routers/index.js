const express = require('express');

const router = express.Router();

const movieController = require('../controllers/movieController');
const userController = require('../controllers/userController');
const ratingController = require('../controllers/ratingController');
const quizController = require('../controllers/quizController');

// S'il y a des validations et schémas de validation on les exporte ici, comme les controllers :
// ...


// Si on veut stocker des infos en cache avec redis pour renvoyer des infos plus rapidement, on peut require redis ici et lui indiquer diverses choses :
// host, port, auth_pass, prefix, expire ..
// Puis on require le middleware de gestion du cache (qui sera dans services), et ensuite on glisse le middleware avant le controller dans l'appel des routes, TADA !


//! Les routes :
// router.get('/api/v1/selection', movieController.movieSelection); //! En attente de construction de requête ..

router.get('/api/v1/movie/:id', movieController.movieResult);
router.post('/api/v1/movie/:id', movieController.addMovieToWatchlist); //! A reprendre avec Corentin, quand on aura mis en place les tokens :)

router.get('/api/v1/quiz', quizController.quiz);

router.get('/api/v1/user/:id', userController.findUser);

router.get('/api/v1/user/:id/details', userController.getAllDetails);

router.get('/api/v1/user/:id/watchlist', userController.userWatchlist);

module.exports = router;