import { connectRouter, routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import * as _ from 'lodash';
import { applyMiddleware, createStore } from 'redux';
import middleware from 'redux-thunk';
import { reactotron } from './reactotron';
import { rootReducer } from './root-reducer';

export const history = createBrowserHistory();

const configureStore = () => {
  const middlewares = [routerMiddleware(history), middleware];

  const isLocalDev = _.includes(window.location.href, 'localhost');

  return (isLocalDev ? reactotron.createStore : createStore)(
    connectRouter(history)(rootReducer),
    applyMiddleware(...middlewares),
  );
};

export const store = configureStore();
