const client = require('../client');

module.exports = {

    async getQuizResults(tags, nbOfTags) {
        const result = await client.query(`SELECT tmdb_id
        FROM movie_has_tag 
        INNER JOIN tag 
        ON tag.id = movie_has_tag.tag_id 
        INNER JOIN movie 
        ON movie.id = movie_has_tag.movie_id 
        WHERE tag.value = ANY($1)
        GROUP BY tmdb_id
        HAVING COUNT(DISTINCT tag.value) >= $2`, [tags, nbOfTags]);
        return result.rows;
    },

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
    }

};