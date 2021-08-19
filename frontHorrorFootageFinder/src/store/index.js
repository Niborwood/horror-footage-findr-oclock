import { createStore, applyMiddleware, compose } from 'redux';
import reducer from '../reducers';
import dataHorror from '../middelwares/dataHorror';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const enhancers = composeEnhancers(
  applyMiddleware(dataHorror),
);

const store = createStore(reducer, enhancers);

export default store;
