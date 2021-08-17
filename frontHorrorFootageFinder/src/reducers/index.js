import { TO_LOGIN_TRUE } from '../actions';

const initialState = {
  isLogged: false,
};

const reducer = (state = initialState, { type }) => {
  switch (type) {
    case TO_LOGIN_TRUE:
      return {
        ...state,
        isLogged: true,
      };
    default:
      return state;
  }
};

export default reducer;
