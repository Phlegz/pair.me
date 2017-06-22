import React, {Component} from 'react';
import axios from 'axios';

class Profile extends Component {

  constructor(props) {
    super(props);
    this.state = {
      profile: null
    }
  }

  loadUserProfile(targetProfile) {
    axios.get(`/api/profiles/${targetProfile}`)
    .then(response => {
      console.log(response.data);
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

  componentWillUpdate(nextProps, nextState) {
    const usernameChanged = this.props.match.params.username !== nextProps.match.params.username
    if (usernameChanged) {
      this.loadUserProfile(nextProps.match.params.username);
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
