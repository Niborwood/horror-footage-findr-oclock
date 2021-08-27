import {
  PASS_SPLASH,
  TOGGLE_ACTION,
  TOGGLE_MODAL,

} from '../actions/ui';
import {
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

    default:
      return state;
  }
};

export default UIreducer;
