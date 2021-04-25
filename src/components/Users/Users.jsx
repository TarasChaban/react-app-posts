import React from 'react';
import { UsersTable } from '../UsersTable';
import { getUsers } from '../../api/api';

export class Users extends React.Component {
  state = {
    users: [],
  }

  async componentDidMount() {
    const users = await getUsers();

    this.setState({ users });
  }

  render() {
    const { users } = this.state;

    return (
      <UsersTable users={users} />
    );
  }
}
