import { getUsersRequest, getUsersResponse } from './users.actions';
import { usersReducer } from './users.reducer';

describe('usersReducer', () => {
  describe('on uncaught action', () => {
    it('should return the state', () => {
      const prevState = { users: [{ name: 'Luke', id: 1 }] };
      const testAction: any = { type: 'asdf', payload: {} };

      const newState = usersReducer(prevState, testAction);

      expect(newState).toEqual(prevState);
    });
  });

  describe('on FETCH_USERS_REQUEST', () => {
    it('should clear users', () => {
      const prevState = { users: [{ name: 'Luke', id: 1 }] };

      const newState = usersReducer(prevState, getUsersRequest());

      expect(newState.users).toEqual([]);
    });
  });

  describe('on FETCH_USERS_SUCCESS', () => {
    it('should set users', () => {
      const prevState = { users: [] };
      const users = [{ name: 'Luke', id: 1 }];

      const newState = usersReducer(prevState, getUsersResponse(true)(users));

      expect(newState.users).toEqual(users);
    });
  });

  describe('on FETCH_USERS_FAILURE', () => {
    it('should return the state', () => {
      const prevState = { users: [{ name: 'Luke', id: 1 }] };

      const newState = usersReducer(prevState, getUsersResponse(false)());

      expect(newState).toEqual(prevState);
    });
  });
});
