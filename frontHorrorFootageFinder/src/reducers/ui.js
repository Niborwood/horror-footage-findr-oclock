import {
  PASS_SPLASH,
  TOGGLE_ACTION,
} from '../actions/ui';

const initialState = {
  splashPassed: true,
  toggles: {
    toggleAnimations: false,
    // chaque nouvel état par défaut de toggle s'ajoute ici
  },
};

const UIreducer = (state = initialState, action) => {
  switch (action.type) {
    case PASS_SPLASH:
      return {
        ...state,
        splashPassed: true,
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
