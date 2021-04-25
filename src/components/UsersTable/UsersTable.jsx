import React from 'react';
import './UsersTable.scss';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

export const UsersTable = ({ users }) => (
  <table className="table" border="2">
    <thead>
      <tr>
        <th>Id</th>
        <th>Name</th>
        <th>Username</th>
        <th>Email</th>
        <th>Website</th>
        <th>Company</th>
        <th>City</th>
        <th>Posts</th>
      </tr>
    </thead>
    <tbody>
      {users.map(user => (
        <tr key={user.id}>
          <td>{user.id}</td>
          <td>{user.name}</td>
          <td>{user.username}</td>
          <td>{user.email}</td>
          <td>{user.website}</td>
          <td>{user.company.name}</td>
          <td>{user.address.city}</td>
          <td>
            <NavLink
              activeClassName="is-active"
              className="nav__link"
              to="/posts"
            >
              Posts
            </NavLink>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);

UsersTable.propTypes = {
  users: PropTypes.arrayOf({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    address: PropTypes.shape({
      city: PropTypes.string.isRequired,
    }).isRequired,
    website: PropTypes.string.isRequired,
    company: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};
