import React, {Component} from 'react';
import axios from 'axios';
import { PageHeader } from 'react-bootstrap';
import { Table } from 'react-bootstrap';
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


  render() {

    console.log('history', this.state.history);

    return(
      <div>
        <PageHeader>
          <h2>Challenges Done</h2>
        </PageHeader>
        {
          this.state.history.map(hist => {
            return (
            <div key={hist.id}>
              <Table striped bordered condensed hover>
                <thead>
                  <tr>
                    <th>Questions</th>
                    <th>Completed</th>
                    <th>Answers</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{hist.question}</td>
                    <td>{hist.completed_at}</td>
                    <td>{hist.submitted_answer}</td>
                  </tr>
                </tbody>
              </Table>
            </div>)
            })
        }
      </div>
    );
  }
}

export default History;