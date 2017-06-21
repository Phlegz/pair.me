import React, {Component} from 'react';
import axios from 'axios';
import { PageHeader, Jumbotron, Button } from 'react-bootstrap';

import {
  HashRouter as Router,
  Route,
  Link
} from 'react-router-dom'


class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profile: []
    }
  }

  componentDidMount() {
    var self = this;
    axios.get('/api/profile')
    .then(function (response) {
        self.setState({profile: self.state.profile.concat(response.data)})
        console.log('in axios, after concat', response.data);
    })
    .catch (function(error) {
      console.log(error);
    })


  }

  render() {
    let prof = this.state.profile;
    let emptyArr = [];
    // let profileComponent = prof.map(){};

    if (prof.length != 0) {
      for (let i = 0; i < prof.length; i++) {
      emptyArr.push(

      <div key={Math.random()}>
        <PageHeader>
          <h2>Profile</h2>
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
    }

  return (

    <div>
      {emptyArr}
    </div>
  );

  }
}
export default Profile;