const client = require('../client');

module.exports = {

    async movieIntoWatchlist(infos) {
        const result = await client.query(`INSERT INTO horror_user_has_movie (movie_id, horror_user_id, watchlist) VALUES
        ($1, $2, true) RETURNING movie_id`, [infos.movieId, infos.id]);
        return result.rows[0];
    },

    async movieWatchlist(infos) {
        const result = await client.query(`UPDATE horror_user_has_movie
        SET watchlist=true
        WHERE horror_user_has_movie.movie_id = $1 
        AND horror_user_has_movie.horror_user_id = $2 RETURNING movie_id`, [infos.movieId, infos.id]);        
        return result.rows[0];
    },

    async editMovieWatchlist(infos) {       
        const result = await client.query(`UPDATE horror_user_has_movie
        SET watchlist = NOT watchlist
        WHERE horror_user_has_movie.movie_id = $1 
        AND horror_user_has_movie.horror_user_id = $2 RETURNING horror_user_id`, [infos.movieId, infos.id]);        
        return result.rows[0];
    },
}