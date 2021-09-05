const client = require('../client');

module.exports = {

    /**
     * Get the X movies with better ratings, order by AVG AND number of ratings
     * @returns {Object[]}
     */
    async getBetterMovies(limit) {
        const result = await client.query(`SELECT AVG(rating),
        count(rating),
        movie.id
        FROM horror_user_has_movie
        JOIN movie ON horror_user_has_movie.movie_id = movie.id
        WHERE rating IS NOT NULL
        GROUP BY movie.id
        ORDER BY AVG(rating) DESC, count(rating) DESC
        LIMIT $1`, [limit]);
        return result.rows;
    },

    /**
     * Get the movie depending of his id
     * @returns {Object[]}
     */
    async getTheMovie(movieId) {
        const result = await client.query(`SELECT mt.movie_id AS id, 
        tag.value, AVG(rating) AS rating 
        FROM movie_has_tag mt 
        INNER JOIN tag 
        ON tag.id = mt.tag_id
        LEFT JOIN horror_user_has_movie huhm ON huhm.movie_id = mt.movie_id 
        GROUP BY mt.movie_id, tag.value
        HAVING mt.movie_id = $1`, [movieId]);
        return result.rows;
    },

    /**
     *  Get average of all rating of a movie
     * @returns {Object}
     */
    async movieRatings(movieId) {
        const result = await client.query(`SELECT AVG(rating) AS rating
        FROM horror_user_has_movie
        WHERE movie_id = $1`, [movieId]);
        return result.rows[0];
    },

    /**
     * Get all movie in the database
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
        const result = await client.query(`SELECT horror_user_has_movie
        FROM horror_user_has_movie
        WHERE horror_user_id = $1
        AND movie_id = $2`, [infos.id, infos.movieId]);
        return result.rows[0];
    }

};