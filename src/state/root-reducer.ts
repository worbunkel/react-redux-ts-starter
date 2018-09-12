import { RouterState } from 'connected-react-router';
import { combineReducers } from 'redux';
import { usersReducer } from './users/users.reducer';
import { UsersState } from './users/users.state';

export interface RootState {
  router: RouterState;
  users: UsersState;
}

export const rootReducer = combineReducers<RootState>({
  users: usersReducer,
  router: null,
});
