/* eslint-disable no-console */
import {
  LOGIN,
  toggleConnected,
  changeStateWhenConnected,
} from '../actions/login';
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
          await api.post('api/v1/register', {
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
          const response = await api.post('api/v1/login', {
            email: getEmail,
            password: getPassword,
          });
          console.log('data', response.data.data);
          console.log('token', response.data.token);
          store.dispatch(changeStateWhenConnected(response.data.data, response.data.token));
          if (response.data.data.pseudo) {
            store.dispatch(toggleConnected());
          }
        } catch (error) {
          console.log('error', error);
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
