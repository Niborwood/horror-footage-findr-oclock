const client = require('../client');

module.exports = {

    /**
     * Add movie into watchlist of a user, create the relation between the user and the movie
     * @returns {Object}
     */
    async movieIntoWatchlist(infos) {
        const result = await client.query(`INSERT INTO horror_user_has_movie (movie_id, horror_user_id, watchlist) VALUES
        ($1, $2, true) RETURNING movie_id`, [infos.movieId, infos.id]);
        return result.rows[0];
    },

    /**
     * Switch watchlist to true if the relation between the user and the movie already exists
     * @returns {Object}
     */
    async movieWatchlist(infos) {
        const result = await client.query(`UPDATE horror_user_has_movie
        SET watchlist=true
        WHERE horror_user_has_movie.movie_id = $1 
        AND horror_user_has_movie.horror_user_id = $2 RETURNING movie_id`, [infos.movieId, infos.id]);        
        return result.rows[0];
    },

    /**
     * Change de value watchlist (true <-> false) of a movie
     * @returns {Object}
     */
    async editMovieWatchlist(infos) {       
        const result = await client.query(`UPDATE horror_user_has_movie
        SET watchlist = NOT watchlist
        WHERE horror_user_has_movie.movie_id = $1 
        AND horror_user_has_movie.horror_user_id = $2 RETURNING horror_user_id`, [infos.movieId, infos.id]);        
        return result.rows[0];
    },
}