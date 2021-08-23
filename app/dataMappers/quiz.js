const client = require('../client');

module.exports = {

    async getTheQuiz() {
        const result = await client.query(`SELECT * FROM tag_question_film`);
        return result.rows;
    }

};