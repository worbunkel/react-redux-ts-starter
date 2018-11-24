import { RouterAction } from 'connected-react-router';
import { UnionToIntersection } from '../utility.types';
import { RootState } from './root-reducer';

export const actions = {
  // ACTIONS
};

type ActionsType = typeof actions;
type AllActions = UnionToIntersection<ActionsType[keyof ActionsType]>;
type AppAction = ReturnType<AllActions[keyof AllActions]>;

export type RootBasicAction = AppAction | RouterAction;

type RootBasicDispatch = (action: RootBasicAction) => void;
type RootAsyncDispatch = (asyncAction: (dispatch: RootBasicDispatch, getState: () => RootState) => void) => void;
export type RootDispatch = RootBasicDispatch & RootAsyncDispatch;

export type RootAction = (dispatch: RootDispatch, getState: () => RootState) => Promise<void> | RootBasicAction;
