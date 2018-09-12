import { RouterAction } from 'connected-react-router';
import { RootState } from './root-reducer';
import { UsersActions } from './users/users.actions';

export const actions = {
  users: UsersActions,
};

const actionsValues = Object.values(UsersActions);

type AppAction = ReturnType<typeof actionsValues[number]>;

export type RootBasicAction = AppAction | RouterAction;

type RootBasicDispatch = (action: RootBasicAction) => void;
type RootAsyncDispatch = (asyncAction: (dispatch: RootBasicDispatch, getState: () => RootState) => void) => void;
export type RootDispatch = RootBasicDispatch & RootAsyncDispatch;

export type RootAction = (dispatch: RootDispatch, getState: () => RootState) => Promise<void> | RootBasicAction;
