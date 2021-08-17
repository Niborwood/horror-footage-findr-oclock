import { createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import reducer from '../reducers';

const store = createStore(
  reducer,
  composeWithDevTools(
    // Here goes the middlewares,
  ),
);
export default store;
