import {
  PASS_SPLASH,
} from '../actions/ui';

const initialState = {
  splashPassed: true,
};

const UIreducer = (state = initialState, action) => {
  switch (action.type) {
    case PASS_SPLASH:
      return {
        ...state,
        splashPassed: true,
      };

    default:
      return state;
  }
};

export default UIreducer;
