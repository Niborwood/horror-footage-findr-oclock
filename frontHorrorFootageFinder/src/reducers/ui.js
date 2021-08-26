import {
  PASS_SPLASH,
  TOGGLE_ACTION,
  TOGGLE_MODAL,

} from '../actions/ui';
import {
  ADD_MOVIE_IN_WATCHED,
  ADD_MOVIE_IN_WATCHLIST,
  SUBMIT_WATCHLIST_AND_WATCHED,
} from '../actions/watchlist';

const initialState = {
  splashPassed: true,
  toggles: {
    toggleAnimations: false,
    toggleSound: false,
    // chaque nouvel état par défaut de toggle s'ajoute ici
  },
  watchList: [],
  watched: [],
  modal: false,
};

const UIreducer = (state = initialState, action) => {
  switch (action.type) {
    case PASS_SPLASH:
      return {
        ...state,
        splashPassed: true,
      };
    case SUBMIT_WATCHLIST_AND_WATCHED:
      return {
        ...state,
        watchList: action.watchlist,
        watched: action.watched,
      };
    case TOGGLE_ACTION:
      return {
        ...state,
        toggles: {
          ...state.toggles,
          [action.toggleName]: !state.toggles[action.toggleName],
        },
      };

    case TOGGLE_MODAL:
      return {
        ...state,
        modal: !state.modal,
      };
    case ADD_MOVIE_IN_WATCHLIST:
      if (state.watchList.includes(action.newWatchlistId)) {
        return {
          ...state,
        };
      }
      return {
        ...state,
        watchList: [...state.watchList[0], action.newWatchlistId],
      };

    case ADD_MOVIE_IN_WATCHED:
      if (state.watchlist.includes(action.newWatchedId)) {
        return {
          ...state,
        };
      }
      return {
        ...state,
        watched: [...state.watched[0], action.newWatchedId],
      };

    default:
      return state;
  }
};

export default UIreducer;
