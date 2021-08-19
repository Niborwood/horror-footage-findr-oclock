/* eslint-disable no-console */
import { GET_DATA, SUBMITREGISTER } from '../actions';
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
          console.log('pseudo', action.pseudo);
          console.log('email', action.email);
          console.log('password', action.password);
          // api = http://localhost:3001/
          const response = await api.post('api/v1/register', {
            pseudo: action.pseudo,
            email: action.email,
            password: action.password,
          });
        } catch (error) {
          console.log('error', error);
        }
      };
      submitRegister();
      break;
    }
    default:
      next(action);
  }
};

export default dataHorror;
