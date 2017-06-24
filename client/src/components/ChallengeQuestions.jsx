import React, { Component } from 'react';
import axios from 'axios'


class ChallengeQuestions extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        {this.props.questions.question}
      </div>
    )
  }
}



export default ChallengeQuestions;