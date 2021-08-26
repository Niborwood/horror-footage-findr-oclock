export const SUBMIT_WATCHLIST_AND_WATCHED = 'SUBMIT_WATCHLIST_AND_WATCHED';
export const submitWatchlistAndWatched = (watchlist, watched) => ({
  type: SUBMIT_WATCHLIST_AND_WATCHED,
  watchlist,
  watched,
});
