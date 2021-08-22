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

    async getTheMovie(movieId) {
        const result = await client.query(`SELECT * FROM movie WHERE id = $1`, [movieId]);
        return result.rows[0];
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
        const result = await client.query(`SELECT * FROM movie`);
        return result.rows;
    },

    async movieIntoWatchlist(infos) {
        const result = await client.query(`INSERT INTO horror_user_has_movie (movie_id, horror_user_id, watchlist) VALUES
        ($1, $2, true) RETURNING $1`, [infos.movieId, infos.id]);
        return infos.movieId;
    },

    //! A tester !!
    async editMovieWatchlist(infos) {
        const trueOrFalse = await client.query(`SELECT watchlist FROM horror_user_has_movie WHERE watchlist = true AND movie_id = $1 AND horror_user_id = $2`, [infos.movieId, infos.id]);

        console.log(trueOrFalse);

        if (trueOrFalse) {
        const result = await client.query(`UPDATE horror_user_has_movie SET watchlist = true WHERE movie_id = $1 AND horror_user_id = $2 RETURNING $2`, [infos.movieId, infos.id]);
        
        return infos.movieId;

        } else {
            const result = await client.query(`UPDATE horror_user_has_movie SET watchlist = false WHERE movie_id = $1 AND horror_user_id = $2 RETURNING $2`, [infos.movieId, infos.id]);
            
            return infos.movieId;
        }

    }

};