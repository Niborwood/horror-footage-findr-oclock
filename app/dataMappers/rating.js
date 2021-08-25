const client = require('../client');

module.exports = {

    async addRelationAndRating(infos, rating) {
        const result = await client.query(`INSERT INTO horror_user_has_movie (movie_id, horror_user_id, watchlist, watched, rating) VALUES
        ($1, $2, false, false, $3) RETURNING movie_id`, [infos.movieId, infos.id, rating]);
        return result.rows[0];
    },

    async addMovieRating(infos, rating) {
        const result = await client.query(`UPDATE horror_user_has_movie
        SET rating = $3
        WHERE horror_user_has_movie.movie_id = $1 
        AND horror_user_has_movie.horror_user_id = $2 RETURNING movie_id`, [infos.movieId, infos.id, rating]);        
        return result.rows[0];
    }

};