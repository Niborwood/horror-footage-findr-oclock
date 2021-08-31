import {
  PASS_SPLASH,
  TOGGLE_ACTION,
  TOGGLE_MODAL,
} from '../actions/ui';
import {
  SUBMIT_WATCHLIST_AND_WATCHED,
  ADD_MOVIE_IN_REDUCER,
  REMOVE_MOVIE_IN_REDUCER,
} from '../actions/watchlist';
import {
  LOCALSTORAGEMODIFYUI,
} from '../actions/login';

const initialState = {
  splashPassed: true,
  toggles: {
    toggleAnimations: false,
    toggleSound: false,
    // chaque nouvel état par défaut de toggle s'ajoute ici
  },
  watchlist: [],
  watched: [],
  modal: false,
};

const UIreducer = (state = initialState, action) => {
  switch (action.type) {
    case LOCALSTORAGEMODIFYUI:
      return {
        ...state,
        watchlist: action.watchlistStorage,
        watched: action.watchedStorage,
      };
    case PASS_SPLASH:
      return {
        ...state,
        splashPassed: true,
      };
    case ADD_MOVIE_IN_REDUCER: {
      const newList = [...state[action.name], action.newMovie];
      localStorage.setItem(action.name, newList.join());
      return {
        ...state,
        [action.name]: [...state[action.name], action.newMovie],
      };
    }
    case REMOVE_MOVIE_IN_REDUCER: {
      const newList = state[action.name].filter((movieID) => movieID !== action.idRemoveMovie);
      localStorage.setItem(action.name, newList.join());
      return {
        ...state,
        [action.name]: newList,
      }; }
    case SUBMIT_WATCHLIST_AND_WATCHED:
      return {
        ...state,
        watchlist: action.watchlist,
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
