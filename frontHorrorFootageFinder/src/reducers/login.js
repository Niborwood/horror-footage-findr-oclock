import {
  CHANGE_INPUT_VALUE_LOGIN,
} from '../actions';

const initialState = {
  isLogged: false,
  loginEmail: '',
  loginPassword: '',
  token: '',
};

// eslint-disable-next-line consistent-return
function registerReducer(state = initialState, { type, name, value }) {
  switch (type) {
    case CHANGE_INPUT_VALUE_LOGIN: {
      if (name === 'Email') {
        return {
          ...state,
          loginEmail: value,
        };
      }
      if (name === 'Mot de passe') {
        return {
          ...state,
          loginPassword: value,
        };
      }
      return state;
    }
    default:
      return state;
  }
}
export default registerReducer;
