import {
  CHANGE_INPUT_VALUE_LOGIN,
  TOGGLE_CONNECTED,
  CHANGE_PSEUDO,
} from '../actions';

const initialState = {
  isLogged: false,
  loginEmail: '',
  loginPassword: '',
  pseudo: '',
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
    case TOGGLE_CONNECTED:
      return {
        ...state,
        isLogged: !state.isLogged,
      };
    case CHANGE_PSEUDO:
      return {
        ...state,
        pseudo: value,
      };
    default:
      return state;
  }
}
export default registerReducer;
