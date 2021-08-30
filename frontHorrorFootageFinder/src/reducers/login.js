import {
  CHANGE_INPUT_VALUE_LOGIN,
  TOGGLE_CONNECTED,
  CHANGE_STATE_WHEN_CONNECTED,
  ERROR_MESSAGE,
  SAVE_NEW_LOGIN_STATE,
  CLEAR_USER,
  LOCALSTORAGEMODIFYLOGIN,
} from '../actions/login';

const initialState = {
  isLogged: false,
  email: '',
  loginEmail: '',
  loginPassword: '',
  pseudo: '',
  id: 0,
  token: '',
  errorMessage: false,
};

// eslint-disable-next-line consistent-return
function loginReducer(state = initialState, {
  type,
  name,
  value,
  token,
  emailStore,
  pseudoStore,
  isLoggedStore,
  idStore,
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
    case LOCALSTORAGEMODIFYLOGIN:
      return {
        ...state,
        email: emailStore,
        pseudo: pseudoStore,
        isLogged: isLoggedStore,
        id: +idStore,
      };
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
        loginEmail: '',
        loginPassword: '',
        token,
      };
    case SAVE_NEW_LOGIN_STATE:
      if (value.pseudo !== undefined || value.email !== undefined) {
        return {
          ...state,
          pseudo: value.pseudo,
          email: value.email,
        };
      } return state;

    case CLEAR_USER:
      return initialState;

    default:
      return state;
  }
}
export default loginReducer;
