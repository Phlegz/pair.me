import React, {Component} from 'react';
import axios from 'axios';
import { PageHeader, Jumbotron, Button } from 'react-bootstrap';
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
  }

  handleSubmit(event) {
    alert('You picked ' + this.state.value + '!');
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
      <form onSubmit={this.handleSubmit}>
        <label>
          Pick a Language:
          <select value={this.state.language} onChange={this.handleChange}>
            <option value="Javascript">Javascript</option>
            <option value="PHP">PHP</option>
            <option value="Python">Python</option>
            <option value="Java">Java</option>
          </select>
        </label>
        <br />
        <label>
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
        <input type="submit" value="Find me Someone to work with!" />
      </form>
    </div>
  );
  }
}
export default Searchpair;