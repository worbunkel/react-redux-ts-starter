import { routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import * as _ from 'lodash';
import { applyMiddleware, createStore, compose } from 'redux';
import { persistStore } from 'redux-persist';
import middleware from 'redux-thunk';
import { reactotron } from './reactotron';
import { createRootReducer } from './root-reducer';

export const history = createBrowserHistory();

const rootReducer = createRootReducer(history);

const configureStore = () => {
  const middlewares = [routerMiddleware(history), middleware];

  const isLocalDev = _.includes(window.location.href, 'localhost');

  return createStore(
    rootReducer,
    isLocalDev
      ? compose(
          applyMiddleware(...middlewares),
          reactotron.createEnhancer(),
        )
      : applyMiddleware(...middlewares),
  );
};

export const store = configureStore();

export const persistor = persistStore(store);
