import {
  PASS_SPLASH,
  SET_CURRENT_MOVIE_DATA, SET_CURRENT_MOVIE_PROVIDERS,
  TMDB_LOADED, SET_MOVIE_UNLOADED, SET_CURRENT_MOVIE,
} from '../actions';

const initialState = {
  splashPassed: true,
  currentMovieProviders: {
    loaded: false,
  },
};

const UIreducer = (state = initialState, action) => {
  switch (action.type) {
    case TMDB_LOADED:
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
          [action.dataType]: {
            loaded: false,
          },
        },
      };
    case SET_CURRENT_MOVIE: {
      return {
        ...state,
        [action.movieID]: {
          ...state[action.movieID],
          [action.format]: {
            loaded: true,
            ...action.tmdbData,
          },
        },
      };
    }
    case SET_CURRENT_MOVIE_DATA:
      return {
        ...state,
        [action.movieID]: {
          ...state[action.movieID],
          data: {
            loaded: true,
            ...action.currentMovieData,
          },
        },
      };
    case SET_CURRENT_MOVIE_PROVIDERS:
      return {
        ...state,
        [action.movieID]: {
          ...state[action.movieID],
          providers: {
            loaded: true,
            ...action.currentMovieProviders,
          },
        },
      };

    default:
      return state;
  }
};

export default UIreducer;
