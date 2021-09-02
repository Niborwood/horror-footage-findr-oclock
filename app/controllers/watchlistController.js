const watchlistDataMapper = require('../dataMappers/watchlist');
const movieDataMapper = require('../dataMappers/movie');


module.exports = {

    /**
     * Controller to add movie into watchlist of a user
     * @param {Numbers} request userId and tmdbId in params
     * @param {Object} response 
     */
    async addMovieToWatchlist(request, response) {
        try {
            const alreadyIn = await movieDataMapper.movieInTable(request.params);
            console.log('request addwatchlist',request.params);
            if (!alreadyIn) {
                const movieInWatchlist = await watchlistDataMapper.movieIntoWatchlist(request.params);
                response.json({
                    message: 'Tu vas vraiment oser le visionner ?',
                    data: movieInWatchlist
                });
            } else {
                const movieWatchlist = await watchlistDataMapper.movieWatchlist(request.params);
                response.json({
                    message: 'Tu promets que tu vas le regarder hein ?',
                    data: movieWatchlist
                });
            }
        } catch (error) {
            console.trace(error);
            response.status(500).json({
                data: [],
                error: `Bah de toute façon on sait tous que tu ne l'aurais jamais visionner ce film !`
            });
        }
    },

    /**
     * Controller to edit the watchlist (true <-> false)
     * @param {Numbers} request userId and tmdbId in params
     * @param {*} response
     */
    async editMovieWatchlist(request, response) {
        try {
            const editWatchlist = await watchlistDataMapper.editMovieWatchlist(request.params);
            response.json({
                message: 'Elle commence à être longue comme le bras cette liste !',
                data: editWatchlist
            });
        } catch (error) {
            console.trace(error);
            response.status(500).json({
                data: [],
                error: 'Des listes, toujours des listes, fais marcher ta mémoire un peu !'
            });
        }
    }
}