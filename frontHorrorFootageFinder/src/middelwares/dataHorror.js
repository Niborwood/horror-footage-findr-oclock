/* eslint-disable no-console */
import {
  GET_DATA,
  SUBMITREGISTER,
  LOGIN,
  toggleConnected,
} from '../actions';
import api from './utils/api';

const dataHorror = (store) => (next) => (action) => {
  switch (action.type) {
    case GET_DATA: {
      const getData = async () => {
        console.log('get allMovies');
        try {
          // api = http://localhost:3001/
          const response = await api.get('api/v1/allmovies');
          console.log(response.data);
        } catch (error) {
          console.log('error', error);
        }
      };
      getData();
      break;
    }
    case SUBMITREGISTER: {
      const submitRegister = async () => {
        try {
          const state = store.getState();
          const getPseudo = state.register.registerPseudo;
          const getEmail = state.register.registerEmail;
          const getPassword = state.register.registerConfirmPassword;
          const response = await api.post('api/v1/register', {
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
          store.dispatch(toggleConnected());
          console.log('emailconnect 2', state);
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
