import {
  PASS_SPLASH, SET_CURRENT_MOVIE_DATA, SET_CURRENT_MOVIE_PROVIDERS, TOGGLE_LOADING,
} from '../actions';

const initialState = {
  splashPassed: true,
  currentMovie: {},
  loading: false,
};

const UIreducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_LOADING:
      return {
        ...state,
        loading: true,
      };
    case PASS_SPLASH:
      return {
        ...state,
        splashPassed: true,
      };
    case SET_CURRENT_MOVIE_DATA:
      return {
        ...state,
        currentMovie: action.currentMovieData,
        loading: false,
      };
    case SET_CURRENT_MOVIE_PROVIDERS:
      return {
        ...state,
        currentMovieProviders: action.currentMovieProviders,
        loading: false,
      };

    default:
      return state;
  }
};

export default UIreducer;
