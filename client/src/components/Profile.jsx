import React, {Component} from 'react';
import axios from 'axios';
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

    if (prof.length != 0) {
      for (let i = 0; i < prof.length; i++) {
      emptyArr.push(
      <div>
        <p> {prof[i].github_username} </p>
        <img src={prof[i].avatar} />
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