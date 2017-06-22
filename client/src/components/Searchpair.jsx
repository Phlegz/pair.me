import React, {Component} from 'react';
import axios from 'axios';
import { PageHeader, Jumbotron, Button, FormGroup, ControlLabel, FormControl, Col, ProgressBar } from 'react-bootstrap';
import PieChart from 'react-simple-pie-chart';
import {
  HashRouter as Router,
  Route,
  Link
} from 'react-router-dom';

class Searchpair extends Component {
  constructor(props) {
    super(props);
    this.state = {language: '',
                  difficulty: ''};

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

  componentDidMount() {
    axios.post('/language', {
    firstName: 'Fred',
    lastName: 'Flintstone'
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
  }


  render() {

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
              <option value="PHP">PHP</option>
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
        <br />
        {/*<label>
          Pick a Difficulty Level:
          <select value={this.state.difficulty} onChange={this.handleChange}>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
        </label>
        <br />
        <input type="submit" value="Find me Someone to work with!" />*/}
        <Button type="submit">
          Pair Me
        </Button>
      </form>

      <div className="progressBar">
        <h2>Progress</h2>
        <p>Your progress on completed challenges over time</p>
        <Col sm={5}>
          <ProgressBar now={50} />
          <ProgressBar bsStyle="success" now={40} />
          <ProgressBar bsStyle="info" now={20} />
          <ProgressBar bsStyle="warning" now={60} />
          <ProgressBar bsStyle="danger" now={80} />
        </Col>
        <div className="pieChart">
          <PieChart
            sectorStrokeWidth={2}
            slices={[
              {
                color: '#d9534f',
                value: 20,
              },
              {
                color: '#f5f5f5',
                value: 80,
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