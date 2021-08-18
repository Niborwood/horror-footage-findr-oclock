import { CHANGE_SETTINGS_VALUE, EDIT_FIELD_SETTINGS, TOGGLE_FIELD_INPUT } from '../actions';

const initialState = {
  pseudo: 'DarkNarutoDu33',
  pseudoInput: false,
  email: 'titouan@caramail.fr',
  emailInput: false,
  password: '1234',
};

const settingsReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_FIELD_INPUT: {
      return {
        ...state,
        [action.field]: !state.field,
      };
    }
    case EDIT_FIELD_SETTINGS:
      return {
        ...state,
        emailInput: false,
        pseudoInput: false,
      };
    case CHANGE_SETTINGS_VALUE:
      return {
        ...state,
        [action.field]: action.value,
      };
    default:
      return state;
  }
};

export default settingsReducer;
