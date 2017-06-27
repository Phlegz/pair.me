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

import { Image, Navbar, Nav, NavItem, MenuItem, NavDropdown, Button } from 'react-bootstrap';

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
  },
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

  constructor(props){
    super(props);
    this.state ={
      profile: null,
      friends: {
        github_username: "",
        avatar: ''
      }
    }
  }


  componentDidMount() {
    console.log('sucess mount')

    axios.get('/api/profile_current')
    .then((response) => {
      console.log('blabla', response.data.avatar);
      this.setState({ profile: response.data.avatar})
    })

    axios.get('/api/friends')
    .then((response) => {
      console.log('response from FRIENDS', response)
      this.setState({friends: response.data})
      console.log("MYFRIENDS",this.state.friends);
    })
  }

  render() {
    const self = this;
    let profile = this.state.profile;
    let friends = this.state.friends;
    let friendsArr = [];
    for (let i = 0; i < friends.length; i++) {
      friendsArr.push(
      <div>
        <Image circle className="friendsPic" src={friends[i].avatar} />
        <p>{friends[i].github_username} </p>
      </div>
      )
    }
    const navBar = (
         <Navbar inverse collapseOnSelect>
          <Navbar.Header>
            <Image className="logo" src={require('../../styles/img/computer.png')}/>
            <Navbar.Brand>
              <a className="brand" href="#">Pair Me</a>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
          <Nav>

          </Nav>
          <Nav pullRight>
            <NavItem><img className="profilePic" src={profile} /></NavItem>
            <NavItem>Hello, {myGithubUsername}</NavItem>
            <Button className="logout" href="/logout">Log out</Button>
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
                <li className="sideLinks"><Link to="/dashboard"><i className="fa fa-home" aria-hidden="true"></i>Dashboard</Link></li>
                <li className="sideLinks"><Link to={"/profiles/" + myGithubUsername}><i className="fa fa-user" aria-hidden="true"></i> Profile</Link></li>
                <li className="sideLinks"><Link to="/history"><i className="fa fa-history" aria-hidden="true"></i>History</Link></li>
              </ul>
              <div className="friends">
                { friendsArr }
              </div>
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
