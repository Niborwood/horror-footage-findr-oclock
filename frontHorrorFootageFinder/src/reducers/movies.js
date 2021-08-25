import {
  SET_MOVIE_DATA, SET_TOP_MOVIES, SET_MOVIE_TAGS,
} from '../actions/movies';

import {
  END_QUIZ,
} from '../actions/quiz';

const initialState = {
  topMovies: {
    loaded: false,
  },
  quizResults: [],
};

const moviesReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_TOP_MOVIES:
      return {
        ...state,
        topMovies: {
          loaded: true,
          tmdbIDs: action.movies,
        },
      };

    // Ce case sert à la fois à enregistrer les datas et les providers de chaque film.
    case SET_MOVIE_DATA: {
      return {
        //   On retourne le state précédent (state.movies)
        ...state,
        // On récupère l'id dynamique du film qu'on vient insérer dans le state.
        // Ex: state.movies.123.
        [action.movieID]: {
          // On récupère et insère les données du film 123, s'il y en a déjà.
          ...state[action.movieID],
          // On insère un paramètre spécifique pour chaque film, en l'occurence, data ou providers.
          // Par ex: state.movies.123.data | state.movies.123.providers.
          [action.format]: {
            // On insère les données de TMDB dans le state.
            // Ex: state.movies.123.data.movie_title | state.movies.123.providers.rent
            ...action.tmdbData,
          },
        },
      };
    }

    // Ce case sert à enregistrer les tags d'un film.
    case SET_MOVIE_TAGS: {
      return {
        ...state,
        [action.movieID]: {
          ...state[action.movieID],
          // On insère les données de notre api dans le state.
          // Ex: state.movies.123.tags
          tags: action.tags,
        },
      };
    }

    // On gère l'intégration des IDs TMDB dans le state.
    case END_QUIZ: {
      return {
        ...state,
        quizResults: action.tmdbIDs,
      };
    }

    default:
      return state;
  }
};

export default moviesReducer;
