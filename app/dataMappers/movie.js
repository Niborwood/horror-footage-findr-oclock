const client = require('../client');

module.exports = {

    //! En attente de ma requête en jointure sur les notes d'un film
    // async getBetterMovies() {
        // Ca va être une requête difficile,
        // jointure, avg, round etc LE BONHEUR !!
    //     const result = await client.query(`TAPE ICI TA REQUETE AHAH !`);
    //     return result.rows;
    // },

    async getTheMovie(movieId) {
        const result = await client.query(`SELECT * FROM movie WHERE id = $1`, [movieId]);
        return result.rows[0];
    },

    async allMovies() {
        const result = await client.query(`SELECT * FROM movie`);
        return result.rows;
    },

    async movieIntoWatchlist(infos) {
        console.log(infos);
        const result = await client.query(`INSERT INTO horror_user_has_movie (movie_id, horror_user_id, watchlist) VALUES
        ($1, $2, true)`, [infos.movieId, infos.id]);
        return;
    } 

};