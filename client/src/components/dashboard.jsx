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

import { Image, Navbar, Nav, NavItem, MenuItem, NavDropdown, Button, ListGroup, ListGroupItem } from 'react-bootstrap';

const routes = [
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
console.log("github username", myGithubUsername);

class Dashboard extends React.Component {

  constructor(props){
    super(props);
    this.state ={
      profile: null,
      friends: {
        github_username: "",
        avatar: '',
        online: ''
      },
      onlineFriends: []
    }
  }


  componentDidMount() {
    console.log('dashboard sucess mount')

    axios.get('/api/profile_current')
    .then((response) => {
      this.setState({ profile: response.data.avatar})
    })

    axios.get('/api/friends')
    .then((response) => {
      this.setState({friends: response.data})
      let friends = this.state.friends
      let onlineFriends = [];
      for (let i = 0; i < friends.length; i++) {
        if(friends[i].online == true) {
          onlineFriends.push(friends[i].github_username)
        }
      }
      this.setState({onlineFriends: onlineFriends});
    })

  }
  render() {
    const self = this;
    let profile = this.state.profile;
    let friends = this.state.friends;
    let friendsArr = [];

    for (let i = 0; i < friends.length; i++) {
      friendsArr.push(
      <div className="oneFriend">
          {
            friends[i].online == true
            ? <i className="fa fa-circle" aria-hidden="true"></i>
            : <i className="fa fa-circle offline" aria-hidden="true"></i>
          }
        <Link to={"/profiles/" + friends[i].github_username}><Image circle className="friendsPic" src={friends[i].avatar} /></Link>
        <p className="friendsName">{friends[i].github_username} </p>
      </div>
      )

    }
    const searchPairRoute = (<Route
                key={Math.random()}
                path={'/dashboard'}
                exact={true}
                component={() => (<Searchpair onlineFriends={this.state.onlineFriends}/>)}
              />);
    const navBar = (
         <Navbar responsive inverse collapseOnSelect>
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
            <NavItem><Link to={"/profiles/" + myGithubUsername}><img className="profilePic" src={profile} /></Link></NavItem>
            <NavItem>Hello, {myGithubUsername}</NavItem>
            <Button className="logout" href="/logout">Log out</Button>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      );
    return (

      <Router>
        <div className="navBar">
          { navBar }
          <div className="outer-sidebar">
            <div className="sidebar">
              <ul className="links" style={{ listStyleType: 'none' }}>

                <li className="sideLinks"><Link to="/dashboard" style={{ padding: 6, paddingRight: 48 }}><i className="fa fa-home" aria-hidden="true"></i>DASHBOARD</Link></li>
                <li className="sideLinks"><Link to={"/profiles/" + myGithubUsername} style={{ padding: 6, paddingRight: 82 }}><i className="fa fa-user" aria-hidden="true"></i> PROFILE</Link></li>
                <li className="sideLinks"><Link to="/history" style={{ padding: 6, paddingRight: 82 }}><i className="fa fa-history" aria-hidden="true"></i>HISTORY</Link></li>

              </ul>
              <div className="friends">
                <h3>Friends</h3>
                { friendsArr }
              </div>
            </div>

          <div className="routes">
          {searchPairRoute}
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
