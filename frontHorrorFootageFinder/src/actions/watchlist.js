export const SUBMIT_WATCHLIST_AND_WATCHED = 'SUBMIT_WATCHLIST_AND_WATCHED';
export const submitWatchlistAndWatched = () => ({
  type: SUBMIT_WATCHLIST_AND_WATCHED,
});

export const SUBMIT_WATCHLIST = 'SUBMIT_WATCHLIST';
export const submitWatchlist = (watchlist) => ({
  type: SUBMIT_WATCHLIST,
  watchlist,
});

export const SUBMIT_WATCHED = 'SUBMIT_WATCHED';
export const submitWatched = (watched) => ({
  type: SUBMIT_WATCHED,
  watched,
});
