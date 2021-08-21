import {
  PASS_SPLASH, SET_CURRENT_MOVIE_DATA, SET_CURRENT_MOVIE_PROVIDERS, TMDB_LOADED, SET_MOVIE_UNLOADED,
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
      //! Bouger ça vers le movie_id nouvellement créé (passer l'id dans le payload ?)
      return {
        ...state,
        [action.movieID]: {
          ...state[action.movieID],
          loaded: true,
        },
      };
    case PASS_SPLASH:
      return {
        ...state,
        splashPassed: true,
      };
    case SET_MOVIE_UNLOADED:
      return {
        ...state,
        [action.movieID]: {
          loaded: false,
        },
      };
    case SET_CURRENT_MOVIE_DATA:
      return {
        ...state,
        [action.currentMovieData.id]: {
          loaded: true,
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
