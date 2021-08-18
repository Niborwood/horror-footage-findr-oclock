import {
  TO_LOGIN_TRUE, CHANGE_INPUT_VALUE, SUBMIT_FORM, TOGGLE_MASKED,
} from '../actions';

const initialState = {
  isLogged: false,
  registerEmail: '',
  registerPassword: '',
  registerConfirmPassword: '',
  textConfirm: '',
  token: '',
  inputMasked: false,
};

// eslint-disable-next-line consistent-return
function reducer(state = initialState, { type, name, value }) {
  switch (type) {
    case TO_LOGIN_TRUE:
      return {
        ...state,
        isLogged: true,
      };
    case TOGGLE_MASKED:
      return {
        ...state,
        inputMasked: !state.inputMasked,
      };
    case CHANGE_INPUT_VALUE: {
      if (name === 'Email') {
        return {
          ...state,
          registerEmail: value,
        };
      }
      if (name === 'Mot de passe') {
        return {
          ...state,
          registerPassword: value,
        };
      }
      if (name === 'Confirmation du mot de passe') {
        return {
          ...state,
          registerConfirmPassword: value,
        };
      }
      break;
    }
    case SUBMIT_FORM:
      return {
        ...state,
        textConfirm: value,
      };
    default:
      return state;
  }
}

export default reducer;
