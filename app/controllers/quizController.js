const quizDataMapper = require('../dataMappers/quiz');


module.exports = {

    async searchMovies(request, response) {
        try {
            // Split request.query.tags into an array of strings
            const tags = request.query.tags.split(',');
            const rawResults = await quizDataMapper.getQuizResults(tags, tags.length);

            // On retravaille les données pour qu'il n'y ait plus qu'un array de tmdb_id simple (ex: [1,2,3,4,5])
            const results = [...rawResults.map(result => result.tmdb_id)];
            response.json(results);
        } catch (error) {
            console.trace(error);
            response.status(500).json({data: [], error: 'Désolé une erreur serveur est survenue, impossible de trouver le quiz, veuillez réessayer ultérieurement.'});
        }
    },

    async getAnswersToAQuestion(request, response) {
        try {
            const { questionToAsk, answers } = request.body;
            const rawQuizData = await quizDataMapper.getAnswersToAQuestion(questionToAsk, answers.length, answers);
            const currentQuizData = { 
                question: rawQuizData[0].title,
                answers: rawQuizData.map(answer => ({
                    id: answer.id,
                    description: answer.description,
                    value: answer.value,
                }))
            };

            response.json(currentQuizData);
        } catch (error) {
            console.trace(error);
            response.status(500).json({data: [], error: 'Désolé une erreur serveur est survenue, impossible de trouver les réponses, veuillez réessayer ultérieurement.'});
        }
    }

};