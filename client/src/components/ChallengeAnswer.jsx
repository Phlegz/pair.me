import React, { Component } from 'react';

class ChallengeAnswer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <h1>Answer</h1>
        {this.props.answer.answer}
      </div>
    )
  }
}

export default ChallengeAnswer;