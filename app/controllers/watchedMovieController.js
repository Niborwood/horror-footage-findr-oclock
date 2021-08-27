const watchedDataMapper = require('../dataMappers/watched');
const movieDataMapper = require('../dataMappers/movie');

module.exports = {

    /**
     * Controller to add movie into watched movies of a user
     * @param {Numbers} request userId and tmdbId in params
     * @param {Object} response 
     */
    async addWatchedMovie(request, response) {
        try {
            const movieInTable = await movieDataMapper.movieInTable(request.params);
            consolge.log('request addwatched',request.params)
            if (!movieInTable) {
                const movieInWatched = await watchedDataMapper.movieIntoWatched(request.params);
                response.json({
                    message: 'Le film a bien été ajouté à la liste des films vus',
                    data: movieInWatched
                });
            } else {
                const movieWatched = await watchedDataMapper.movieWatched(request.params);
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

    /**
     * Controller to edit movies watched (true <-> false)
     * @param {Numbers} request userId and tmdbId in params
     * @param {Object} response 
     */
    async editWatchedMovie(request, response) {
        try {
            const changeWatched = await watchedDataMapper.changeValueWatched(request.params);
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
    }

}