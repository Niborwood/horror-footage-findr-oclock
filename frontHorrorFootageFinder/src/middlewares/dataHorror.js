/* eslint-disable no-console */
import { GET_DATA } from '../actions';
import api from '../utils/api';

const dataHorror = (store) => (next) => (action) => {
  switch (action.type) {
    case GET_DATA: {
      const getData = async () => {
        console.log('salut du middleware');
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
    default:
      next(action);
  }
};

export default dataHorror;
