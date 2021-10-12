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
                error: `De toute façon, ce sont tous des navets, pas la peine d'en faire une sélection`
            });
        }
    },

    /**
     * Controller to have average of all ratings of one movie
     * @param {Number} request tmdbId in params
     * @param {Object} response 
     */
    async allRatingsMovie(request, response) {
        try {
            const movieId = request.params.movieId;
            const movieRatings = await movieDataMapper.movieRatings(movieId);
            response.json({
                data: movieRatings
            });
        } catch (error) {
            console.trace(error);
            response.status(500).json({
                data: [],
                error: 'Pour avoir des notes il faudrait déjà que des gens aient vu ce film ..'
            });
        }
    },

    /**
     * Controller to have the movie(s) result of the quiz with the average of its ratings
     * @param {Number} request id of the movie in params (tmdbId)
     * @param {Object} response 
     */
    async movieResult(request, response) {
        try {
            const movieId = request.params.movieId;
            const rawMovie = await movieDataMapper.getTheMovie(movieId);
            // On reprend le movie.id à partir de rawMovie et on ajoute un array des value
            
            const movie = {
                id: rawMovie[0].id,
                tags: rawMovie.map(tag => tag.value),
                movieRatings: rawMovie[0].rating,
            };

            response.json(movie);
        } catch (error) {
            console.trace(error);
            response.status(500).json({
                data: [],
                error: `Désolé mais c'est pas ici qu'Harry rencontre Sally ..`
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
                error: 'Tu veux vraiment voir tous ces films ?! Il fait beau dehors, sors !'
            });
        }
    }

};