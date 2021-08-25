/* eslint-disable no-console */
import {
  SUBMIT_WATCHLIST_AND_WATCHED, submitWatched, submitWatchlist,
} from '../actions/watchlist';

import api from '../utils/api';

const watchList = (store) => (next) => (action) => {
  console.log('middleware', action.type);
  switch (action.type) {
    case SUBMIT_WATCHLIST_AND_WATCHED: {
      const submitWatchlistAndWatched = async () => {
        console.log('middleware watch');
        try {
          const state = store.getState();
          const getId = state.login.id;
          console.log('middleware watch2');
          const responseWatched = await api.get(`api/v1/user/${getId}/watched`);
          console.log(responseWatched);
          const responseWatchlist = await api.get(`api/v1/user/${getId}/watchlist`);
          console.log(responseWatchlist);
          submitWatched(responseWatched);
          submitWatchlist(responseWatchlist);
        } catch (error) {
          console.log('error', error);
        }
      };
      submitWatchlistAndWatched();
      break;
    }
    default:
      next(action);
  }
};

export default watchList;
