import * as _ from 'lodash';
import { UsersAction, UsersActionType } from './users.actions';
import { DefaultUsersState, User, UsersState } from './users.state';

export const usersReducer = (prevState: UsersState = DefaultUsersState(), action: UsersAction): UsersState => {
  switch (action.type) {
    case UsersActionType.GET_USERS_REQUEST:
      return onGetUsersRequest(prevState);
    case UsersActionType.GET_USERS_SUCCESS:
      return onGetUsersSuccess(prevState, _.get(action, 'payload.users'));
    case UsersActionType.GET_USERS_FAILURE:
      return onGetUsersFailure(prevState);
    default:
      return prevState;
  }
};

const onGetUsersRequest = (prevState: UsersState) => ({
  ...prevState,
  users: [],
});

const onGetUsersSuccess = (prevState: UsersState, users: User[] = []) => ({
  ...prevState,
  users,
});

const onGetUsersFailure = (prevState: UsersState) => prevState;
