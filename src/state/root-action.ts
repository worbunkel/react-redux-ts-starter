import { RouterAction } from 'connected-react-router';
import { UnionToIntersection } from '../utility.types';
import { NavBarActions } from './nav-bar/nav-bar.actions';
import { SalesForecastActions } from './pages/sales-forecast/sales-forecast.actions';
import { RootState } from './root-reducer';
import { UsersActions } from './users/users.actions';

export const actions = {
  users: UsersActions,
  salesForecast: SalesForecastActions,
  navBar: NavBarActions,
};

type ActionsType = typeof actions;
type AllActions = UnionToIntersection<ActionsType[keyof ActionsType]>;
type AppAction = ReturnType<AllActions[keyof AllActions]>;

export type RootBasicAction = AppAction | RouterAction;

type RootBasicDispatch = (action: RootBasicAction) => void;
type RootAsyncDispatch = (asyncAction: (dispatch: RootBasicDispatch, getState: () => RootState) => void) => void;
export type RootDispatch = RootBasicDispatch & RootAsyncDispatch;

export type RootAction = (dispatch: RootDispatch, getState: () => RootState) => Promise<void> | RootBasicAction;
