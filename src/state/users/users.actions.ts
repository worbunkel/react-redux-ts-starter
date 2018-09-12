import { createAsyncAction } from '../state.utils';
import { User } from './users.state';

export enum UsersActionType {
  'FETCH_USERS_REQUEST' = 'users/FETCH_USERS_REQUEST',
  'FETCH_USERS_FAILURE' = 'users/FETCH_USERS_FAILURE',
  'FETCH_USERS_SUCCESS' = 'users/FETCH_USERS_SUCCESS',
}

export type UsersAction = {
  type: UsersActionType;
  payload?: {
    users?: User[];
  };
};

export const getUsersRequest = () => ({
  type: UsersActionType.FETCH_USERS_REQUEST,
});

export const getUsersResponse = (success: boolean) => (users: User[] = []) => ({
  type: success ? UsersActionType.FETCH_USERS_SUCCESS : UsersActionType.FETCH_USERS_FAILURE,
  payload: {
    users,
  },
});

export const getUsersAsync = createAsyncAction({
  url: 'https://react-redux-starter-api.azurewebsites.net/users',
  requestActionCreator: getUsersRequest,
  successActionCreator: getUsersResponse(true),
  failureActionCreator: getUsersResponse(false),
});

export const UsersActions = {
  getUsersRequest,
  getUsersResponse,
};
