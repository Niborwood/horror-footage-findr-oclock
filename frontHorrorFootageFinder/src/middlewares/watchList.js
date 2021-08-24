/* eslint-disable no-console */
import {
  SUBMIT_WATCHLIST_AND_WATCHED, submitWatched, submitWatchlist,
} from '../actions/watchlist';

import api from '../utils/api';

const dataHorror = (store) => (next) => (action) => {
  switch (action.type) {
    case SUBMIT_WATCHLIST_AND_WATCHED: {
      const submitWatchlistAndWatched = async () => {
        try {
          const state = store.getState();
          const getId = state.login.id;
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

export default dataHorror;
