import React, { Component } from 'react';
import axios from 'axios'


class ChallengeQuestions extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='challenge-question'>
        <h1>Question</h1>
        <h3>JavaScript: {this.props.questions.title}</h3>
        <h4>{this.props.questions.question}</h4>
      </div>
    )
  }
}



export default ChallengeQuestions;