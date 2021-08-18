const userDataMapper = require('../dataMappers/user');

module.exports = {

    async findUser(request, response) {
        try {
            const user = await userDataMapper.getUserById(request.params.id);
            response.json({data:user});
        } catch (error) {
            console.trace(error);
            response.status(500).json({data: [], error: `Désolé une erreur serveur est survenue, impossible de trouver cette utilisateur, veuillez réessayer ultérieurement.`});
        }
    },

    async getAllDetails(request, response) {
        try {
            const userDetails = await userDataMapper.userWithDetails(request.params.id);
            response.json({data:userDetails});
        } catch (error) {
            console.trace(error);
            response.status(500).json({data: [], error: `Désolé une erreur serveur est survenue, impossible d'obtenir les détails de cet utilisateur, veuillez réessayer ultérieurement.`});
        }
    },

    async userWatchlist(request, response) {
        try {
            const watchlist = await userDataMapper.watchlist(request.params.id);
            response.json({data:watchlist});
        } catch (error) {
            console.trace(error);
            response.status(500).json({data: [], error: `Désolé une erreur serveur est survenue, impossible d'obtenir les détails de cet utilisateur, veuillez réessayer ultérieurement.`});
        }
    }

};