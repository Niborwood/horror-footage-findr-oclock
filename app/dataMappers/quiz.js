const client = require('../client');

module.exports = {

    /**
     * Get THE result(s) of the quiz
     * @returns {Object[]}
     */
    async getQuizResults(tags, nbOfTags) {
        // ----- La logique complète est expliquée dans getAnswersToAQuestion, on en reprend une partie ici

        // On initialise l'index des variables à échapper
        let escapedIndex = 0;
        // On initialise les contenus à échapper à donner à client.query
        const escapedData = [];

        let query = `SELECT DISTINCT movie.id 
        FROM movie_has_tag as mt
        INNER JOIN tag 
            ON tag.id = mt.tag_id 
        INNER JOIN movie 
            ON movie.id = mt.movie_id
        WHERE mt.movie_id IN (
        `;

        // On boucle sur l'objet des réponses pour incrémenter les variables
        for (tag in tags) {
            escapedData.unshift(tags[tag]);

            escapedIndex++;

            query += `
            SELECT movie_id 
                FROM movie_has_tag 
            INNER JOIN tag 
                ON tag.id = movie_has_tag.tag_id 
            WHERE tag.value = ANY($${escapedIndex})
            GROUP BY movie_id`;

            if (escapedIndex < nbOfTags) {
                query += `
                INTERSECT
                `;
            }
        }

        // On ajoute enfin la fin de la requête : on referme le WHERE IN
        query += `)`;

        const result = await client.query(query, escapedData);

        return result.rows;
    },

    /**
     * Get tags/answers to the first question of the quiz
     * @returns {Object[]}
     */
    async getAnswersToFirstQuestion() {
        const result = await client.query(`SELECT DISTINCT tag.description, tag.value, tag.id, question.title, question.name 
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
    async getAnswersToAQuestion(questionToAsk, answers) {
        // On initialise l'index des variables à échapper
        let escapedIndex = 0;
        // On initialise les contenus à échapper à donner à client.query
        const escapedData = [parseInt(questionToAsk, 10)];
        // On récupère la longueur du tableau envoyé
        const answersLength = Object.keys(answers).length;

        // On initialise la requête. On joint les tags et la question, et surtout, on va faire se INTERSECT les requêtes dynamiques citées plus bas.
        // Ce qu'on veut faire, c'est récupérer tous les IDs des films qui ont un ou plusieurs tags qui sont dans la question à répondre...
        // ...puis réitérer cette logique pour chaque question. Une fois qu'on a récupéré chaque liste de chaque question, on va faire un INTERSECT entre chaque liste.
        // Cela aura pour effet de ne garder que les IDs de films qui croisent les tags de chaque question, et donc de pouvoir choisir 1 ou plusieurs réponses par question.
        // Par exemple, si la question 1 me renvoie les IDs 1,2,3, et que la question 2 me renvoie les IDs 1,5,6, et que la question 3 me renvoie les IDs 2,8,9...
        // ...le where mt.movie_id IN possèdera uniquement (1,2) puisque ce sont les deux seules valeurs communent entre les 3 listes d'IDs des 3 questions.
        let query = `SELECT DISTINCT tag.description, tag.value, tag.id, question.title, question.name 
        FROM movie_has_tag as mt
        INNER JOIN tag 
            ON tag.id = mt.tag_id 
        INNER JOIN question 
            ON question.id = tag.question_id
        WHERE mt.movie_id IN (
        `;

        // On boucle sur l'objet des réponses pour incrémenter les variables
        for (tag in answers) {
            // On indique les données à échapper sous le format d'un array simple. On verra plus bas comment PSQL les traite
            // Peu importe l'ordre, tant que questionToAsk est à la fin.
            escapedData.unshift(answers[tag]);
            // On incrémente l'index
            escapedIndex++;
            // On incrémente la requête. Cela va nous retourner les ids de films qui correspondent avec l'un des tags indiqués.
            // Grâce à ANY, on peut envoyer un array simple de strings au client.query
            query += `
            SELECT movie_id 
                FROM movie_has_tag 
            INNER JOIN tag 
                ON tag.id = movie_has_tag.tag_id 
            WHERE tag.value = ANY($${escapedIndex})
            GROUP BY movie_id`;

            // On rajoute INTERSECT tant que ce n'est pas la dernière 
            // propriété d'objet pour que la logique décrite plus haut soit bonne
            if (escapedIndex < answersLength) {
                query += `
                INTERSECT
                `;
            }
        }

        // On ajoute enfin la fin de la requête : on referme le WHERE IN et on précise la question dont on a besoin
        query += `
            )
            AND tag.question_id = $${escapedIndex + 1}`;

        const result = await client.query(query, escapedData);

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