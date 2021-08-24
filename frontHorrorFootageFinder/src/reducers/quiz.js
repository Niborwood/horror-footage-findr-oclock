import {
  CHOOSE_AN_ANSWER, SWITCH_TO_NEXT_QUESTION, RESET_QUIZ,
} from '../actions/quiz';

export const initialState = {
  questions: ["qu'est ce que la vie ?", 'chocolatine ou pain au chocolat ?', 'une 3eme question pour la route ?'],
  currentQuestion: 0,
  savedAnswers: [],
  currentAnswers: [
    { value: 'je passe', selected: false },
    { value: 'c\'est 42 !', selected: false },
    { value: "déso j'ai aqua-chèvre", selected: false },
    { value: 'la réponse D', selected: false },
  ],
};

const quizReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHOOSE_AN_ANSWER:
      // On parcours le tableau des réponses fournit par la BDD
      for (let i = 0; i < state.currentAnswers.length; i += 1) {
        // Si l'élement du tableau correspond au bouton cliqué ou switch le "selected"
        if (state.currentAnswers[i].value === action.answer) {
          // eslint-disable-next-line no-param-reassign
          state.currentAnswers[i].selected = !state.currentAnswers[i].selected;
        }
      }
      return state;

    case SWITCH_TO_NEXT_QUESTION: {
      // On garde uniquement les élements selectionés
      const answers = state.currentAnswers.filter((answer) => answer.selected === true);
      // On retire les booléens "selected" des tags pour renvoyer seulement leur value
      const cleanedAnswers = answers.map((answer) => answer.value);

      // JUTSE EN ATTENDANT DE RECEVOIR DE VRAIES DATA ===>
      // on reinititaliste les currentAnswer à la main
      for (let i = 0; i < state.currentAnswers.length; i += 1) {
        // eslint-disable-next-line no-param-reassign
        state.currentAnswers[i].selected = false;
      }

      return {
        ...state,
        savedAnswers: [...state.savedAnswers, ...cleanedAnswers],
        currentQuestion: state.currentQuestion + 1,
      };
    }

    // reset du quizz (action dispatch depuis le MovieButtons)
    case RESET_QUIZ:
      return {
        questions: ["qu'est ce que la vie ?", 'chocolatine ou pain au chocolat ?', 'une 3eme question pour la route ?'],
        currentQuestion: 0,
        savedAnswers: [],
        currentAnswers: [
          { value: 'je passe', selected: false },
          { value: 'c\'est 42 !', selected: false },
          { value: "déso j'ai aqua-chèvre", selected: false },
          { value: 'la réponse D', selected: false },
        ],
      };

    default:
      return state;
  }
};

export default quizReducer;
