import React, {Component} from 'react';
import Profile from './Profile.jsx';
import History from './History.jsx';
import Searchpair from './Searchpair.jsx';
import axios from 'axios';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
import { Navbar, Nav, NavItem, MenuItem, NavDropdown } from 'react-bootstrap';
const io = require('socket.io-client');
const socket = io();


const routes = [
  {
    path: '/dashboard',
    exact: true,
    main: () => (<Searchpair />)
  },
  {
    path: '/profiles/:username',
    main: Profile
  },
  {
    path: '/history',
    main: History
  }
];


// readCookie copied from https://www.quirksmode.org/js/cookies.html
function readCookie(name) {
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	}
	return null;
}

const myGithubUsername = readCookie('unsafe_user_name');

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      user: null
    }
   
    this.socket = io.connect();
  }
  componentDidMount() {
    axios.get('/api/profile_current')
    .then((response)=> {
      this.setState({user: response.data.github_username})
      // console.log(this.state.user)
    })
    socket.on('connect', () => {
      console.log('Id client connected',socket.id);
      console.log('A client connected');
    }); 
    socket.on('disconnect', () => {
      console.log('Client disconnected');
    });
  }
  render() {
    const self = this;
    const navBar = (
         <Navbar inverse collapseOnSelect>
          <Navbar.Header>
            <Navbar.Brand>
              <a href="#">Pair Me</a>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
          <Nav>

          </Nav>
          <Nav pullRight>
            <NavItem eventKey={1} href="#">Link Right</NavItem>
            <NavItem eventKey={2} href="#">Link Right</NavItem>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      );
    return (

      <Router>
        <div className="navBar">
          {navBar}
          <div className="outer-sidebar">
            <div className="sidebar">
              <ul className="links" style={{ listStyleType: 'none' }}>
                <li><Link to="/dashboard">Dashboard</Link></li>
                <li><Link to={"/profiles/" + myGithubUsername}>Profile</Link></li>
                <li><Link to="/history">History</Link></li>
              </ul>
            </div>

          <div className="routes">
            {routes.map((route, index) => (
              // Render more <Route>s with the same paths as
              // above, but different components this time.
              <Route
                key={Math.random()}
                path={route.path}
                exact={route.exact}
                component={route.main}
              />
            ))}
          </div>
        </div>
      </div>

      </Router>
  );
  }
}
export default Dashboard;
