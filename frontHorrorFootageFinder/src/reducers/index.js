import { TO_LOGIN_TRUE, CHOOSE_AN_ANSWER, SWITCH_TO_NEXT_QUESTION } from '../actions';

const initialState = {
  isLogged: false,
  questions: ["qu'est ce que la vie ?", 'chocolatine ou pain au chocolat ?', 'une 3eme question pour la route ?'],
  currentQuestion: 0,
  answers: ['je passe', '42', "déso j'ai aqua-chèvre", 'la réponse D'],
  savedAnswers: [],
  currentAnswers: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case TO_LOGIN_TRUE:
      return {
        ...state,
        isLogged: true,
      };

    case CHOOSE_AN_ANSWER:
      // On vérifie si la réponse à deja était choisis
      if (state.currentAnswers.includes(action.answer)) {
        // On créer une copie du tableau en retirant la réponse
        const reducdedAnswers = state.currentAnswers.filter((answer) => answer !== action.answer);
        // On met a jour le state
        return {
          ...state,
          currentAnswers: reducdedAnswers,
        };
      }
      // Si la réponse n'avait pas encore était choisis on l'ajoute aux currentAnswers
      return {
        ...state,
        currentAnswers: [...state.currentAnswers, action.answer],
      };

    case SWITCH_TO_NEXT_QUESTION:
      return {
        ...state,
        currentQuestion: state.currentQuestion + 1,
        savedAnswers: [...state.savedAnswers, ...state.currentAnswers],
        currentAnswers: [],
      };
    default:
      return state;
  }
};

export default reducer;
