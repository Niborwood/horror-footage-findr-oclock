const ratingDataMapper = require('../dataMappers/rating');
const movieDataMapper = require('../dataMappers/movie');

module.exports = {

    /**
     * Controller to add rating to a movie 
     * @param {Numbers} request userId and movieId in params
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
                    message: 'La relation a bien été crée, et la note ajoutée',
                    data: createRelation
                })
            } else {
                const relationExistsAlready = await ratingDataMapper.addMovieRating(infos, rating);
                response.json({
                    message: 'La note a bien été ajoutée',
                    data: relationExistsAlready
                })
            }

        } catch (error) {
            console.trace(error);
            response.status(500).json({
                data: [],
                error: 'Désolé une erreur serveur est survenue, impossible d\'ajouter une note à ce film, veuillez réessayer ultérieurement.'
            });
        }
    },

    /**
     * Controller to edit the rating of a movie
     * @param {Number} request userId and movieId in params
     * @param {Object} request rating of the movie in body
     * @param {Object} response 
     */
    async editRating(request, response) {
        try {
            const rating = request.body.rating;
            const infos = request.params;

            const editRating = await ratingDataMapper.addMovieRating(infos, rating);
            response.json({
                message: 'La note a bien été mise à jour',
                data: editRating
            });
        } catch (error) {
            console.trace(error);
            response.status(500).json({
                data: [],
                error: 'Désolé une erreur serveur est survenue, impossible de modifier la note de ce film, veuillez réessayer ultérieurement.'
            });
        }
    }

};