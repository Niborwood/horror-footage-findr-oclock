const quizDataMapper = require('../dataMappers/quiz');


module.exports = {

    async quiz(request, response) {
        try {
            const quiz = await quizDataMapper.getTheQuiz();
            response.json({data:quiz});
        } catch (error) {
            console.trace(error);
            response.status(500).json({data: [], error: `Désolé une erreur serveur est survenue, impossible de trouver le quiz, veuillez réessayer ultérieurement.`});
        }
    }

};