const movieDataMapper = require('../dataMappers/movie');
const userDataMapper = require('../dataMappers/user');

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
            response.json({
                data: theMovie
            });
        } catch (error) {
            console.trace(error);
            response.status(500).json({
                data: [],
                error: `Désolé une erreur serveur est survenue, impossible de trouver le film, veuillez réessayer ultérieurement.`
            });
        }
    },

    async addMovieToWatchlist(request, response) {

        try {
            const movieAdded = await movieDataMapper.movieIntoWatchlist(request.params);
            response.json({
                message: 'Le film a bien été ajouté dans la watchlist'
            });
            // Si besoin que je renvoie autre chose que ce message me faire signe ;)

        } catch (error) {
            console.trace(error);
            response.status(500).json({
                data: [],
                error: `Désolé une erreur serveur est survenue, impossible d'ajouter le film dans la watchlist, veuillez réessayer ultérieurement.`
            });
        }
    },

    async getAllMovies(request, response) {
        try {

            const allMovies = await movieDataMapper.allMovies();
            response.json({
                data: allMovies
            });

        } catch (error) {
            console.trace(error);
            response.status(500).json({
                data: [],
                error: `Désolé une erreur serveur est survenue, impossible de rappatrier tous les films, veuillez réessayer ultérieurement.`
            });

        }
    }

};