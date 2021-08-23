import {
  SUBMIT_SETTINGS,
} from '../actions/settings';
import {
  saveNewLoginState,
} from '../actions/login';
import api from '../utils/api';

const settings = (store) => (next) => (action) => {
  switch (action.type) {
    case SUBMIT_SETTINGS: {
      const submitSettings = async () => {
        try {
          const state = store.getState();
          let getPseudo = '';
          let getEmail = '';

          if (state.settings.newPseudo.length > 0) {
            getPseudo = state.settings.newPseudo;
          } else {
            getPseudo = state.login.pseudo;
          }

          if (state.settings.newEmail.length > 0) {
            getPseudo = state.settings.newEmail;
          } else {
            getEmail = state.login.email;
          }

          const response = await api.patch(`api/v1/user/${state.login.id}`, {
            email: getEmail,
            pseudo: getPseudo,
          });
          if (response.data) {
            console.log(response);
            store.dispatch(saveNewLoginState(response.data.data));
          }
        } catch (error) {
          console.log('error', error);
        }
      };
      submitSettings();
      break;
    }
    default:
      next(action);
  }
};

export default settings;
