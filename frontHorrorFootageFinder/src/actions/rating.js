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
