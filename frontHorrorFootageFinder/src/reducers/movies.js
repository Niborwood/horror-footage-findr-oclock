import {
  SET_MOVIE_DATA,
} from '../actions/movies';

const initialState = {};

const moviesReducer = (state = initialState, action) => {
  switch (action.type) {
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

    default:
      return state;
  }
};

export default moviesReducer;
