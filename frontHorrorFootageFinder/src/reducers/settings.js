import { } from '../actions';

const initialState = {
  pseudo: 'DarkNarutoDu33',
  email: 'titouan@caramail.fr',
  password: '1234',
};

const settingsReducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default settingsReducer;
