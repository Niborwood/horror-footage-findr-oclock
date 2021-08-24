import {
  PASS_SPLASH,
} from '../actions/ui';
import {
  SUBMIT_WATCHED,
  SUBMIT_WATCHLIST,
} from '../actions/watchlist';

const initialState = {
  splashPassed: true,
  watchList: [],
  watched: [],
};

const UIreducer = (state = initialState, action) => {
  switch (action.type) {
    case PASS_SPLASH:
      return {
        ...state,
        splashPassed: true,
      };
    case SUBMIT_WATCHED:
      return {
        ...state,
        watched: action.watched,
      };

    case SUBMIT_WATCHLIST:
      return {
        ...state,
        watchList: action.watchlist,
      };

    default:
      return state;
  }
};

export default UIreducer;
