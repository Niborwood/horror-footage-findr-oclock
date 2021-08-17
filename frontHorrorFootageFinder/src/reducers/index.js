import { TO_LOGIN_TRUE, CHOOSE_AN_ANSWER } from '../actions';

const initialState = {
  isLogged: false,
  answer: '',
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case TO_LOGIN_TRUE:
      return {
        ...state,
        isLogged: true,
      };
    case CHOOSE_AN_ANSWER:
      return {
        ...state,
        answer: action.answer,
      };
    default:
      return state;
  }
};

export default reducer;
