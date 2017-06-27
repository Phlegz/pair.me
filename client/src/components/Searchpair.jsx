import React, {Component} from 'react';
import axios from 'axios';
import { PageHeader, Jumbotron, Button, Modal, FormGroup, ControlLabel, FormControl, Col, ProgressBar, Label } from 'react-bootstrap';
import PieChart from 'react-simple-pie-chart';
import Moment from 'react-moment';
import moment from 'moment';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

class Searchpair extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      average: 0,
      completedAt: null,
      challengesCompleted: null,
      pairMeModal: false,
      pair: {id:"",github_username:"",avatar:""},
      waitModal: false,
      onlineFriends: this.props.onlineFriends
    }

    // this.handleChange = this.handleChange.bind(this);
    // this.handleSubmit = this.handleSubmit.bind(this);
    this.pairMe = this.pairMe.bind(this);
    this.sendRequest = this.sendRequest.bind(this);
    this.cancelRequest = this.cancelRequest.bind(this);
  }

  handleChange(event) {
    this.setState({language: event.target.value});
    this.setState({difficulty: event.target.value});
  }

  // handleSubmit(event) {
  //   alert('You picked ' + this.state.language + ' level ' + this.state.difficulty + '!');
  //   event.preventDefault();
  //   var self = this;
  //   axios.post('/dashboard')
  //   .then(function(response) {
  //     // console.log(response.data, 'ADSFJK;L');
  //   })
  //   .catch(function(error) {
  //     console.log(error);
  //   });
  // }

  pairMe(event) {
    event.preventDefault();
    this.setState({ pairMeModal: true})
    let postData = {
      language: this.language.value,
      difficulty: this.difficulty.value
    };
    axios.post('/api/dashboard', postData)
    .then((response) => {
      this.setState({pair: response.data});
      console.log("pair state:", this.state.pair);
    })
    .catch(error => {
      console.log(error);
    });
  }

  sendRequest(event) {
    event.preventDefault();
    this.setState({pairMeModal: false})
    this.setState({waitModal: true})

    axios.post('/api/notifications', {
      acceptingUserId: this.state.pair.id
    })
    .then((response) => {
    console.log(response.data);
    })
    .catch(error => {
      console.log(error);
    });
  }

  cancelRequest(event) {
    event.preventDefault();
    this.setState({ waitModal: false})

    axios.post('/api/notifications/cancel', {
      acceptingUserId: this.state.pair.id
    })
    .then((response) => {
    console.log(response.data);
    })
    .catch(error => {
      console.log(error);
    });
  }

  // timer() {
  //   axios.get('/api/notifications')
  //     .then((response) => {
  //       console.log(response.data)
  //     })
  // }

  componentWillMount() {
    axios.get('/api/statistics')
    .then((response)=> {
      this.setState({data: response.data.rows});
      const data = this.state.data;
      console.log(data, 'current state of data');
      const difficultyList = [];

      if(data != null) {
        data.forEach((difficulty) => {
          difficultyList.push(data[0].difficulty);
        })
      };

      const sum = difficultyList.reduce(function(acc, val) {
        return acc + val;
      }, 0);

      const avgDifficulty = sum / difficultyList.length;
      this.setState({ average: avgDifficulty });
    })
    .catch((error)=> {
      console.log(error);
    });
  }

  componentDidMount() {
    axios.get('/api/dashboard')
    .then((response) => {
      this.setState({challengesCompleted: response.data});
    })
    .catch((error) => {
      console.log(error);
    });

    // let intervalId = setInterval(this.timer, 2000);
  }

  // componentWillUnmount() {
  //  // use intervalId from the state to clear the interval
  //  clearInterval(this.state.intervalId);
  // }

  render() {
    const onlineFriends = this.state.onlineFriends;
    const data = this.state.data;
    let closePairModal = () => this.setState({ pairMeModal: false});
    let closeWaitModal = () => this.setState({ waitModal: false});
    const challengesCompleted = "1 challenge completed";
    const today = Date.now();
    const yesterday = Date.now() - 86400000;
    const twoDaysAgo = Date.now() - (86400000*2);
    const threeDaysAgo = Date.now() - (86400000*3);
    const fourDaysAgo = Date.now() - (86400000*4);
    const dates = [];

    if (data != null) {
      data.forEach((completed_at) => {
        dates.push(data[0].completed_at);
        return dates
      });
    }

    const pairOnlineFriend = (
      onlineFriends.map(function(friend) {
        return <option value={friend}>{friend}</option>
      })
    );

  return (
    <div>
      <PageHeader>
        Search for a Pair
      </PageHeader>
      <p>
        You can start a session by clicking on the "Pair Me" button.
      </p>
      <form //onSubmit={this.handleSubmit}
      >
        <FormGroup controlId="formControlsSelect">
          <Col componentClass={ControlLabel} sm={4}>
            Select a language
          </Col>
          <br />
          <Col sm={10}>
            <FormControl componentClass="select" placeholder="select" inputRef={ (input) => this.language = input}>
              <option value="select">select</option>
              <option value="Javascript">Javascript</option>
              <option value="Ruby">Ruby</option>
              <option value="Python">Python</option>
              <option value="Java">Java</option>
            </FormControl>
          </Col>
        </FormGroup>
        <FormGroup controlId="formControlsSelect">
          <Col componentClass={ControlLabel} sm={4}>
            Select a difficulty level
          </Col>
          <br />
          <Col sm={10}>
            <FormControl componentClass="select" placeholder="select" inputRef={ (input) => this.difficulty = input}>
              <option value="select">select</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </FormControl>
          </Col>
        </FormGroup>
        <FormGroup controlId="formControlsSelect">
          <Col componentClass={ControlLabel} sm={4}>
            Select a friend
          </Col>
          <br />
          <Col sm={10}>
            <FormControl componentClass="select" placeholder="select" inputRef={ (input) => this.friend = input}>
              {pairOnlineFriend}
            </FormControl>
          </Col>
        </FormGroup>
        <input type='button' value='pair me' onClick={(e) => this.pairMe(e)}/>

      </form>

      <div className="progressBar">
        <h2>Progress</h2>
        <p>Your progress on completed challenges over time</p>
        <Col sm={5}>
          <Label> <Moment calendar>{today}</Moment> </Label>
          <ProgressBar min={0} max={5} now={1} />
          <Label> <Moment format="LL">{yesterday}</Moment> </Label>
          <ProgressBar bsStyle="success" now={0} label={`${challengesCompleted}%`}/>
          <Label> <Moment format="LL">{twoDaysAgo}</Moment> </Label>
          <ProgressBar bsStyle="info" now={20} />
          <Label> <Moment format="LL">{threeDaysAgo}</Moment> </Label>
          <ProgressBar bsStyle="warning" now={60} />
          <Label> <Moment format="LL">{fourDaysAgo}</Moment> </Label>
          <ProgressBar bsStyle="danger" now={100} />
        </Col>
        <div className="pieChart">
          <PieChart
            sectorStrokeWidth={2}
            slices={[
              {
                color: '#d9534f',
                min: 1,
                max: 5,
                value: this.state.average
              },
              {
                color: '#f5f5f5',
                min: 1,
                max: 5,
                value: 5 - this.state.average
              },
            ]}
          />
        </div>
      </div>


      <Modal
        show={this.state.pairMeModal}
        onHide={closePairModal}
        container={this}
        aria-labelledby="contained-modal-title"
      >
        <Modal.Header closeButton>
          <Modal.Title>You have been matched with {this.state.pair.github_username}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="wrapper">
            <img src={this.state.pair.avatar} />
          </div>
          <p>Visit {this.state.pair.github_username}&#39;s <a href={"https://github.com/" + this.state.pair.github_username}> Github </a> Account</p>
          <Button
            bsStyle="primary"
            bsSize="large"
            onClick={(e) => this.pairMe(e)}
          >
          Search Again
          </Button>
          <Button
            bsStyle="success"
            bsSize="large"
            onClick={(e) => this.sendRequest(e)}
          >
          Send Request
          </Button>
        </Modal.Body>
      </Modal>

      <Modal
        show={this.state.waitModal}
        onHide={closeWaitModal}
        container={this}
        aria-labelledby="contained-modal-title"
        backdrop="static"
        keyboard={false}
      >
        <Modal.Body>
          <Modal.Header>
            <Modal.Title>Waiting for {this.state.pair.github_username}&#39;s Response</Modal.Title>
          </Modal.Header>
          <div className="wrapper">
            <img src={this.state.pair.avatar} />
          </div>
          <Button
            bsStyle="danger"
            bsSize="large"
            onClick={(e) => this.cancelRequest(e)}
          >
          Cancel Request
          </Button>
        </Modal.Body>
      </Modal>

    </div>
  );
  }
}
export default Searchpair;
