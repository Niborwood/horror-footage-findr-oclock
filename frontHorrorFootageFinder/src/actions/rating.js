import api from '../utils/api';

export const RATE_MOVIE = 'RATE_MOVIE';
export const rateMovie = (value, movieID) => ({
  type: RATE_MOVIE,
  value,
  movieID,
});

export const SAVE_RATE_IN_STATE = 'SAVE_RATE_IN_STATE';
export const saveRateInState = (movieID, value) => ({
  type: SAVE_RATE_IN_STATE,
  movieID,
  value,
});

// Action de récupérer la note donnée par un utilisateur à un film
export const SET_USER_RATING = 'SET_USER_RATING';
export const setUserRating = (movieID, value) => ({
  type: SET_USER_RATING,
  movieID,
  value,
});

// Middleware pour récupérer les données depuis l'API interne
// via Redux-Thunk
//! Add catch logic !
export const getUserRatingOnSingleMovie = (userID, movieID) => (dispatch) => {
  api.get(`user/${userID}/ratings/movie/${movieID}`)
    .then((response) => {
      console.log(response.data);
      dispatch(setUserRating(movieID, response.data.value));
    });
};
