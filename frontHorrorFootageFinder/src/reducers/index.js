import { combineReducers } from 'redux';

import quizReducer from './quiz';
import registerReducer from './register';
import uiReducer from './ui';

const rootReducer = combineReducers({
  quiz: quizReducer,
  register: registerReducer,
  ui: uiReducer,
});

export default rootReducer;
