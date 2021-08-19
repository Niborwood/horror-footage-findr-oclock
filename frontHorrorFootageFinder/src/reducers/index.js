import { combineReducers } from 'redux';
import quizReducer from './quiz';
import registerReducer from './register';
import uiReducer from './ui';
import settingsReducer from './settings';
import loginReducer from './login';

const rootReducer = combineReducers({
  quiz: quizReducer,
  register: registerReducer,
  ui: uiReducer,
  settings: settingsReducer,
  login: loginReducer,
});
export default rootReducer;
