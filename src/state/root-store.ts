import { connectRouter, routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import { applyMiddleware, createStore } from 'redux';
import middleware from 'redux-thunk';
import { rootReducer } from './root-reducer';

export const history = createBrowserHistory();

const configureStore = () => {
  const middlewares = [routerMiddleware(history), middleware];
  return createStore(connectRouter(history)(rootReducer), applyMiddleware(...middlewares));
};

export const store = configureStore();
