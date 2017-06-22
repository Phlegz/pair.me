import React, {Component} from 'react';
import axios from 'axios';
import { PageHeader, Jumbotron, Button, Modal, FormGroup, Form, Col, ControlLabel, FormControl } from 'react-bootstrap';

import {
  HashRouter as Router,
  Route,
  Link
} from 'react-router-dom';


class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profile: {}
    }

    this.updateProfile = this.updateProfile.bind(this);
  }

  getInitialState() {
    return { showModal: false };
  }

  componentDidMount() {
    var self = this;
    axios.get('/api/profile')
    .then(function (response) {
      self.setState({profile: response.data})
      console.log('in axios, after concat', response.data);
    })
    .catch (function(error) {
      console.log(error);
    })
  }

   updateProfile(event) {
    var self = this;
    let putData = {
      name: this.formName.value,
      githubUsername: this.formGithubUsername.value,
      email: this.formEmail.value
    };
    axios.put('/api/profile', putData)
      .then(function(response) {
        self.setState({profile: response.data})
      });
    this.setState({ show: false});
  }


  render() {
    let prof = this.state.profile;

    let close = () => this.setState({ show: false});

  return (

    <div>
      <div>
        <PageHeader>
          Profile
        </PageHeader>

        <Jumbotron>
        <div className="wrapper">
          <img src={prof.avatar} />
        </div>
          <p> Name: {prof.name} </p>
          <p> Github Username: {prof.github_username} </p>
          <p> Email: {prof.email} </p>
        </Jumbotron>

      </div>

      <div className="modal-container" style={{height: 200}}>
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
              <FormGroup controlId="name">
                <Col componentClass={ControlLabel} sm={2}>
                  Name
                </Col>
                <Col sm={10}>
                  <FormControl inputRef={ (input) => this.formName = input } type="text" defaultValue={prof.name}/>
                </Col>
              </FormGroup>
              <FormGroup controlId="github_username">
                <Col componentClass={ControlLabel} sm={2}>
                  Github Username
                </Col>
                <Col sm={10}>
                  <FormControl inputRef={ (input) => this.formGithubUsername = input } type="text"/>
                </Col>
              </FormGroup>
              <FormGroup controlId="email">
                <Col componentClass={ControlLabel} sm={2}>
                  Email
                </Col>
                <Col sm={10}>
                  <FormControl inputRef={ (input) => this.formEmail = input } type="text"/>
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