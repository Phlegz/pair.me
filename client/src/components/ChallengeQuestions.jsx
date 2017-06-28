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
       <h4>JavaScript: {this.props.questions.title}</h4>
       <h5>{this.props.questions.question}</h5>
      </div>
    )
  }
}



export default ChallengeQuestions;
