const client = require('../client');

module.exports = {

    //! En attente de ma requête en jointure sur les notes d'un film
    // async getBetterMovies() {
        // On commence direct dans le dur avec une requête difficile,
        // jointure, avg, round etc LE BONHEUR !!
    //     const result = await client.query(`TAPE ICI TA REQUETE AHAH !`);
    //     return result.rows;
    // },

    async getTheMovie(movieId) {
        const result = await client.query(`Select * FROM movie WHERE id = $1`, [movieId]);
        return result.rows[0];
    }
};