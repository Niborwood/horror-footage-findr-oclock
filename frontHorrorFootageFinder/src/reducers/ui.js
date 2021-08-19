import {
  PASS_SPLASH, SET_CURRENT_MOVIE_DATA, SET_CURRENT_MOVIE_PROVIDERS, TMDB_LOADED,
} from '../actions';

const initialState = {
  splashPassed: true,
  currentMovie: {
    loaded: false,
  },
  currentMovieProviders: {
    loaded: false,
  },
};

const UIreducer = (state = initialState, action) => {
  switch (action.type) {
    case TMDB_LOADED:
      return {
        ...state,
        [action.dataLoaded]: {
          ...state[action.dataLoaded],
          loaded: true,
        },
      };
    case PASS_SPLASH:
      return {
        ...state,
        splashPassed: true,
      };
    case SET_CURRENT_MOVIE_DATA:
      return {
        ...state,
        currentMovie: {
          ...state.currentMovie,
          ...action.currentMovieData,
        },
      };
    case SET_CURRENT_MOVIE_PROVIDERS:
      return {
        ...state,
        currentMovieProviders: {
          ...state.currentMovieProviders,
          ...action.currentMovieProviders,
        },
      };

    default:
      return state;
  }
};

export default UIreducer;
