import { TO_LOGIN_TRUE, CHANGE_INPUT_VALUE } from '../actions';

const initialState = {
  isLogged: false,
  registerEmail: '',
  registerPassword: '',
  registerConfirmPassword: '',
  token: '',
};

const reducer = (state = initialState, { type, name, value }) => {
  switch (type) {
    case TO_LOGIN_TRUE:
      return {
        ...state,
        isLogged: true,
      };
    case CHANGE_INPUT_VALUE: {
      if (name === 'email') {
        return {
          ...state,
          registerEmail: value,
        };
      }
      if (name === 'password') {
        return {
          ...state,
          registerPassword: value,
        };
      }
      if (name === 'registerConfirmPassword') {
        return {
          ...state,
          registerConfirmPassword: value,
        };
      }
      break;
    }
    default:
      return state;
  }
};

export default reducer;
