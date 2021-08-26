export const RATE_MOVIE = 'RATE_MOVIE';
export const rateMovie = (value, movieID) => ({
  type: RATE_MOVIE,
  value,
  movieID,
});
