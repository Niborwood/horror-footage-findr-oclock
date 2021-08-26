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
            let rawQuizData;
            // Si la question posée est la première, on appelle la méthode getAnswersToFirstQuestion
            if (questionToAsk === 1) {
                rawQuizData = await quizDataMapper.getAnswersToFirstQuestion();
            }
            // Sinon, on appelle la méthode getAnswersToQuestion
            else {
                rawQuizData = await quizDataMapper.getAnswersToAQuestion(questionToAsk, answers.length, answers);
            }
            const currentQuizData = { 
                question: rawQuizData[0].title,
                answers: rawQuizData.map(({id, description, value}) => ({
                    id,
                    description,
                    value,
                }))
            };

            response.json(currentQuizData);
        } catch (error) {
            console.trace(error);
            response.status(500).json({data: [], error: 'Désolé une erreur serveur est survenue, impossible de trouver les réponses, veuillez réessayer ultérieurement.'});
        }
    },

    async getNumberOfQuestions(request, response) {
        try {
            // Split request.query.tags into an array of strings
            const rawResults = await quizDataMapper.getNumbersOfAnswers();
            const result = parseInt(rawResults, 10);
            const fakeResult = 6;
            response.json(fakeResult);
        } catch (error) {
            console.trace(error);
            response.status(500).json({data: [], error: 'Désolé une erreur serveur est survenue, impossible de trouver le quiz, veuillez réessayer ultérieurement.'});
        }
    },

};