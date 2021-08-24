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

    async movieInTable(infos) {
        const result = await client.query(`SELECT * FROM horror_user_has_movie WHERE horror_user_id = $1 AND movie_id = $2`, [infos.id, infos.movieId]);
        return result.rows[0];
    },

    async movieIntoWatchlist(infos) {
        //! AJOUTER UNE VÉRIF DE PRESENCE DANS LA TABLE
        const result = await client.query(`INSERT INTO horror_user_has_movie (movie_id, horror_user_id, watchlist) VALUES
        ($1, $2, true) RETURNING $1`, [infos.movieId, infos.id]);
        return infos.movieId;
    },

    async editMovieWatchlist(infos) {       
        const result = await client.query(`UPDATE horror_user_has_movie
        SET watchlist = NOT watchlist
        WHERE horror_user_has_movie.movie_id = $1 
        AND horror_user_has_movie.horror_user_id = $2 RETURNING horror_user_id`, [infos.movieId, infos.id]);        
        return result.rows[0];
    },

    async movieIntoWatched(infos) {
        //! A VÉRIFIER !!
        const result = await client.query(`INSERT INTO horror_user_has_movie (movie_id, horror_user_id, watchlist, watched) VALUES
        ($1, $2, false, true) RETURNING movie_id`, [infos.movieId, infos.id]);
        return result.rows[0];
    },

    async movieWatched(infos) {
        const result = await client.query(`UPDATE horror_user_has_movie
        SET watched=true
        WHERE horror_user_has_movie.movie_id = $1 
        AND horror_user_has_movie.horror_user_id = $2 RETURNING movie_id`, [infos.movieId, infos.id]);        
        return result.rows[0];
    },

    async changeValueWatched(infos) {
        const result = await client.query(`UPDATE horror_user_has_movie
        SET watched = NOT watched
        WHERE horror_user_has_movie.movie_id = $1 
        AND horror_user_has_movie.horror_user_id = $2 RETURNING horror_user_id`, [infos.movieId, infos.id]);        
        return result.rows[0];
    }

};