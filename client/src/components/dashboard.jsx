import React, {Component} from 'react';
import Profile from './Profile.jsx';
import History from './History.jsx';
import Searchpair from './Searchpair.jsx';
import axios from 'axios';
import {
  HashRouter as Router,
  Route,
  Link
} from 'react-router-dom'

import { Navbar, Nav, NavItem } from 'react-bootstrap';

const routes = [
  {
    path: '/',
    exact: true,
    main: () => (<Searchpair />)
  },
  {
    path: '/profile',
    main: Profile
  },
  {
    path: '/history',
    main: History
  }
];


class Dashboard extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (

      <Router>

          <div className="outer-sidebar">
            <div className="sidebar">
              <ul style={{ listStyleType: 'none', padding: 'auto', position: 'fixed' }}>
                <li><Link to="/">Dashboard</Link></li>
                <li><Link to="/profile">Profile</Link></li>
                <li><Link to="/history">History</Link></li>
              </ul>
            </div>


          <div className="routes">
            {routes.map((route, index) => (
              // Render more <Route>s with the same paths as
              // above, but different components this time.
              <Route
                key={index}
                path={route.path}
                exact={route.exact}
                component={route.main}
              />
            ))}
          </div>
        </div>


      </Router>
  );
  }
}
export default Dashboard;
