import {
  CHOOSE_AN_ANSWER, SWITCH_TO_NEXT_QUESTION,
  LOAD_QUESTION_AND_ANSWERS, SAVE_QUESTIONS_NUMBER,
  END_QUIZ,
} from '../actions/quiz';

export const initialState = {
  // Intitulé de la question en cours (envoyée par l'API)
  question: '',
  // Etape du quiz
  currentQuestion: 1,
  // Tableau des réponses déjà prononcées par l'utilisateur
  savedAnswers: [],
  // Tableau des réponses à la question en cours (envoyées par l'API)
  currentAnswers: [],
  numberOfQuestions: 1,
  numberOfAnswers: 0,
  quizCompleted: false,
};

const quizReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHOOSE_AN_ANSWER: {
    // On mappe sur les réponses du state pour retourner
    // les réponses avec la sélection de l'utilisateur suivant l'id de l'élément
    // passé en paramètre
      const updatedAnswers = state.currentAnswers.map((answer) => {
        // Si l'ID matche avec l'élément de la liste, on inverse sa propriété selected
        if (answer.id === action.updatedAnswerID) {
          return { ...answer, selected: !answer.selected };
        }
        // Sinon, on retourne l'élément de la liste brut
        return answer;
      });

      return {
        ...state,
        currentAnswers: updatedAnswers,
      };
    }

    case LOAD_QUESTION_AND_ANSWERS:
      return {
        ...state,
        question: action.question,
        currentAnswers: action.answers,
        numberOfAnswers: action.answers.length,
      };

    case SAVE_QUESTIONS_NUMBER:
      return {
        ...state,
        numberOfQuestions: action.nbOfQuestions,
      };

    case SWITCH_TO_NEXT_QUESTION: {
      let answers;
      // On garde uniquement les élements selectionés
      answers = state.currentAnswers.filter((answer) => answer.selected === true);
      // Si aucune réponse n'est sélectionnée, on les sélectionne toutes
      if (answers.length === 0) {
        //! Version pour sélectionner plusieurs bonnes réponses
        // answers = state.currentAnswers.map((answer) => ({ ...answer, selected: true }));
        //! Version simplifiée à effacer : on sélectionne la 1ere réponse
        answers = state.currentAnswers.map((answer, index) => {
          if (index === 0) {
            return { ...answer, selected: !answer.selected };
          }
          return answer;
        });
      }

      // On retire les paramètres superflus des tags pour renvoyer seulement leur value
      const cleanedAnswers = answers.map((answer) => answer.value);

      return {
        ...state,
        savedAnswers: [...state.savedAnswers, ...cleanedAnswers],
        currentQuestion: state.currentQuestion + 1,
        numberOfAnswers: 0,
      };
    }

    case END_QUIZ:
      return {
        ...state,
        currentAnswers: [],
        currentQuestion: 1,
        question: '',
        quizCompleted: true,
      };

    default:
      return state;
  }
};

export default quizReducer;
