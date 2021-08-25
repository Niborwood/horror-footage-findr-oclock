import {
  PASS_SPLASH,
  TOGGLE_ACTION,
} from '../actions/ui';
import {
  SUBMIT_WATCHED,
  SUBMIT_WATCHLIST,
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

    case TOGGLE_ACTION:
      return {
        ...state,
        toggles: {
          ...state.toggles,
          [action.toggleName]: !state.toggles[action.toggleName],
        },
      };

    default:
      return state;
  }
};

export default UIreducer;