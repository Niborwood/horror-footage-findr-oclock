const userDataMapper = require('../dataMappers/user');
const bcrypt = require('bcryptjs');

//! TOUT CE TRUC DE TOKEN DEVRA SE FAIRE DANS : services/jwt.js
// const jwt = require('express-jwt');
const jsonwebtoken = require('jsonwebtoken');
//! Déplacement du JWTSecret dans le dotenv pour plus de sécurité, à retester donc !
const jwtSecret = process.env.JWT_SECRET;
//! On l'utilise comment ce middleware ensuite ?
const authorizationMiddleware = jwt({
    secret: jwtSecret,
    algorithms: ['HS256']
});
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
            const {
                email,
                password
            } = request.body;

            const logginUser = await userDataMapper.logginUser(email);
            console.log('logginUser.password', logginUser.password);
            console.log('password', password);
            const comparedPassword = await bcrypt.compare(password, logginUser.password);
            console.log('comparedPassword', comparedPassword);
            if (comparedPassword === true) {

                const jwtContent = {
                    userId: logginUser.id
                };
                response.json({
                    data: logginUser,
                    token: jsonwebtoken.sign(jwtContent, jwtSecret)
                });
                return logginUser.id;
            }

        } catch (error) {
            console.trace(error);
            response.status(500).json({
                data: [],
                error: `Désolé une erreur serveur est survenue, impossible de vous connecter, veuillez réessayer ultérieurement.`
            });
        }
    },

    async tokenControl(request, response) {
        try {
            //! Dans le body ou dans header le token ??
            console.log('ce que je recois', request.body);
            const tokenPerso = request.body.token;
            console.log(jwtSecret);
            const userVerified = jsonwebtoken.verify(tokenPerso, jwtSecret, (error, user)=> {
                if(error){
                        console.log('error');
                    }
                        request.user = user;
                    });
                    console.log('verified', userVerified);

        } catch (error) {
            console.trace(error);
            response.status(500).json({
                data: [],
                error: `Désolé une erreur serveur est survenue, impossible de vérifier le token, veuillez réessayer ultérieurement.`
            });
        }
    },

    async addUser(request, response) {
        try {
            const newUser = request.body;
            let salt = await bcrypt.genSalt(10);
            let hash = await bcrypt.hash(newUser.password, salt);

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
            response.json({
                data: movieRating
            });
        } catch {
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
    },

};