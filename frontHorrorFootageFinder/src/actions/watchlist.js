export const SUBMIT_WATCHLIST_AND_WATCHED = 'SUBMIT_WATCHLIST_AND_WATCHED';
export const submitWatchlistAndWatched = (watchlist, watched) => ({
  type: SUBMIT_WATCHLIST_AND_WATCHED,
  watchlist,
  watched,
});

export const ADD_MOVIE_IN_WATCHLIST = 'ADD_MOVIE_IN_WATCHLIST';
export const addMovieInWatchlist = (newWatchlistId) => ({
  type: ADD_MOVIE_IN_WATCHLIST,
  newWatchlistId,
});

export const ADD_MOVIE_IN_WATCHED = 'ADD_MOVIE_IN_WATCHED';
export const addMovieInWatched = (newWatchedId) => ({
  type: ADD_MOVIE_IN_WATCHED,
  newWatchedId,
});

export const ADD_WATCHED_AND_WATCHLIST = 'ADD_WATCHED_AND_WATCHLIST';
export const addWatchedAndWatchlist = (watchlist, watched) => ({
  type: ADD_WATCHED_AND_WATCHLIST,
  watchlist,
  watched,
});

export const REMOVE_MOVIE_IN_WATCHLIST = 'REMOVE_MOVIE_IN_WATCHLIST';
export const removeMovieInWatchlist = (movieID) => ({
  type: REMOVE_MOVIE_IN_WATCHLIST,
  movieID,
});

export const REMOVE_MOVIE_IN_WATCHED = 'REMOVE_MOVIE_IN_WATCHLIST';
export const removeMovieInWatched = (movieID) => ({
  type: REMOVE_MOVIE_IN_WATCHLIST,
  movieID,
});
