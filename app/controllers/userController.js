const userDataMapper = require('../dataMappers/user');
const bcrypt = require('bcryptjs');

const jwtMiddleware = require('../services/jwt');


module.exports = {

    /**
     * Controller to found a user with his id
     * @param {Number} request userId in params
     * @param {Object} response 
     */
    async findUser(request, response) {
        try {
            const user = await userDataMapper.getUserById(request.params.id);
            response.json({
                data: user
            });
        } catch (error) {
            console.trace(error);
            response.status(500).json({
                data: [],
                error: `Désolé une erreur serveur est survenue, impossible de trouver cet utilisateur, veuillez réessayer ultérieurement.`
            });
        }
    },

    /** 
     * Controller to have user with details (userId, token, watchlist and movies watched)
     * @param {Object} request email and password in body
     * @param {Object} response 
     */
    async userLogged(request, response) {
        try {
            console.log('je passe dans mon loggin controller');
            const {
                email,
                password
            } = request.body;

            const logginUser = await userDataMapper.logginUser(email);
            const comparedPassword = await bcrypt.compare(password, logginUser.password);
            
            if (comparedPassword === true) {
                
                //! Appel à la fonction dans jwt.js, qui me renvoie mon token tout chaud :)
                const token = jwtMiddleware.generateAccessToken(logginUser);

                const watchlist = await userDataMapper.watchlist(logginUser.id);
                const resultWatchlist = [...watchlist.map(resultWatchlist => resultWatchlist.tmdb_id)];
                const watchedMovie = await userDataMapper.watchedMovie(logginUser.id);
                const resultWatched = [...watchedMovie.map(resultWatched => resultWatched.tmdb_id)];
                console.log('watchlist', resultWatched);
    
                response.json({
                    data: logginUser,
                    watchlist: [resultWatchlist],
                    watched: [resultWatched],
                    token: token
                });
            }

        } catch (error) {
            console.trace(error);
            response.status(500).json({
                data: [],
                error: `Désolé une erreur serveur est survenue, impossible de vous connecter, veuillez réessayer ultérieurement.`
            });
        }
    },

    /**
     * Controller to add new user in database
     * @param {Oject} request Infos to create new user in body (pseudo, email and password)
     * @param {Oject} response 
     */
    async addUser(request, response) {
        try {
            console.log('request', request.body);
            const newUser = await request.body;
            let salt = await bcrypt.genSalt(10);
            let hash = await bcrypt.hash(newUser.password, salt);
            console.log('hash', hash);
            const userToAdd = await userDataMapper.addNewUser(newUser, hash);

            const userAdded = await userDataMapper.getUserById(userToAdd.id);
            response.json({
                data: userAdded
            });

        } catch (error) {
            console.trace(error);
            response.status(500).json({
                data: [],
                error: `Désolé une erreur serveur est survenue, impossible de créer cet utilisateur, veuillez réessayer ultérieurement.`
            });
        }
    },

    /**
     * Controller to update user infos (pseudo or/and email)
     * @param {Number} request userId in params
     * @param {Object} request new infos of the user in body
     * @param {Object} response 
     */
    async updateUser(request, response) {
        try {
            const infosToModify = request.body;
            const infoId = request.params.id;
            const editUser = await userDataMapper.modifyUser(infosToModify, infoId);
            response.json({
                data: editUser
            });
        } catch (error) {
            console.trace(error);
            response.status(500).json({
                data: [],
                error: `Désolé une erreur serveur est survenue, impossible de mettre à jour cet utilisateur, veuillez réessayer ultérieurement.`
            });
        }
    },

    /**
     * Controller to delete a user 
     * @param {Number} request userId in params
     * @param {Oject} response 
     * @param {*} next to exit of the function if the user doesn't exist
     * @returns 
     */
    async deleteUser(request, response, next) {
        try {

            //! Sécuriser l'accès direct via URL de l'API ..
            //! Récupérer token et décrypter pour chopper l'id du mec à supprimer !!

            const userId = request.params.id;
            const userToDelete = await userDataMapper.getUserById(request.params.id);

            if (!userToDelete) {
                response.json({
                    message: `Cet utilisateur n'existe pas.`
                })
                return next();
            } else {
                await userDataMapper.deleteUser(userId);
                response.json({
                    message: `Utilisateur supprimé avec succès.`
                });
            }


        } catch (error) {
            console.trace(error);
            response.status(500).json({
                data: [],
                error: `Désolé une erreur serveur est survenue, impossible de supprimer cet utilisateur, veuillez réessayer ultérieurement.`
            });
        }
    },

    /**
     * Controller to get details of a user (watched movies or watchlist)
     * @param {Number} request userId in params
     * @param {Object} response 
     */
    async getAllDetails(request, response) {
        try {
            const userDetails = await userDataMapper.userWithDetails(request.params.id);
            
            response.json({
                data: userDetails
            });
        } catch (error) {
            console.trace(error);
            response.status(500).json({
                data: [],
                error: `Désolé une erreur serveur est survenue, impossible d'obtenir les détails de cet utilisateur, veuillez réessayer ultérieurement.`
            });
        }
    },

    /**
     * Controller to have movie and rating given by a user
     * @param {Numbers} request userId and tmdbId in params
     * @param {Object} response 
     */
    async oneRating(request, response) {
        try {
            const infos = request.params;
            const movieRating = await userDataMapper.getRatingMovie(infos);
            response.json({
                data: movieRating
            });
        } catch (error) {
            console.trace(error);
            response.status(500).json({
                data: [],
                error: `Désolé une erreur serveur est survenue, impossible de récupérer la note que cet utilisateur a donné au film, veuillez réessayer ultérieurement.`
            });
        }
    },

    /**
     * Controlle to have all ratings given by one user
     * @param {Number} request userId in params
     * @param {Object} response 
     */
    async allRatings(request, response) {
        try {
            const userId = request.params.id;
            const allUserRatings = await userDataMapper.userRatings(userId);
            response.json({
                data: allUserRatings
            });
        } catch (error) {
            console.trace(error);
            response.status(500).json({
                data: [],
                error: `Désolé une erreur serveur est survenue, impossible de récupérer les notes données par cet utilisateur veuillez réessayer ultérieurement.`
            });
        }
    }

};