import {
  CHANGE_INPUT_VALUE_LOGIN,
  TOGGLE_CONNECTED,
  CHANGE_STATE_WHEN_CONNECTED,
  SAVE_NEW_LOGIN_STATE,
} from '../actions/login';

const initialState = {
  isLogged: false,
  loginEmail: '',
  loginPassword: '',
  pseudo: '',
  email: '',
  id: '',
  token: '',
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
    case CHANGE_STATE_WHEN_CONNECTED:
      return {
        ...state,
        pseudo: value.pseudo,
        id: value.id,
        email: value.email,
        token,
      };
    case SAVE_NEW_LOGIN_STATE:
      return {
        ...state,
        pseudo: value.pseudo,
        loginEmail: value.email,
      };
    default:
      return state;
  }
}
export default loginReducer;
