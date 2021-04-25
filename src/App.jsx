import './App.scss';
import './styles/general.scss';
import React, { useState, useEffect, useCallback } from 'react';
import { Route, Switch, NavLink, Redirect } from 'react-router-dom';
import { Users } from './components/Users';
import { Header } from './components/Header/Header';
import { PostDetails } from './components/PostDetails/PostDetails';
import { PostsList } from './components/PostsList/PostsList';
import { getUsers } from './api/api';
import { getAllPosts } from './api/posts';

export const App = () => {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState([]);
  const [userSelect, setUserSelect] = useState(0);
  const [posts, setPosts] = useState([]);
  const [filterPosts, setFilterPosts] = useState(posts);
  const [userId, setUserId] = useState(0);

  useEffect(() => {
    getUsers()
      .then((people) => {
        setUsers(people
          .sort((a, b) => a.id - b.id));
      });

    getAllPosts()
      .then((post) => {
        setPosts(post);
        setFilterPosts(post);
      });
  }, []);

  const selectUserId = useCallback((numberID, person) => {
    setUserId(numberID);
    setUser(person);
  }, []);

  const filterByPosts = useCallback((number) => {
    if (number === '0') {
      setFilterPosts(posts.map(post => post));

      return;
    }

    setFilterPosts(posts.filter(post => +post.userId === +number));
  }, [filterPosts]);

  return (
    <div className="App">
      <NavLink
        activeClassName="is-active"
        className="nav__link"
        to="/"
        exact
      >
        Home
      </NavLink>
      <NavLink
        activeClassName="is-active"
        className="nav__link"
        to="/users"
      >
        Users
      </NavLink>
      <NavLink
        activeClassName="is-active"
        className="nav__link"
        to="/posts"
      >
        Posts
      </NavLink>
      <Switch>
        <Route path="/" exact>
          <h1 className="home">HOME</h1>
        </Route>
        <Route path="/users">
          <Users />
        </Route>
        <Route path="/posts">
          <Header
            filterByPosts={filterByPosts}
            setUserSelect={setUserSelect}
            userSelect={userSelect}
            users={users}
          />
          <main className="App__main">
            <div className="App__sidebar">
              <PostsList
                filterPosts={filterPosts}
                selectUserId={selectUserId}
                userId={userId}
              />
            </div>
            {userId !== 0 && (
            <div className="App__content">
              <PostDetails
                userId={userId}
                post={user}
              />
            </div>
            )}
          </main>
        </Route>
        <Redirect to="/" />
        <p>Щось я заблудився</p>
      </Switch>
    </div>
  );
};
