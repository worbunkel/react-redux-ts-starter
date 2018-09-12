import { RootAction, RootBasicAction, RootDispatch } from './root-action';

export const createAsyncAction = <R extends RootBasicAction, S extends RootBasicAction, F extends RootBasicAction, T>(
  asyncRequest: () => Promise<T>,
  actionCreators: AsyncActionCreators<R, S, F, T>,
): (() => RootAction) => () => async (dispatch: RootDispatch) => {
  dispatch(actionCreators.request());
  try {
    const result = await asyncRequest();
    dispatch(actionCreators.success(result));
  } catch (e) {
    dispatch(actionCreators.failure());
  }
};

export type AsyncActionCreator<T> = (...args: Array<() => Promise<T>>) => RootAction;

export type AsyncActionCreators<R, S, F, T> = {
  request: () => R;
  success: (arg: T) => S;
  failure: () => F;
};
