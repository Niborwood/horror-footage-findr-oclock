const movieDataMapper = require('../dataMappers/movie');

module.exports = {

    /**
     * Controller to have the movies with best ratings
     * @param {Number} request with the number of Best Movies to send in params
     * @param {Object} response 
     */
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

    /**
     * Controller to have all ratings of one movie
     * @param {Number} request tmdbId in params
     * @param {Object} response 
     */
    async allRatingsMovie(request, response) {
        try {
            const movieId = request.params.tmdbId;
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

    /**
     * Controller to have the movie(s) result of the quiz
     * @param {Number} request tmdb_id of the movie in params (tmdbId)
     * @param {Object} response 
     */
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

    /**
     * Controller to get all movies 
     * @param {*} _ Request not used
     * @param {Object} response 
     */
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