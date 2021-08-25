const client = require('../client');

module.exports = {

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
    async getTheMovie(movieId) {
        const result = await client.query(`
        SELECT tmdb_id, tag.value FROM movie
        INNER JOIN movie_has_tag mt 
            ON movie.id = mt.movie_id 
        INNER JOIN tag 
            ON tag.id = mt.tag_id
        WHERE tmdb_id = $1`, [movieId]);
        return result.rows;
    },

    async movieRatings(movieId) {
        const result = await client.query(`SELECT rating,
        movie.*
        FROM horror_user_has_movie
        JOIN movie ON horror_user_has_movie.movie_id = movie.id
        WHERE movie.id = $1`, [movieId]);
        return result.rows[0];
    },

    async allMovies() {
        console.log('blop');
        const result = await client.query('SELECT * FROM movie');
        return result.rows;
    },

    async movieInTable(infos) {
        const result = await client.query(`SELECT * FROM horror_user_has_movie WHERE horror_user_id = $1 AND movie_id = $2`, [infos.id, infos.movieId]);
        return result.rows[0];
    }

};