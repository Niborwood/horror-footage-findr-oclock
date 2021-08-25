const movieDataMapper = require('../dataMappers/movie');

module.exports = {

    async movieSelection(request, response) {
        try {
            const limit = request.params.limit;

            const betterMovies = await movieDataMapper.getBetterMovies(limit);
            response.json({
                data: betterMovies
            });
        } catch (error) {
            console.trace(error);
            response.status(500).json({
                data: [],
                error: `Désolé une erreur serveur est survenue, veuillez réessayer ultérieurement.`
            });
        }
    },

    async allRatingsMovie(request, response) {
        try {
            const movieId = request.params.movieId;
            const movieWithRatings = await movieDataMapper.movieRatings(movieId);
            response.json({
                data: movieWithRatings
            });
        } catch (error) {
            console.trace(error);
            response.status(500).json({
                data: [],
                error: `Désolé une erreur serveur est survenue, impossible de récupérer les notes de ce film, veuillez réessayer ultérieurement.`
            });
        }
    },


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
            const alreadyIn = await movieDataMapper.movieInTable(request.params);

            if (!alreadyIn) {
                const movieInWatchlist = await movieDataMapper.movieIntoWatchlist(request.params);
                response.json({
                    message: 'Le film a bien été ajouté à la watchlist',
                    data: movieInWatchlist
                });
            } else {
                const movieWatchlist = await movieDataMapper.movieWatchlist(request.params);
                response.json({
                    message: 'Le film peut tranquillement passer dans la watchlist',
                    data: movieWatchlist
                });
            }
        } catch (error) {
            console.trace(error);
            response.status(500).json({
                data: [],
                error: `Désolé une erreur serveur est survenue, impossible d'ajouter le film dans la watchlist, veuillez réessayer ultérieurement.`
            });
        }
    },

    async editMovieWatchlist(request, response, next) {
        try {
            const editWatchlist = await movieDataMapper.editMovieWatchlist(request.params);
            response.json({
                message: 'La watchlist a bien été mise à jour',
                data: editWatchlist
            });
            next();
        } catch (error) {
            console.trace(error);
            response.status(500).json({
                data: [],
                error: `Désolé une erreur serveur est survenue, impossible de modifier la watchlist, veuillez réessayer ultérieurement.`
            });
        }
    },

    async addWatchedMovie(request, response) {
        try {
            const movieInTable = await movieDataMapper.movieInTable(request.params);
            if (!movieInTable) {
                const movieInWatched = await movieDataMapper.movieIntoWatched(request.params);
                response.json({
                    message: 'Le film a bien été ajouté à la liste des films vus',
                    data: movieInWatched
                });
            } else {
                const movieWatched = await movieDataMapper.movieWatched(request.params);
                response.json({
                    message: 'Le film peut tranquillement passer à "vu"',
                    data: movieWatched
                });
            }
        } catch (error) {
            console.trace(error);
            response.status(500).json({
                data: [],
                error: `Désolé une erreur serveur est survenue, impossible d'indiquer que le film a été vu, veuillez réessayer ultérieurement.`
            });
        }
    },

    async editWatchedMovie(request, response) {
        try {
            const changeWatched = await movieDataMapper.changeValueWatched(request.params);
            response.json({
                message: 'La valeur de watched a bien été modifiée',
                data: changeWatched
            })

        } catch (error) {
            console.trace(error);
            response.status(500).json({
                data: [],
                error: `Désolé une erreur serveur est survenue, impossible d'indiquer de mettre à jour la valeur de watched, veuillez réessayer ultérieurement.`
            });
        }
    },

    async getAllMovies(_, response) {
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