import { connectRouter, RouterState } from 'connected-react-router';
import { History } from 'history';
import * as localforage from 'localforage';
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import { deepMergeReconciler } from './state.utils';

export interface RootState {
  router: RouterState;
}

localforage.config({
  driver: localforage.WEBSQL,
  name: 'react-redux-ts-starter',
  storeName: 'react-redux-ts-starter_persist',
});

export const createRootReducer = (history: History) =>
  persistReducer(
    {
      key: 'root',
      storage: localforage,
      stateReconciler: deepMergeReconciler,
    },
    combineReducers({
      router: connectRouter(history),
    }),
  );
