import {
  SUBMIT_SETTINGS, DELETE_ACCOUNT, updateTextInfo,
} from '../actions/settings';
import {
  saveNewLoginState,
  clearState,
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
            store.dispatch(updateTextInfo('le champ ne doit pas etre vide'));
          }

          if (state.settings.newEmail.length > 0) {
            getPseudo = state.settings.newEmail;
          } else {
            getEmail = state.login.email;
            store.dispatch(updateTextInfo('le champ ne doit pas etre vide'));
          }

          const response = await api.patch(`user/${state.login.id}`, {
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
      const deleteAccount = async () => {
        const state = store.getState();
        try {
          await api.delete(`user/${state.login.id}`);
          store.dispatch(clearState());
        } catch (error) {
          console.log('error', error);
        }
      };
      deleteAccount();
      break;
    }
    default:
      next(action);
  }
};

export default settings;
