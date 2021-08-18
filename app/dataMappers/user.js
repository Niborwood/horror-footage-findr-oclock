const client = require('../client');

module.exports = {

    async getUserById(userId) {
        const result = await client.query(`Select * FROM horror_user WHERE id = $1`, [userId]);
        return result.rows[0];
    }

};