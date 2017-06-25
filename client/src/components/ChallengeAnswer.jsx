import React, { Component } from 'react';

class ChallengeAnswer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <span className="challenge-answer">
        Answer
        {this.props.answer.answer}
      </span>
    )
  }
}

export default ChallengeAnswer;