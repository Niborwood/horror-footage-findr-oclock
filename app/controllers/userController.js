const userDataMapper = require('../dataMappers/user');
const jwt = require('express-jwt');
const jsonwebtoken = require('jsonwebtoken');
const jwtSecret = 'OurSuperLongRandomSecretToSignOurJWTgre5ezg4jyt5j4ui64gn56bd4sfs5qe4erg5t5yjh46yu6knsw4q';
const authorizationMiddleware = jwt({ secret: jwtSecret, algorithms: ['HS256'] });
const jwtOptions = { 
    algorithm: 'HS256', 
    expiresIn: '3h' 
  };

module.exports = {

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

    async userLogged(request, response) {
        try {
            const { email, password } = request.body;
            const logginUser = await userDataMapper.logginUser( email, password );
            const jwtContent = { userId : logginUser.id };
            response.json({
                data: logginUser,
                token: jsonwebtoken.sign(jwtContent, jwtSecret, jwtOptions)
            });
        } catch (error){
            console.trace(error);
            response.status(500).json({
                data: [],
                error: `Désolé une erreur serveur est survenue, impossible de vous connecter, veuillez réessayer ultérieurement.`
            });
        }
    },

    async addUser(request, response) {
        try {
            const newUser = request.body;
            // console.log('je passe dans mon controller', newUser);
            const userToAdd = await userDataMapper.addNewUser(newUser);
            // console.log('je reviens dans le controller', userToAdd);
            const userAdded = await userDataMapper.getUserById(userToAdd.id);
            response.json({data: userAdded});

        }catch (error) {
            console.trace(error);
            response.status(500).json({
                data: [],
                error: `Désolé une erreur serveur est survenue, impossible de créer cet utilisateur, veuillez réessayer ultérieurement.`
            });
        }
    },

    async updateUser(request, response) {
        try {
            const infosToModify = request.body;
            const infoId = request.params.id;
            const editUser = await userDataMapper.modifyUser(infosToModify, infoId);
            response.json({data: editUser});
        } catch (error){
            console.trace(error);
            response.status(500).json({
                data: [],
                error: `Désolé une erreur serveur est survenue, impossible de mettre à jour cet utilisateur, veuillez réessayer ultérieurement.`
            });
        }
    },

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

    async userWatchlist(request, response) {
        try {
            const watchlist = await userDataMapper.watchlist(request.params.id);
            response.json({
                data: watchlist
            });
        } catch (error) {
            console.trace(error);
            response.status(500).json({
                data: [],
                error: `Désolé une erreur serveur est survenue, impossible d'ouvrir la watchlist, veuillez réessayer ultérieurement.`
            });
        }
    },

    async userWatchedMovie(request, response) {
        try {
            const watchedMovie = await userDataMapper.watchedMovie(request.params.id);

            response.json({
                data: watchedMovie
            });

        } catch (error) {
            console.trace(error);
            response.status(500).json({
                data: [],
                error: `Désolé une erreur serveur est survenue, impossible d'accéder aux films déjà vus, veuillez réessayer ultérieurement.`
            });
        }
    },

    async oneRating(request, response) {
        try {
            const infos = request.params;
            const movieRating = await userDataMapper.getRatingMovie(infos);
            response.json({data: movieRating});
        }catch {
            console.trace(error);
            response.status(500).json({
                data: [],
                error: `Désolé une erreur serveur est survenue, impossible de récupérer la note que cet utilisateur a donné au film, veuillez réessayer ultérieurement.`
            });
        }
    },

    async allRatings(request, response) {
        try {
            const userId = request.params.id;
            const allUserRatings = await userDataMapper.userRatings(userId);
            response.json({data: allUserRatings});
        } catch(error) {
            console.trace(error);
            response.status(500).json({
                data: [],
                error: `Désolé une erreur serveur est survenue, impossible de récupérer les notes données par cet utilisateur veuillez réessayer ultérieurement.`
            });
        }
    },

};