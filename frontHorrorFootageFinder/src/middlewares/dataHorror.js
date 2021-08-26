/* eslint-disable no-console */
import {
  LOGIN,
  toggleConnected,
  changeStateWhenConnected,
  errorMessage,
  CHECK_TOKEN,
} from '../actions/login';
import { submitWatchlistAndWatched } from '../actions/watchlist';
import {
  SUBMITREGISTER,
} from '../actions/register';
import api from '../utils/api';

const dataHorror = (store) => (next) => (action) => {
  switch (action.type) {
    case SUBMITREGISTER: {
      const submitRegister = async () => {
        try {
          const state = store.getState();
          const getPseudo = state.register.registerPseudo;
          const getEmail = state.register.registerEmail;
          const getPassword = state.register.registerConfirmPassword;
          await api.post('register/', {
            pseudo: getPseudo,
            email: getEmail,
            password: getPassword,
          });
        } catch (error) {
          console.log('error', error);
        }
      };
      submitRegister();
      break;
    }
    case LOGIN: {
      const login = async () => {
        try {
          const state = store.getState();
          const getEmail = state.login.loginEmail;
          const getPassword = state.login.loginPassword;
          const response = await api.post('login', {
            email: getEmail,
            password: getPassword,
          });
          console.log('data', response.data.data);
          console.log('token', response.data.token);
          store.dispatch(changeStateWhenConnected(response.data.data, response.data.token));

          // eslint-disable-next-line dot-notation
          api.defaults.headers.common['authorization'] = `Bearer ${response.data.token}`;

          if (response.data.data.pseudo) {
            store.dispatch(toggleConnected());
            localStorage.setItem({
              token: response.data.token,
              pseudo: response.data.data.pseudo,
              email: response.data.data.email,
            });
            submitWatchlistAndWatched();
          }
        } catch (error) {
          console.log('error', error);
          store.dispatch(errorMessage());
        }
      };
      login();
      break;
    }
    default:
      next(action);
  }
};

export default dataHorror;
