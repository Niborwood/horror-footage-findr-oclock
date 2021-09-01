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
            console.log('request addwatched',request.params);
            if (!movieInTable) {
                const movieInWatched = await watchedDataMapper.movieIntoWatched(request.params);
                response.json({
                    message: `Ouah t'as vu ce film sérieux ?`,
                    data: movieInWatched
                });
            } else {
                const movieWatched = await watchedDataMapper.movieWatched(request.params);
                response.json({
                    message: `"vu" ça veut dire sans les mains devant les yeux tu sais ?`,
                    data: movieWatched
                });
            }
        } catch (error) {
            console.trace(error);
            response.status(500).json({
                data: [],
                error: `De toute façon on ne te croyais pas, personne n'a vus ce film !`
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
                message: `Tu changes d'avis comme de chemise, non ?`,
                data: changeWatched
            })

        } catch (error) {
            console.trace(error);
            response.status(500).json({
                data: [],
                error: `Vu ou pas vu, l'important c'est que tu saches que ce film existe, merci à nous !`
            });
        }
    }

}