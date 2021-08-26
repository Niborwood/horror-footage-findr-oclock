import api from '../utils/api';

// Quiz Action
export const CHOOSE_AN_ANSWER = 'CHOOSE_AN_ANSWER';
export const SWITCH_TO_NEXT_QUESTION = 'SWITCH_TO_NEXT_QUESTION';

export const chooseAnAnswser = (updatedAnswerID) => ({
  type: CHOOSE_AN_ANSWER,
  updatedAnswerID,
});

export const switchToNextQuestion = () => ({
  type: SWITCH_TO_NEXT_QUESTION,
});

// -------------- Chargement d'une question et de ses réponses --------------
// On enregistre dans le store les questions et les réponses correspondants à la question actuelle
export const LOAD_QUESTION_AND_ANSWERS = 'LOAD_QUESTION_AND_ANSWERS';
export const loadQuestionAndAnswers = (question, answers) => ({
  type: LOAD_QUESTION_AND_ANSWERS,
  question,
  answers,
});
// Grâce à Redux-Thunk, on appelle l'API et on enregistre les données
// dans le store grâce à l'action LOAD_QUESTION_AND_ANSWERS
export const fetchQuestionAndAnswers = (questionId, answers) => (dispatch) => {
  api.post('/quiz/', {
    questionToAsk: questionId,
    answers,
  })
    .then((response) => {
      const { question, answers: newAnswers } = response.data;
      // On rajoute à action.answers une propriété booléenne "selected"
      // pour savoir si l'utilisateur a déjà répondu à la question
      const controlledAnswers = newAnswers.map((answer) => ({
        ...answer,
        selected: false,
      }));
      dispatch(loadQuestionAndAnswers(question, controlledAnswers));
    })
    .catch((error) => {
      console.log(error);
    });
};

// -------------- Chargement du nombre des questions --------------
// On enregistre dans le store le nombre de questions
export const SAVE_QUESTIONS_NUMBER = 'SAVE_QUESTIONS_NUMBER';
export const saveQuestionsNumber = (nbOfQuestions) => ({
  type: SAVE_QUESTIONS_NUMBER,
  nbOfQuestions,
});
// Grâce à Redux-Thunk, on appelle l'API et on enregistre le nombre de questions
// dans le store grâce à l'action LOAD_QUESTIONS_NUMBER
export const loadQuestionsNumber = () => (dispatch) => {
  api.get('questions/')
    .then((response) => {
      const { data: nbOfQuestions } = response;
      dispatch(saveQuestionsNumber(nbOfQuestions));
    })
    .catch((error) => {
      console.log(error);
    });
};

// -------------- Chargement des réponses --------------
// On enregistre dans le store les ids TMDB des résultats du quiz et on nettoie le state
export const END_QUIZ = 'END_QUIZ';
export const endQuiz = (tmdbIDs) => ({
  type: END_QUIZ,
  tmdbIDs,
});
// Grâce à Redux-Thunk, on appelle l'API TMDB et on enregistre les réponses
// dans le store grâce à l'action END_QUIZ
export const fetchQuizResults = (tags) => (dispatch) => {
  api.get('/searchmovies/', {
    params: {
      tags,
    },
  })
    .then((response) => {
      const { data: tmdbIDs } = response;
      dispatch(endQuiz(tmdbIDs));
    })
    .catch((error) => {
      console.log(error);
    });
};
// reset quiz (en test)
export const RESET_QUIZ = 'RESET_QUIZ';
export const resetQuiz = () => ({
  type: RESET_QUIZ,
});
