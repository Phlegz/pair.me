import React, { Component } from 'react';
import axios from 'axios'


class ChallengeQuestions extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='challenge-question'>
       <h1 className='title'>Question</h1>
       <h5>JavaScript: {this.props.questions.title}</h5>
       <h6>{this.props.questions.question}</h6>
      </div>
    )
  }
}



export default ChallengeQuestions;