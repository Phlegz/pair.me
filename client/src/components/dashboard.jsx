import React, {Component} from 'react';
import Profile from './Profile.jsx';
import History from './History.jsx';
import axios from 'axios';
import {
  HashRouter as Router,
  Route,
  Link
} from 'react-router-dom'

const routes = [
  {
    path: '/',
    exact: true,
    // main: () => (<h2>Dashboard</h2>)
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
        <div style={{ display: 'flex'}}>
          <div style={{
            padding: '10px',
            width: '20%',
            background: 'white',
            height: '1200px'
          }}>
            <ul style={{ listStyleType: 'none', padding: 'auto', position: 'fixed' }}>
              <li><Link to="/">Dashboard</Link></li>
              <li><Link to="/profile">Profile</Link></li>
              <li><Link to="/history">History</Link></li>
            </ul>

          </div>

          <div style={{ flex: 1, padding: '10px' }}>
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
  )
}
}

export default Dashboard;
