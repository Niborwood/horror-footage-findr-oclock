import {
  CHANGE_SETTINGS_VALUE, EDIT_FIELD_SETTINGS, TOGGLE_FIELD_INPUT, CANCEL_SETTINGS_CHANGE,
} from '../actions';

const initialState = {
  pseudo: 'DarkNarutoDu33',
  newPseudo: 'DarkNarutoDu33',
  pseudoInput: false,
  email: 'titouan@caramail.fr',
  newEmail: 'titouan@caramail.fr',
  emailInput: false,
  password: '1234',
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
        newPseudo: state.pseudo,
        newEmail: state.email,
        [action.field]: !state.field,
      };
    }
    case EDIT_FIELD_SETTINGS:
      return {
        ...state,
        emailInput: false,
        pseudoInput: false,
        [action.field]: state[action.value],
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
        newPseudo: state.pseudo,
        newEmail: state.email,
      };
    default:
      return state;
  }
};

export default settingsReducer;
