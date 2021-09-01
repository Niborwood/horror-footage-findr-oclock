const ratingDataMapper = require('../dataMappers/rating');
const movieDataMapper = require('../dataMappers/movie');

module.exports = {

    /**
     * Controller to add and edit rating to a movie 
     * @param {Numbers} request userId and tmdbId in params
     * @param {Object} request the rating of the movie in body
     * @param {Object} response 
     */
    async addRating(request, response) {

        try {
            const relationExists = await movieDataMapper.movieInTable(request.params);

            const rating = request.body.rating;
            const infos = request.params;

            if (!relationExists) {

                const createRelation = await ratingDataMapper.addRelationAndRating(infos, rating);
                response.json({
                    message: `Ca fait du bien d'être celui qui note pour une fois hein ?`,
                    data: createRelation
                })
            } else {
                const relationExistsAlready = await ratingDataMapper.editMovieRating(infos, rating);
                response.json({
                    message: `A ce rythme là c'est bientôt un opéra !`,
                    data: relationExistsAlready
                })
            }

        } catch (error) {
            console.trace(error);
            response.status(500).json({
                data: [],
                error: 'Les premiers seront les derniers alors à quoi bon mettre des notes hein ?'
            });
        }
    }

};