import {
  CHANGE_INPUT_VALUE,
  SUBMIT_FORM,
  TOGGLE_MASKED,
  ON_CHANGE_CONFIRMREGISTER,
} from '../actions/register';

const initialState = {
  pseudo: '',
  registerEmail: '',
  registerPassword: '',
  registerConfirmPassword: '',
  registerPseudo: '',
  textConfirm: '',
  inputMasked: false,
  confirmationRegister: false,
};

// eslint-disable-next-line consistent-return
function registerReducer(state = initialState, { type, name, value }) {
  switch (type) {
    case TOGGLE_MASKED:
      return {
        ...state,
        inputMasked: !state.inputMasked,
      };
    case ON_CHANGE_CONFIRMREGISTER:
      return {
        ...state,
        confirmationRegister: true,
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
      if (name === 'Pseudo') {
        return {
          ...state,
          registerPseudo: value,
        };
      }
      return state;
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
export default registerReducer;