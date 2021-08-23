import {
  TOGGLE_FIELD_INPUT,
  CANCEL_SETTINGS_CHANGE,
  EDIT_PROFILE_INFORMATIONS,
} from '../actions/settings';

const initialState = {
  pseudoInput: false,
  emailInput: false,
  newPseudo: '',
  newEmail: '',
};

const SettingsReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_FIELD_INPUT:
      return {
        ...state,
        pseudoInput: false,
        emailInput: false,
        newPseudo: '',
        newEmail: '',
        [action.field]: !state.field,
      };
    case CANCEL_SETTINGS_CHANGE:
      return {
        ...state,
        pseudoInput: false,
        emailInput: false,
        newPseudo: '',
        newEmail: '',
      };
    case EDIT_PROFILE_INFORMATIONS:
      if (action.value.match(/^\S+$/)) {
        return {
          ...state,
          [action.field]: action.value,
        };
      }
      return state;
    default:
      return state;
  }
};

export default SettingsReducer;
