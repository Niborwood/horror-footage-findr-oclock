const client = require('../client');

module.exports = {

    /**
     * Get the X movies with better ratings
     * @returns {Object[]}
     */
    async getBetterMovies(limit) {
        const result = await client.query(`SELECT AVG(rating) AS rating,
        movie.tmdb_id
        FROM horror_user_has_movie
        JOIN movie ON horror_user_has_movie.movie_id = movie.id
        GROUP BY movie.tmdb_id
        ORDER BY AVG(rating) DESC
        LIMIT $1`, [limit]);
        return result.rows;
    },

    // Robin !
    /**
     * Get the movie depending of his tmdb_id
     * @returns {Object[]}
     */
    async getTheMovie(movieId) {
        const result = await client.query(`SELECT tmdb_id, tag.value FROM movie
        INNER JOIN movie_has_tag mt 
        ON movie.id = mt.movie_id 
        INNER JOIN tag 
        ON tag.id = mt.tag_id
        WHERE tmdb_id = $1`, [movieId]);
        return result.rows;
    },

    /**
     *  Get all rating of a movie
     * @returns {Object}
     */
    async movieRatings(movieId) {
        const result = await client.query(`SELECT rating, movie.*
        FROM horror_user_has_movie
        JOIN movie ON horror_user_has_movie.movie_id = movie.id
        WHERE movie.id = $1`, [movieId]);
        return result.rows[0];
    },

    /**
     * Ge t all movie in the database
     * @returns {Object[]}
     */
    async allMovies() {
        const result = await client.query('SELECT * FROM movie');
        return result.rows;
    },

    /**
     * Verify if the movie is already in the table or not
     * @returns {Object}
     */
    async movieInTable(infos) {
        const result = await client.query(`SELECT * FROM horror_user_has_movie WHERE horror_user_id = $1 AND movie_id = $2`, [infos.id, infos.movieId]);
        return result.rows[0];
    }

};