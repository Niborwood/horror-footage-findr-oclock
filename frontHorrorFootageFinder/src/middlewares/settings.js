import {
  SUBMIT_SETTINGS, DELETE_ACCOUNT, updateTextInfo,
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

          // on vérifie que les modifs reçus soit ok pour les changer en BDD
          // actuellement on vérifie seulement que les champs ne soit pas vide.
          // on pourrait éventuellement vérifier plus de choses ?
          // (notament pour le password à l'avenir)
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
            store.dispatch(saveNewLoginState(response.data.data));
          }
        } catch (error) {
          console.log('error', error);
          store.dispatch(updateTextInfo('Erreur lors de la modifications des informations personnelles'));
        }
      };
      submitSettings();
      break;
    }
    case DELETE_ACCOUNT: {
      console.log('compte supprimé');
      break;
    }
    default:
      next(action);
  }
};

export default settings;
