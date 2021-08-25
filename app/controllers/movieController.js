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
                error: 'Désolé une erreur serveur est survenue, veuillez réessayer ultérieurement.'
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
                error: 'Désolé une erreur serveur est survenue, impossible de récupérer les notes de ce film, veuillez réessayer ultérieurement.'
            });
        }
    },


    async movieResult(request, response) {
        try {
            const rawMovie = await movieDataMapper.getTheMovie(request.params.tmdbId);
            // On reprend le tmdb_id à partir de rawMovie et on ajoute un array des value
            const movie = rawMovie.map(movie => movie.value);
            response.json(movie);
        } catch (error) {
            console.trace(error);
            response.status(500).json({
                data: [],
                error: 'Désolé une erreur serveur est survenue, impossible de trouver le film, veuillez réessayer ultérieurement.'
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
                error: 'Désolé une erreur serveur est survenue, impossible de rappatrier tous les films, veuillez réessayer ultérieurement.'
            });
        }
    }

};