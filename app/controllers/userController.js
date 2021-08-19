const userDataMapper = require('../dataMappers/user');

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

            console.log(email);
            const logginUser = await userDataMapper.logginUser( email, password );

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
            console.log('reqbody',request.body);
            const newUser = request.body;
            console.log('je passe dans mon controller', newUser);
            const userToAdd = await userDataMapper.addNewUser(newUser);
            console.log('je reviens dans le controller', userToAdd);
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

    async deleteUser(request, response, next) {
        try {

            //! Rajouter un check pour vérifier que l'utilisateur est connecté !!

            const userId = request.params.id;
            const userToDelete = await userDataMapper.getUserById(request.params.id);

            if (!userToDelete) {
                response.json({message: `Cet utilisateur n'existe pas.`})
                return next();
            } else {
                await userDataMapper.deleteUser(userId);
                response.json({message: `Utilisateur supprimé avec succès.`});
            };

        } catch (error) {
            console.trace(error);
            response.status(500).json({
                data: [],
                error: `Désolé une erreur serveur est survenue, impossible de supprimer cet utilisateur, veuillez réessayer ultérieurement.`
            });
        }
    },

    // pour ADD un user :
    // INSERT INTO horror_user ("pseudo", "email", "password") VALUES ('$1', '$2', '$3');

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

    async editMovieWatchlist(request, response) {
        try {

            // Récupérer les infos de la page

            // Vérifier l'état en BDD ?

            // Effectuer les changements


        } catch (error) {
            console.trace(error);
            response.status(500).json({
                data: [],
                error: `Désolé une erreur serveur est survenue, impossible de modifier la watchlist, veuillez réessayer ultérieurement.`
            });
        }
    },

    async userWatchedMovie(request, response, next) {
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
    }

};