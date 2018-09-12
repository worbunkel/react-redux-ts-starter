export type User = {
  id: number;
  name: string;
};

export type UsersState = {
  users: User[];
};

export const DefaultUsersState = (): UsersState => ({
  users: [{ id: 1, name: 'Test User' }],
});
