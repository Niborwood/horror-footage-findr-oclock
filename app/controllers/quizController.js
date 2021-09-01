const quizDataMapper = require('../dataMappers/quiz');


module.exports = {

    /**
     * Controller to search movie(s) with tags in params
     * @param {String} request tags to find movie(s) in params
     * @param {Object} response 
     */
    async searchMovies(request, response) {
        try {
            // On transforme le string de chaque tag, séparé par des virgules, en tableau
            const tags = request.query;
            for (const key in tags) {
                if (tags.hasOwnProperty(key)) {
                    tags[key] = tags[key].split(',');
                }
            }
            // On récupère la longueur de l'objet de tags
            const nbOfTags = Object.keys(tags).length;

            // On envoie les infos au datamapper
            const rawResults = await quizDataMapper.getQuizResults(tags, nbOfTags);

            // On retravaille les données pour qu'il n'y ait plus qu'un array d'IDs simple (ex: [1,2,3,4,5])
            const results = [...rawResults.map(result => result.id)];
            response.json(results);
        } catch (error) {
            console.trace(error);
            response.status(500).json({ data: [], error: `Bah les quiz c'est pour les intellos, vas plutot jouer de la tronçonneuse !` });
        }
    },

    /**
     * Controller to get question depending on the answers already received, if there is previous question, else an other method is called 
     * @param {Object} request answers' tag, number of answers and questionId
     * @param {Object} response 
     */
    async getAnswersToAQuestion(request, response) {
        try {
            const { questionToAsk, answers } = request.body;
            let rawQuizData;
            // Si la question posée est la première, on appelle la méthode getAnswersToFirstQuestion
            if (parseInt(questionToAsk, 10) === 1) {
                rawQuizData = await quizDataMapper.getAnswersToFirstQuestion();
            }
            // Sinon, on appelle la méthode getAnswersToQuestion
            else {
                rawQuizData = await quizDataMapper.getAnswersToAQuestion(questionToAsk, answers);
            }
            const currentQuizData = {
                question: {
                    title: rawQuizData[0].title,
                    name: rawQuizData[0].name,
                },
                answers: rawQuizData.map(({ id, description, value }) => ({
                    id,
                    description,
                    value,
                }))
            };


            response.json(currentQuizData);
        } catch (error) {
            console.trace(error);
            response.status(500).json({ data: [], error: `La vie, la mort, j't'en pose des questions moi ?` });
        }
    },

    /**
     * Controller to know how much questions are in database
     * @param {_} request no request
     * @param {Object} response 
     */
    async getNumberOfQuestions(_, response) {
        try {
            // Split request.query.tags into an array of strings
            const rawResults = await quizDataMapper.getNumbersOfAnswers();
            const result = parseInt(rawResults, 10);
            const fakeResult = 6;
            response.json(fakeResult);
        } catch (error) {
            console.trace(error);
            response.status(500).json({ data: [], error: `J'ai plus d'doigts, j'peux pas compter .. Désolée !` });
        }
    }


};