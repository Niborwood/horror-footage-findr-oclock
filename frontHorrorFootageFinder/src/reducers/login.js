import {
  CHANGE_INPUT_VALUE_LOGIN,
  TOGGLE_CONNECTED,
  CHANGE_STATE_WHEN_CONNECTED,
  ERROR_MESSAGE,
} from '../actions/login';

const initialState = {
  isLogged: false,
  email: '',
  loginEmail: '',
  loginPassword: '',
  pseudo: '',
  id: '',
  token: '',
  errorMessage: false,
};

// eslint-disable-next-line consistent-return
function loginReducer(state = initialState, {
  type,
  name,
  value,
  token,
}) {
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
    case ERROR_MESSAGE:
      return {
        ...state,
        errorMessage: !state.isLogged,
      };
    case CHANGE_STATE_WHEN_CONNECTED:
      return {
        ...state,
        pseudo: value.pseudo,
        id: value.id,
        email: value.email,
        token,
      };
    default:
      return state;
  }
}
export default loginReducer;
