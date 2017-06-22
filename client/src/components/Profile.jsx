import React, {Component} from 'react';
import axios from 'axios';
import { PageHeader, Jumbotron, Button, Modal, FormGroup, Form, Col, ControlLabel, FormControl } from 'react-bootstrap';


class Profile extends Component {

  constructor(props) {
    super(props);
    this.state = {
      profile: null
    }
    this.updateProfile = this.updateProfile.bind(this);
  }

  getInitialState() {
    return { showModal: false };
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

  updateProfile(event) {
    var self = this;
    let putData = {
      avatar: this.formAvatar.value,
      name: this.formName.value,
      github_username: this.formGithubUsername.value,
      email: this.formEmail.value
    };
    axios.put('/api/profile', putData)
    .then(function(response) {
      self.setState({profile: response.data})
    });
    this.setState({ show: false});
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
    let close = () => this.setState({ show: false});

    if (!profile) {
      return (
        <div>Loading &hellip;</div>
      )
    }

    return (
      <div>
        <PageHeader>
          Profile
        </PageHeader>
        <div className="profile-info">
          <div className="wrapper">
            <img src={profile.avatar} />
          </div>
            <p> Name: {profile.name} </p>
            <p> Github Username: {profile.github_username} </p>
            <p> Email: {profile.email} </p>
            <p> Github Url: github.com/blahblah </p>
        </div>
        <div className="about-me">
            <p> About Me: </p>
        </div>
        <div className="languages">
            <p> Languages: </p>
        </div>

      <div className="edit-profile" style={{height: 200}}>
        <Button
          bsStyle="primary"
          bsSize="large"
          onClick={() => this.setState({ show: true})}
        >
        Edit Profile
        </Button>

        <Modal
          show={this.state.show}
          onHide={close}
          container={this}
          aria-labelledby="contained-modal-title"
        >
          <Modal.Header closeButton>
            <Modal.Title>Update Profile</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form horizontal>
              <FormGroup controlId="avatar">
                <Col componentClass={ControlLabel} sm={2}>
                  Avatar
                </Col>
                <Col sm={10}>
                  <FormControl inputRef={ (input) => this.formAvatar = input } type="text" defaultValue={profile.avatar} />
                </Col>
              </FormGroup>
              <FormGroup controlId="name">
                <Col componentClass={ControlLabel} sm={2}>
                  Name
                </Col>
                <Col sm={10}>
                  <FormControl inputRef={ (input) => this.formName = input } type="text" defaultValue={profile.name} />
                </Col>
              </FormGroup>
              <FormGroup controlId="github_username">
                <Col componentClass={ControlLabel} sm={2}>
                  Github Username
                </Col>
                <Col sm={10}>
                  <FormControl inputRef={ (input) => this.formGithubUsername = input } type="text" defaultValue={profile.github_username} />
                </Col>
              </FormGroup>
              <FormGroup controlId="email">
                <Col componentClass={ControlLabel} sm={2}>
                  Email
                </Col>
                <Col sm={10}>
                  <FormControl inputRef={ (input) => this.formEmail = input } type="email" defaultValue={profile.email} />
                </Col>
              </FormGroup>
              <FormGroup controlId="aboutMe">
                <Col componentClass={ControlLabel} sm={2}>
                  About Me
                </Col>
                <Col sm={10}>
                  <FormControl componentClass="textarea" defaultValue="Type a short description" />
                </Col>
              </FormGroup>
              <FormGroup controlId="formControlsSelect">
                <Col componentClass={ControlLabel} sm={2}>
                  Languages
                </Col>
                <Col sm={10}>
                  <FormControl componentClass="select" placeholder="select">
                    <option value="select">select</option>
                    <option value="Javascript">Javascript</option>
                    <option value="Java">Java</option>
                    <option value="Python">Python</option>
                    <option value="PHP">PHP</option>
                  </FormControl>
                </Col>
              </FormGroup>
              <FormGroup>
                <Col smOffset={2} sm={10}>
                  <Button onClick={this.updateProfile}>
                    Update
                  </Button>
                </Col>
              </FormGroup>
            </Form>
          </Modal.Body>
        </Modal>
      </div>

    </div>

  );

  }
}
export default Profile;