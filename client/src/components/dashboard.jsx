import React, {Component} from 'react';
import {
  HashRouter as Router,
  Route,
  Link
} from 'react-router-dom'

const routes = [
  { path: '/',
    exact: true,
    // sidebar: () => <div>Iam sidebar</div>,
    main: () => <h2>Dashboard</h2>
  },
  { path: '/profile',
    main: () => <h2>Profile</h2>
  },
  { path: '/history',
    main: () => <h2>History</h2>
  }
]

const Dashboard = () => (
  <Router>
    <div style={{ display: 'flex' }}>
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

        {routes.map((route, index) => (
          // You can render a <Route> in as many places
          // as you want in your app. It will render along
          // with any other <Route>s that also match the URL.
          // So, a sidebar or breadcrumbs or anything else
          // that requires you to render multiple things
          // in multiple places at the same URL is nothing
          // more than multiple <Route>s.
          <Route
            key={index}
            path={route.path}
            exact={route.exact}
            component={route.sidebar}
          />
        ))}
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

export default Dashboard;
