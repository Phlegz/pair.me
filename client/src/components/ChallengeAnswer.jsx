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
          width={1308}
          height={170}
          value={this.props.answer.answer}
        />
      </span>
    )
  }
}

export default ChallengeAnswer;




