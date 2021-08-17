import { TO_LOGIN_TRUE, CHOOSE_AN_ANSWER, SWITCH_TO_NEXT_QUESTION } from '../actions';

const initialState = {
  isLogged: false,
  questions: ["qu'est ce que la vie ?", 'chocolatine ou pain au chocolat ?', 'une 3eme question pour la route ?'],
  currentQuestion: 0,
  answers: ['je passe', '42', "déso j'ai aqua-chèvre", 'la réponse D'],
  savedAnswers: [],
  currentAnswers: '',
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case TO_LOGIN_TRUE:
      return {
        ...state,
        isLogged: true,
      };
    case CHOOSE_AN_ANSWER:
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
