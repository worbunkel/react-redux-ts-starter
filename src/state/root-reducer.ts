import { RouterState } from 'connected-react-router';
import { combineReducers } from 'redux';
import { navBarReducer } from './nav-bar/nav-bar.reducer';
import { NavBarState } from './nav-bar/nav-bar.state';
import { salesForecastReducer } from './pages/sales-forecast/sales-forecast.reducer';
import { SalesForecastState } from './pages/sales-forecast/sales-forecast.state';
import { usersReducer } from './users/users.reducer';
import { UsersState } from './users/users.state';

export interface RootState {
  navBar: NavBarState;
  router: RouterState;
  salesForecast: SalesForecastState;
  users: UsersState;
}

export const rootReducer = combineReducers<RootState>({
  navBar: navBarReducer,
  router: null,
  salesForecast: salesForecastReducer,
  users: usersReducer,
});
