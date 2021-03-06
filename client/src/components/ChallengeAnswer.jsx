import React, { Component } from 'react';
import AceEditor from 'react-ace';


class ChallengeAnswer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <span className="challenge-answer">
        <AceEditor
          name="answerKey"
          mode="javascript"
          theme="monokai"
          readOnly={true}
          fontSize={19}
          width={1320}
          height={210}
          value={this.props.answer.answer}
        />
      </span>
    )
  }
}

export default ChallengeAnswer;
