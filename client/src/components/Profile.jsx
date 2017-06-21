import React, {Component} from 'react';
import axios from 'axios';
<<<<<<< HEAD
import { PageHeader, Jumbotron, Button } from 'react-bootstrap';

import {
  HashRouter as Router,
  Route,
  Link
} from 'react-router-dom'

=======
>>>>>>> Added the username at the end of the url so you can visit other ppl profile

class Profile extends Component {

  constructor(props) {
    super(props);
    this.state = {
      profile: null
    }
  }

  loadUserProfile(targetProfile) {
    axios.get(`/api/profile/${targetProfile}`)
    .then(response => {
      if (!response.data.length) {
        //TODO if username does not exist show the appropriaye messge to the user
        return Promise.reject(new Error("Invalid username"))
      }
      this.setState({profile: response.data[0]})
    })
    .catch (error => {
      if(process.env.NODE_ENV !== 'production'){
        console.error(error);
      }
    })


  }

<<<<<<< HEAD
  render() {
    let prof = this.state.profile;
    let emptyArr = [];
    // let profileComponent = prof.map(){};

    if (prof.length != 0) {
      for (let i = 0; i < prof.length; i++) {
      emptyArr.push(

      <div key={Math.random()}>
        <PageHeader>
          Profile
        </PageHeader>

        <Jumbotron>
        <div className="wrapper">
          <img src={prof[i].avatar} />
        </div>
          <p> Name: {prof[i].name} </p>
          <p> Github Username: {prof[i].github_username} </p>
          <p> Email: {prof[i].email} </p>
          <Button bsStyle="info">Edit Profile</Button>
        </Jumbotron>

      </div>
      )}
=======
  componentWillUpdate(nextProps, nextState) {
    const usernameChanged = this.props.match.params.username !== nextProps.match.params.username
    if (usernameChanged) {
      this.loadUserProfile(nextProps.match.params.username);
>>>>>>> Added the username at the end of the url so you can visit other ppl profile
    }
  }

  componentDidMount() {
    this.loadUserProfile(this.props.match.params.username)
  }

  render() {
    let profile = this.state.profile;

    if (!profile) {
      return (
        <div>Loading &hellip;</div>
      )
    }

    return (
      <div>
        <p> Name: {profile.name} </p>
        <p> Github Username: {profile.github_username} </p>
        <p> Email: {profile.email} </p>
        <div className="wrapper">
          <img src={profile.avatar} />
        </div>
      </div>
    );
  }
}
export default Profile;
