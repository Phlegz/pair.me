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
      profile: []
    }
  }

  getInitialState() {
    return { showModal: false };
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

    let close = () => this.setState({ show: false});

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
        </Jumbotron>

      </div>
      )}
    }

  return (

    <div>
      {emptyArr}

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
                  <FormControl type="text"/>
                </Col>
              </FormGroup>
              <FormGroup controlId="github_username">
                <Col componentClass={ControlLabel} sm={2}>
                  Github Username
                </Col>
                <Col sm={10}>
                  <FormControl type="text"/>
                </Col>
              </FormGroup>
              <FormGroup controlId="email">
                <Col componentClass={ControlLabel} sm={2}>
                  Email
                </Col>
                <Col sm={10}>
                  <FormControl type="text"/>
                </Col>
              </FormGroup>
              <FormGroup>
                <Col smOffset={2} sm={10}>
                  <Button onClick={updateProfile}>
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