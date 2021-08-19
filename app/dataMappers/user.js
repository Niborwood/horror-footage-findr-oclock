const client = require('../client');
const bcrypt = require('bcryptjs');

module.exports = {

    async getUserById(userId) {
        const result = await client.query(`SELECT * FROM horror_user WHERE id = $1`, [userId]);
        return result.rows[0];
    },

    async addNewUser(newUser) {
        const { password } = newUser;
            
        let salt = await bcrypt.genSalt(10);
        let hash = await bcrypt.hash(password, salt);      
          
        console.log('je suis dans le DM', newUser);
        const result = await client.query(`INSERT INTO horror_user (pseudo, email, password) VALUES
        ($1, $2, $3) RETURNING id`, [newUser.pseudo, newUser.email, hash]);
        console.log('datamapper',[newUser.pseudo, newUser.email, hash]);
        return result.rows;
    },

    async deleteUser(userId) {
        await client.query(`DELETE FROM horror_user WHERE horror_user.id = $1`, [userId]);
        return;
    },

    async userWithDetails(userId) {
        // Pour l'instant je renvoie le nom des films de la watchlist, mais je ne suis pas sur que ce soit utile ici ..
        // ET en fait la requête du dessus suffit à récupérer les infos du user ..
        const result = await client.query('SELECT movie.*, horror_user.* FROM horror_user_has_movie JOIN movie ON horror_user_has_movie.movie_id = movie.id JOIN horror_user ON horror_user.id = horror_user_has_movie.horror_user_id WHERE horror_user_has_movie.horror_user_id = $1', [userId]);
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

};