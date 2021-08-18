const movieDataMapper = require('../dataMappers/movie');

module.exports = {

    //! En attente de ma requête de fou dans le DM
    // async movieSelection(request, response) {
    //     try {

    //         const betterMovies = await movieDataMapper.getBetterMovies();
    //         response.json({data: betterMovies});

    //     } catch(error) {

    //         console.trace(error);
    //         response.status(500).json({data: [], error: `Désolé une erreur serveur est survenue, veuillez réessayer ultérieurement.`});

    //     }
    // }


    async movieResult(request, response) {

        try {           
            const theMovie = await movieDataMapper.getTheMovie(request.params.id);
            response.json({data:theMovie});
        } catch(error) {
            console.trace(error);
            response.status(500).json({data: [], error: `Désolé une erreur serveur est survenue, impossible de trouver le film, veuillez réessayer ultérieurement.`});
        }
    },

    async addMovieToWatchlist(request, response) {

        try {
            const movieIdFromUrl = parseInt(request.params.id, 10);
            // On verra ça plus tard avec les tokens JWT
        } catch (error) {
            console.trace(error);
            response.status(500).json({data: [], error: `Désolé une erreur serveur est survenue, impossible d'ajouter le film dans la watchlist, veuillez réessayer ultérieurement.`});
        }
    }

};