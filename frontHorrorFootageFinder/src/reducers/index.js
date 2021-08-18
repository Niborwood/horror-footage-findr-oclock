import {
  CHOOSE_AN_ANSWER, SWITCH_TO_NEXT_QUESTION, PASS_SPLASH, SET_CURRENT_MOVIE_DATA,
} from '../actions';

const initialState = {
  questions: ["qu'est ce que la vie ?", 'chocolatine ou pain au chocolat ?', 'une 3eme question pour la route ?'],
  currentQuestion: 0,
  savedAnswers: [],
  splashPassed: true,
  currentMovie: {},
  currentAnswers: [
    { value: 'je passe', selected: false },
    { value: '42', selected: false },
    { value: "déso j'ai aqua-chèvre", selected: false },
    { value: 'la réponse D', selected: false },
  ],
};

const reducer = (state = initialState, action) => {
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

    case PASS_SPLASH:
      return {
        ...state,
        splashPassed: true,
      };
    case SET_CURRENT_MOVIE_DATA:
      return {
        ...state,
        currentMovie: action.currentMovieData,
      };

    default:
      return state;
  }
};

export default reducer;
