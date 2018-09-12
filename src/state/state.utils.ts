import * as _ from 'lodash';
import { RootAction, RootBasicAction, RootDispatch } from './root-action';

export const createAsyncAction = <R extends RootBasicAction, S extends RootBasicAction, F extends RootBasicAction, T>(
  options: AsyncActionCreators<R, S, F, T>,
): (() => RootAction) => () => async (dispatch: RootDispatch) => {
  const { url, fetchOptions, requestActionCreator, successActionCreator, failureActionCreator } = options;
  const defaultFetchOptions = {
    mode: 'cors',
  };

  dispatch(requestActionCreator());
  try {
    const result = await fetch(url, _.assign(defaultFetchOptions, fetchOptions));
    const jsonResult = await result.json();
    dispatch(successActionCreator(jsonResult));
  } catch (e) {
    dispatch(failureActionCreator());
  }
};

export type AsyncActionCreator<T> = (...args: Array<() => Promise<T>>) => RootAction;

export type AsyncActionCreators<R, S, F, T> = {
  url: string;
  fetchOptions?: RequestInit;
  requestActionCreator: () => R;
  successActionCreator: (arg: T) => S;
  failureActionCreator: () => F;
};
