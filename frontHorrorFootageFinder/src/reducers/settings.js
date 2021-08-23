import {
  TOGGLE_FIELD_INPUT,
  CANCEL_SETTINGS_CHANGE,
  EDIT_PROFILE_INFORMATIONS,
  CLOSE_INPUT,
} from '../actions/settings';
import {
  SAVE_NEW_LOGIN_STATE,
} from '../actions/login';

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
    case SAVE_NEW_LOGIN_STATE:
      console.log('test');
      return {
        pseudoInput: false,
        emailInput: false,
      };
    case CLOSE_INPUT:
      return {
        ...state,
        pseudoInput: false,
        emailInput: false,
      };
    default:
      return state;
  }
};

export default SettingsReducer;
