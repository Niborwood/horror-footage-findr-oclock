const express = require('express');

const router = express.Router();

// J'importe mes controllers :
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

// Routes pour trouver un film via son ID, et pour l'ajouter à une watchlist :
router.get('/api/v1/movie/:id', movieController.movieResult);
router.post('/api/v1/movie/:id', movieController.addMovieToWatchlist); //! A reprendre avec Corentin, quand on aura mis en place les tokens :)

// Route pour récupérer toutes les questions du quiz :
router.get('/api/v1/quiz', quizController.quiz);

// Route pour récupérer TOUS les films de la base de données :
router.get('/api/v1/allmovies', movieController.getAllMovies);

// Rooute pour ajouter un user :
router.post('/api/v1/register', userController.addUser);

// Route pour qu'un utilisateur se connecte :
router.post('api/v1/login', userController.userLogged);

// Routes pour trouver un utilisateur et pour le supprimer :
router.get('/api/v1/user/:id', userController.findUser); 
router.delete('/api/v1/user/:id', userController.deleteUser); //! AJOUTER vérification utilisateur connecté

// Route pour obtenir tous les détails d'un utilisateur, ainsi que toutes les infosde s films présents dans sa watchlist :
router.get('/api/v1/user/:id/details', userController.getAllDetails);

// Route pour consulter les films présents dans la watchlist d'un utilisateur :
router.get('/api/v1/user/:id/watchlist', userController.userWatchlist);

// Route pour modifier des infos d'un film de la watchlist (l'enlever, le rajouter) :  //! A FAIRE
router.post('/api/v1/user/:id/watchlist/:movieId', userController.editMovieWatchlist); //! ATTENTION, ne pas supprimer un film de la watchlist (juste le passer à false) sinon on perd la relation horror_user_has_movie !!

// Route pour afficher les films ayant été vu par l'utilisateur : 
router.get('/api/v1/user/:id/watched', userController.userWatchedMovie);

module.exports = router;