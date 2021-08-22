// Movies Actions
import api, { tmdbAPI } from '../utils/api';

// Fonction d'écriture du top 3 de la page d'accueil dans le state
export const SET_TOP_MOVIES = 'SET_TOP_MOVIES';
export const setTopMovies = (movies) => ({
  type: SET_TOP_MOVIES,
  movies,
});

// Middleware pour récupérer le top 3 depuis l'API HFF
// via Redux-Thunk
//! Add catch logic !
export const getTopMovies = (nbOfMovies) => (dispatch) => {
  api.get(`https://horror-footage-api.herokuapp.com/api/v1/selection/${nbOfMovies}`)
    .then((response) => {
      // On récupère la data (id et tmdbId)
      const { data: { data } } = response;
      // On filtre pour ne sortir que les tmdbIDs dans un array simple
      const topTmdbMovies = data.map(({ tmdb_id: tmdbID }) => (tmdbID));
      dispatch(setTopMovies(topTmdbMovies));
    }).catch((error) => {
      console.log(error);
    });
};

// Fonction d'écriture des données API des films dans le state
export const SET_MOVIE_DATA = 'SET_MOVIE_DATA';
export const setCurrentMovie = (movieID, tmdbData, format) => ({
  type: SET_MOVIE_DATA,
  movieID,
  tmdbData,
  format,
});

// Middleware pour récupérer les données depuis l'API tierce TMDB (movieInfo, movieProviders)
// via Redux-Thunk
//! Add catch logic !
export function fetchMovie(movieID, format) {
  // On conditionne les paramètres de requêtes (API, langage)
  const requestAPI = `?api_key=${process.env.REACT_APP_TMDB_API_KEY}`;
  const requestLocale = '&language=fr-FR';

  // On construit le coeur de la requête selon les données qu'on souhaite obtenir
  // et l'ID TMDB du film souhaité
  let requestData;
  switch (format) {
    case 'data':
      requestData = `movie/${movieID}`;
      break;

    case 'providers':
      requestData = `movie/${movieID}/watch/providers`;
      break;

    default:
      break;
  }

  // On assemble la requête complète
  const request = requestData + requestAPI + requestLocale;

  return (dispatch) => {
    // On execute la requête, grâce au constructeur axios.create()
    tmdbAPI.get(request)
      .then((response) => {
        // Selon le format de données souhaités,
        // on conditionne là où chercher les datas dans response
        // on transfère le format (data, providers...) pour que le reducer sache où ranger l'info
        switch (format) {
          case 'data':
            dispatch(setCurrentMovie(movieID, response.data, format));
            break;

          case 'providers':
            dispatch(setCurrentMovie(movieID, response.data.results.FR, format));
            break;

          // Par défaut, on renvoie les données response.data standards
          default:
            dispatch(setCurrentMovie(movieID, response.data, format));
            break;
        }
      });
  };
}
