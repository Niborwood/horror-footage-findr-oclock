import {
  CHOOSE_AN_ANSWER, SWITCH_TO_NEXT_QUESTION,
  SAVE_QUESTION_AND_ANSWERS,
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

    case SAVE_QUESTION_AND_ANSWERS:
      return {
        ...state,
        question: action.question,
        currentAnswers: action.answers,
      };

    case SWITCH_TO_NEXT_QUESTION: {
      // On garde uniquement les élements selectionés
      const answers = state.currentAnswers.filter((answer) => answer.selected === true);
      // On retire les booléens "selected" des tags pour renvoyer seulement leur value
      const cleanedAnswers = answers.map((answer) => answer.value);

      return {
        ...state,
        savedAnswers: [...state.savedAnswers, ...cleanedAnswers],
        currentQuestion: state.currentQuestion + 1,
      };
    }

    default:
      return state;
  }
};

export default quizReducer;
