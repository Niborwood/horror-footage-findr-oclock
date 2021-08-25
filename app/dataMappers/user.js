const client = require('../client');


module.exports = {

    // async getUserById(userId) {
    //     const result = await client.query(`SELECT pseudo FROM horror_user WHERE id = $1`, [userId]);
    //     return result.rows[0];
    // },

    async addNewUser(newUser, hash) {
        const result = await client.query(`INSERT INTO horror_user (pseudo, email, password) VALUES
        ($1, $2, $3) RETURNING id`, [newUser.pseudo, newUser.email, hash]);
        return result.rows;
    },

    async logginUser(email) {
        const userLogged = await client.query(`SELECT * FROM horror_user WHERE email=$1`, [email]);
        return userLogged.rows[0];
    },

    async modifyUser(infos, infoId) {
        const userUpdated = await client.query(`UPDATE horror_user
        SET pseudo = $1, email = $2 WHERE id = $3 RETURNING id, pseudo, email`, [infos.pseudo, infos.email, infoId]);
        return userUpdated.rows[0];
    },

    async deleteUser(userId) {
        await client.query(`DELETE FROM horror_user WHERE horror_user.id = $1`, [userId]);
        return;
    },

    async userWithDetails(userId) {
        // Films vus ou dans la watchlist (et liens entre les deux) :
        const result = await client.query('SELECT movie.tmdb_id FROM horror_user_has_movie JOIN movie ON horror_user_has_movie.movie_id = movie.id WHERE horror_user_has_movie.horror_user_id = $1 AND (watchlist = true OR watched = true)', [userId]);
        return result.rows;
    },

    async watchlist(userId) {
        const result = await client.query('SELECT horror_user_has_movie.*, movie.tmdb_id, movie.name FROM horror_user_has_movie JOIN movie ON horror_user_has_movie.movie_id = movie.id JOIN horror_user ON horror_user.id = horror_user_has_movie.horror_user_id WHERE horror_user_has_movie.horror_user_id = $1 AND horror_user_has_movie.watchlist=true', [userId]);
        return result.rows;
    },

    async watchedMovie(userId) {
        const result = await client.query('SELECT watched, rating, movie.tmdb_id, movie.name FROM horror_user_has_movie JOIN movie ON horror_user_has_movie.movie_id = movie.id JOIN horror_user ON horror_user.id = horror_user_has_movie.horror_user_id WHERE horror_user_has_movie.horror_user_id = $1 AND horror_user_has_movie.watched=true', [userId]);
        return result.rows;
    },

    async userRatings(userId) {
        const result = await client.query(`SELECT rating,
        horror_user.pseudo,
        movie.*
        FROM horror_user_has_movie
        JOIN horror_user ON horror_user_has_movie.horror_user_id = horror_user.id
        JOIN movie ON horror_user_has_movie.movie_id = movie.id
        WHERE horror_user.id = $1`, [userId]);
        return result.rows;
    },

    async getRatingMovie(infos) {
        const result = await client.query(`SELECT rating,
        horror_user.pseudo,
        movie.*
        FROM horror_user_has_movie
        JOIN horror_user ON horror_user_has_movie.horror_user_id = horror_user.id
        JOIN movie ON horror_user_has_movie.movie_id = movie.id
        WHERE horror_user.id = $1 AND movie.id = $2`, [infos.id, infos.movieId]);
        return result.rows;
    }

};