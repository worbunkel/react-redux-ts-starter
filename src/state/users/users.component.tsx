import * as React from 'react';
import { connect } from 'react-redux';
import { RootDispatch } from '../root-action';
import { RootState } from '../root-reducer';
import { getUsersAsync } from './users.actions';

type Props = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>;

const Users = (props: Props) => (
  <div>
    <div>Users:</div>
    <div>
      {props.users.map((user, index) => (
        <div key={index}>
          #{user.id} - {user.name}
        </div>
      ))}
    </div>
    <button onClick={() => props.getUsers()}> Test </button>
  </div>
);

const mapStateToProps = (state: RootState) => ({
  users: state.users.users,
});

const mapDispatchToProps = (dispatch: RootDispatch) => ({
  getUsers: () => {
    dispatch(getUsersAsync());
  },
});

export const UsersContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Users);
