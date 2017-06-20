import React, {Component} from 'react';
import axios from 'axios';
import {
  HashRouter as Router,
  Route,
  Link
} from 'react-router-dom'


class History extends Component {
  constructor(props) {
    super(props);
    this.state = {
      history: []
    };
    axios.get('/api/history')
    .then(/*function*/ (response) => {
        this.setState({history: this.state.history.concat(response.data)})
        console.log('in axios, after concat', response.data);
    })
    .catch (function(error) {
      console.log(error);
    })
  }

  // componentDidMount() {
    // var self = this;
  // }

  render() {
    // let history = this.state.history;
    // let newArr = [];

    // const profileHistory = this.state.history.map(hist => {
    //   return <History
    //     key= {hist.id}
    //     question = {hist.question_id}
    //     completed = {hist.completed_at}
    //     answer = {hist.submitted_answer}
    //   />
    // });
    console.log('history', this.state.history);

    return(
      <div>
        {
          this.state.history.map(hist => {
            return (
            <dl key={hist.id}>
              <dt>question</dt><dd>{hist.question_id}</dd>
              <dt>completed</dt><dd>{hist.completed_at}</dd>
              <dt>answer</dt><dd>{hist.submitted_answer}</dd>
            </dl>)
           })
        }
      </div>
    );
  }
}

export default History;