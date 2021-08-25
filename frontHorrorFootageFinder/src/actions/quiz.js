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
export const SAVE_QUESTION_AND_ANSWERS = 'SAVE_QUESTION_AND_ANSWERS';
export const saveQuestionAndAnswers = (question, answers) => ({
  type: SAVE_QUESTION_AND_ANSWERS,
  question,
  answers,
});
// Grâce à Redux-Thunk, on appelle l'API et on enregistre les données
// dans le store grâce à l'action SAVE_QUESTION_AND_ANSWERS
export const loadQuestionAndAnswers = (questionId, answers) => (dispatch) => {
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
      dispatch(saveQuestionAndAnswers(question, controlledAnswers));
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
      const nbOfQuestions = response.data;
      dispatch(loadQuestionsNumber(nbOfQuestions));
    })
    .catch((error) => {
      console.log(error);
    });
};
