import {
  CHANGE_SETTINGS_VALUE,
  EDIT_FIELD_SETTINGS,
  TOGGLE_FIELD_INPUT,
  CANCEL_SETTINGS_CHANGE,
  EDIT_PASSWORD_SETTINGS,
} from '../actions';

const initialState = {
  pseudo: 'DarkNarutoDu33',
  newPseudo: 'DarkNarutoDu33',
  pseudoInput: false,
  email: 'titouan@caramail.fr',
  newEmail: 'titouan@caramail.fr',
  emailInput: false,
  password: '1234',
  newPassword: '',
  newPasswordConfirm: '',
  passwordInput: false,
};

const settingsReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_FIELD_INPUT: {
      // On évite d'ouvrir plusieurs input en même temps,
      // au click sur le bouton d'edition d'un input:
      //        - on ferme tous les autres.
      //        - on réintialise la valeur du champs non validé
      return {
        ...state,
        pseudoInput: false,
        emailInput: false,
        passwordInput: false,
        newPseudo: state.pseudo,
        newEmail: state.email,
        newPassword: state.password,
        [action.field]: !state.field,
      };
    }
    case EDIT_FIELD_SETTINGS:
      return {
        ...state,
        emailInput: false,
        pseudoInput: false,
        passwordInput: false,
        [action.field]: state[action.value],
      };
    case EDIT_PASSWORD_SETTINGS:
      if (state.newPassword === state.newPasswordConfirm) {
        return {
          ...state,
          emailInput: false,
          pseudoInput: false,
          passwordInput: false,
          password: state.newPassword,
        };
      }
      return {
        ...state,
        emailInput: false,
        pseudoInput: false,
        passwordInput: false,
      };

    case CHANGE_SETTINGS_VALUE:
      return {
        ...state,
        [action.field]: action.value,
      };
    case CANCEL_SETTINGS_CHANGE:
      return {
        ...state,
        pseudoInput: false,
        emailInput: false,
        passwordInput: false,
        newPseudo: state.pseudo,
        newEmail: state.email,
        newPassword: '',
        newPasswordConfirm: '',
      };
    default:
      return state;
  }
};

export default settingsReducer;
