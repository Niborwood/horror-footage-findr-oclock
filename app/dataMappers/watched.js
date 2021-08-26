const client = require('../client');


module.exports = {

    async movieIntoWatched(infos) {
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

}