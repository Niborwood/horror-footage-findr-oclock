const client = require('../client');

module.exports = {

    async getTheQuiz() {
        const result = await client.query(`SELECT * FROM question`);
        return result.rows;
    }

};