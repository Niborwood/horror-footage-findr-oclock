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

            if (!alreadyIn) {
                const movieInWatchlist = await watchlistDataMapper.movieIntoWatchlist(request.params);
                response.json({
                    message: 'Le film a bien été ajouté à la watchlist',
                    data: movieInWatchlist
                });
            } else {
                const movieWatchlist = await watchlistDataMapper.movieWatchlist(request.params);
                response.json({
                    message: 'Le film peut tranquillement passer dans la watchlist',
                    data: movieWatchlist
                });
            }
        } catch (error) {
            console.trace(error);
            response.status(500).json({
                data: [],
                error: 'Désolé une erreur serveur est survenue, impossible d\'ajouter le film dans la watchlist, veuillez réessayer ultérieurement.'
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
                message: 'La watchlist a bien été mise à jour',
                data: editWatchlist
            });
        } catch (error) {
            console.trace(error);
            response.status(500).json({
                data: [],
                error: 'Désolé une erreur serveur est survenue, impossible de modifier la watchlist, veuillez réessayer ultérieurement.'
            });
        }
    }
}