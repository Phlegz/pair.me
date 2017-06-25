import React, {Component} from 'react';
import axios from 'axios';
import { PageHeader, Jumbotron, Button, FormGroup, ControlLabel, FormControl, Col, ProgressBar, Label } from 'react-bootstrap';
import PieChart from 'react-simple-pie-chart';
import Moment from 'react-moment';
import {
  HashRouter as Router,
  Route,
  Link
} from 'react-router-dom';

class Searchpair extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      average: 0,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({language: event.target.value});
    this.setState({difficulty: event.target.value});
  }

  handleSubmit(event) {
    alert('You picked ' + this.state.language + ' level ' + this.state.difficulty + '!');
    event.preventDefault();
  }

  loadProgress(event) {
  }

  componentWillMount() {
    // var self = this;
    axios.get('/api/statistics')
    .then((response)=> {
      this.setState({data: response.data.rows});
        // console.log(response.data.rows.length, 'LENGTH');
        // console.log(this.state.data, 'this is an object - 6 length');
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
      console.log(avgDifficulty, 'AVG');
      this.setState({ average: avgDifficulty });
      console.log(this.state.average, 'average state')
    })
    .catch((error)=> {
      console.log(error);
    });


  }


  render() {

    const challengesCompleted = "1 challenge completed";
    const today = Date.now();
    const yesterday = Date.now() - 86400000;
    const twoDaysAgo = Date.now() - (86400000*2);
    const threeDaysAgo = Date.now() - (86400000*3);
    const fourDaysAgo = Date.now() - (86400000*4);

  return (
    <div>
      <PageHeader>
        Search for a Pair
      </PageHeader>
      <p>
        You can start a session by clicking on the "Pair Me" button.
      </p>
      <form onSubmit={this.handleSubmit}>
        <FormGroup controlId="formControlsSelect">
          <Col componentClass={ControlLabel} sm={4}>
            Select a language
          </Col>
          <br />
          <Col sm={10}>
            <FormControl componentClass="select" placeholder="select">
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
            <FormControl componentClass="select" placeholder="select">
              <option value="select">select</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </FormControl>
          </Col>
        </FormGroup>
        <Button onClick={this.pairMe}>
          Pair Me
        </Button>
      </form>

      <div className="progressBar">
        <h2>Progress</h2>
        <p>Your progress on completed challenges over time</p>
        <Col sm={5}>
          <Label> <Moment calendar>{today}</Moment> </Label>
          <ProgressBar min={0} max={5} now={10} />
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
    </div>
  );
  }
}
export default Searchpair;