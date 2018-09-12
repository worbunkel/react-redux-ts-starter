import { createAsyncAction } from '../state.utils';
import { User } from './users.state';

export enum UsersActionType {
  'GET_USERS_REQUEST' = 'users/GET_USERS_REQUEST',
  'GET_USERS_FAILURE' = 'users/GET_USERS_FAILURE',
  'GET_USERS_SUCCESS' = 'users/GET_USERS_SUCCESS',
}

export type UsersAction = {
  type: UsersActionType;
  payload?: {
    users?: User[];
  };
};

export const getUsersRequest = () => ({
  type: UsersActionType.GET_USERS_REQUEST,
});

export const getUsersResponse = (success: boolean) => (users: User[] = []) => ({
  type: success ? UsersActionType.GET_USERS_SUCCESS : UsersActionType.GET_USERS_FAILURE,
  payload: {
    users,
  },
});

const getUsers = async (): Promise<User[]> => {
  const response = await fetch('https://react-redux-starter-api.azurewebsites.net/users', { mode: 'cors' });
  const responseData = await response.json();
  return responseData;
};

export const getUsersAsync = createAsyncAction(getUsers, {
  request: getUsersRequest,
  success: getUsersResponse(true),
  failure: getUsersResponse(false),
});

export const UsersActions = {
  getUsersRequest,
  getUsersResponse,
};
