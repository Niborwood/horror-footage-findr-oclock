const client = require('../client');


module.exports = {

    /**
     * Get user by id
     * @returns {Object}
     */
    async getUserById(userId) {
        const result = await client.query(`SELECT id, pseudo, email FROM horror_user WHERE id = $1`, [userId]);
        return result.rows[0];
    },

    /**
     * Get user by email
     * @returns {Object}
     */
     async getUserByEmail(email) {
        const result = await client.query(`SELECT id, pseudo, email, status FROM horror_user WHERE email = $1`, [email]);
        return result.rows[0];
    },

    /**
     * Add new user in database
     * @returns {Object[]}
     */
    async addNewUser(newUser, hash, confirmationCode) {
        const result = await client.query(`INSERT INTO horror_user (pseudo, email, password, code) VALUES
        ($1, $2, $3, $4) RETURNING id`, [newUser.pseudo, newUser.email, hash, confirmationCode]);
        return result.rows[0];
    },

    /**
     * Verify that the code exists in database
     * @returns {Object}
     */
    async findCode(code) {
        const result = await client.query(`SELECT id, pseudo, code FROM horror_user WHERE code = $1`, [code]);
        return result.rows[0];
    },

    /**
     * Change the user status to can log from now
     * @param {Number} id 
     * @returns {Object[]}
     */
    async changeStatus(id) {
        const result = await client.query(`UPDATE horror_user SET status=true WHERE id = $1 RETURNING status`, [id]);
        return result.rows;
    },

    /**
     * Verify if the user who wants to log exists in databse
     * @returns {Object}
     */
    async logginUser(email) {
        const userLogged = await client.query(`SELECT * FROM horror_user WHERE email=$1`, [email]);
        return userLogged.rows[0];
    },

    /**
     * Edit infos of a user 
     * @returns {Object}
     */
    async modifyUser(infos, infoId) {
        const userUpdated = await client.query(`UPDATE horror_user
        SET pseudo = $1, email = $2 WHERE id = $3 RETURNING id, pseudo, email`, [infos.pseudo, infos.email, infoId]);
        return userUpdated.rows[0];
    },

    /**
     * Edit password of the user
     * @returns nothing
     */
    async editPassword(userId, hash) {
        const userUpdated = await client.query(`UPDATE horror_user
        SET password=$1::text WHERE id=$2`, [hash, userId]);
        return;
    },

    /**
     * Delete user in databse
     * @returns nothing
     */
    async deleteUser(userId) {
        await client.query(`DELETE FROM horror_user WHERE horror_user.id = $1`, [userId]);
        return;
    },

    /**
     * Get user with some details about movies in watchlist or in watched movies
     * @returns {Object[]}
     */
    async userWithDetails(userId) {
        const result = await client.query('SELECT movie_id FROM horror_user_has_movie WHERE horror_user_has_movie.horror_user_id = $1 AND (watchlist = true OR watched = true)', [userId]);
        return result.rows;
    },

    /**
     * Get user watchlist (where watchlist = true)
     * @returns {Object[]}
     */
    async watchlist(userId) {
        const result = await client.query('SELECT movie_id FROM horror_user_has_movie WHERE horror_user_has_movie.horror_user_id = $1 AND horror_user_has_movie.watchlist=true', [userId]);
        return result.rows;
    },

    /**
     * Get user watched movies (where watchlist = true)
     * @returns {Object[]}
     */
    async watchedMovie(userId) {
        const result = await client.query('SELECT movie_id FROM horror_user_has_movie WHERE horror_user_has_movie.horror_user_id = $1 AND horror_user_has_movie.watched=true', [userId]);
        return result.rows;
    },

    /**
     * Get all ratings given by a user, with movie infos and user pseudo
     * @returns {Object[]}
     */
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

    /**
     * Get rating of one movie given by one user, with movie infos and user pseudo
     * @returns {Object[]}
     */
    async getRatingMovie(infos) {
        const result = await client.query(`SELECT rating,
        horror_user.pseudo,
        movie.*
        FROM horror_user_has_movie
        JOIN horror_user ON horror_user_has_movie.horror_user_id = horror_user.id
        JOIN movie ON horror_user_has_movie.movie_id = movie.id
        WHERE horror_user.id = $1 AND movie.id = $2`, [infos.id, infos.movieId]);
        return result.rows[0];
    }
};