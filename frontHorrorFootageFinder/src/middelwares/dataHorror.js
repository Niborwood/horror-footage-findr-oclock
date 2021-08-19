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
          // api = http://localhost:3001/
          const response = await api.post('api/v1/register', {
            pseudo: state.login.registerPseudo,
            email: state.login.registerEmail,
            password: state.login.registerConfirmPassword,
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
          const response = await api.post('api/v1/login', {
            email: state.login.loginEmail,
            password: action.login.loginPassword,
          });
          store.dispatch(toggleConnected());
          console.log('emailconnect', state);
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
