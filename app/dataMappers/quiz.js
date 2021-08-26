const client = require('../client');

module.exports = {

    /**
     * Get THE result(s) of the quiz
     * @returns {Object[]}
     */
    async getQuizResults(tags, nbOfTags) {
        const result = await client.query(`SELECT movie.id
        FROM movie_has_tag 
        INNER JOIN tag 
        ON tag.id = movie_has_tag.tag_id 
        INNER JOIN movie 
        ON movie.id = movie_has_tag.movie_id 
        WHERE tag.value = ANY($1)
        GROUP BY movie.id
        HAVING COUNT(DISTINCT tag.value) >= $2`, [tags, nbOfTags]);
        return result.rows;
    },

    /**
     * Get tags/answers to the first question of the quiz
     * @returns {Object[]}
     */
    async getAnswersToFirstQuestion() {
        const result = await client.query(`SELECT DISTINCT tag.description, tag.value, tag.id, question.title 
            FROM movie_has_tag as mt
            INNER JOIN tag 
            ON tag.id = mt.tag_id 
            INNER JOIN question 
            ON question.id = tag.question_id
            WHERE mt.movie_id IN (
                SELECT movie_id FROM movie_has_TAG 
                INNER JOIN tag 
                ON tag.id = movie_has_tag.tag_id 
                )
            AND tag.question_id = 1`);
        
        return result.rows;
    },

    /**
     * Get tags/answers to the current question
     * @returns {Object[]}
     */
    async getAnswersToAQuestion(questionToAsk, nbOfAnswers, answers) {
        const result = await client.query(`SELECT DISTINCT tag.description, tag.value, tag.id, question.title 
            FROM movie_has_tag as mt
            INNER JOIN tag 
            ON tag.id = mt.tag_id 
            INNER JOIN question 
            ON question.id = tag.question_id
            WHERE mt.movie_id IN (
                SELECT movie_id FROM movie_has_TAG 
                INNER JOIN tag 
                ON tag.id = movie_has_tag.tag_id 
                WHERE tag.value = ANY($1)
                GROUP BY movie_id
                HAVING COUNT(DISTINCT tag.value) >= $2
                )
            AND tag.question_id = $3`, [answers, nbOfAnswers, questionToAsk]);
       
        return result.rows;
    },

    /**
     * Get the number of questions in database
     * @returns {Object}
     */
    async getNumbersOfAnswers() {
        const result = await client.query(`
            SELECT COUNT(id) 
            FROM question`);
        
        return result.rows[0];
    },

};