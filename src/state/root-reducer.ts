import { RouterState } from 'connected-react-router';
import * as localforage from 'localforage';
import * as _ from 'lodash';
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

export const rootReducer = persistReducer(
  {
    key: 'root',
    storage: localforage,
    stateReconciler: deepMergeReconciler,
  },
  combineReducers({
    router: null,
  }),
);
