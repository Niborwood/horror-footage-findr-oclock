import { PASS_SPLASH, SET_CURRENT_MOVIE_DATA } from '../actions';

const initialState = {
  splashPassed: true,
  isLogged: false,
  currentMovie: {},
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
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
