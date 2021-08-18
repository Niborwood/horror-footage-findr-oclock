const client = require('../client');

module.exports = {

    async getUserById(userId) {
        const result = await client.query(`SELECT * FROM horror_user WHERE id = $1`, [userId]);
        return result.rows[0];
    },

    async userWithDetails(userId) {
        // Pour l'instant je renvoie le nom des films de la watchlist, mais je ne suis pas sur que ce soir utile ici ..
        // ET en fait la requête du dessus suffit à récupérer les infos du user ..
        const result = await client.query('SELECT movie.name, horror_user.pseudo, horror_user.email, horror_user.password FROM horror_user_has_movie JOIN movie ON horror_user_has_movie.movie_id = movie.id JOIN horror_user ON horror_user.id = horror_user_has_movie.horror_user_id WHERE horror_user_has_movie.horror_user_id = $1', [userId]);
        return result.rows;
    },

    async watchlist(userId) {
        const result = await client.query('SELECT watchlist, rating, movie.tmdb_id, movie.name FROM horror_user_has_movie JOIN movie ON horror_user_has_movie.movie_id = movie.id JOIN horror_user ON horror_user.id = horror_user_has_movie.horror_user_id WHERE horror_user_has_movie.horror_user_id = $1', [userId]);
        return result.rows;
    },

    async watchedMovie(userId) {
        const result = await client.query('SELECT watched, rating, movie.tmdb_id, movie.name FROM horror_user_has_movie JOIN movie ON horror_user_has_movie.movie_id = movie.id JOIN horror_user ON horror_user.id = horror_user_has_movie.horror_user_id WHERE horror_user_has_movie.horror_user_id = $1 AND horror_user_has_movie.watched=true', [userId]);
        return result.rows;
    }, 

};