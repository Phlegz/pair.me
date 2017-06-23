import React, {Component} from 'react';
import brace from 'brace';
import AceEditor from 'react-ace';
import axios from 'axios';

import 'brace/mode/javascript';
import 'brace/theme/monokai';

import ChatBox from './chatBox.jsx';

class Challenge extends Component {
  constructor(props) {
    super(props);
    this.state = {
      result: "",
      console: [],
      aceValue: "",
      user: null,
      questions: {
        title: "",
        question: "",
        example: "",
        defaultCode: "",
        answer: "",
        unit_test: ""
      }
    }
  }
  componentWillMount() {
    axios.get('/api/questions')
    .then((response)=> {
      this.setState({questions: {
        title: response.data[0].title,
        question: response.data[0].question,
        example: response.data[0].example,
        placeholder: response.data[0].defaultCode,
        answer: response.data[0].answer,
        unit_test: response.data[0].unit_test
        }
      },
      this.setState({aceValue: `${response.data[0].example}\n\n${response.data[0].placeholder}\n${response.data[0].unit_test}`}))
    })
    // this.setState({aceValue: "ABC"});
  }
  componentDidMount() {
    axios.get('/api/profile_current')
    .then((response)=> {
      this.setState({user: response.data})
    })
  }

  submitCode(event){
    event.preventDefault();

    let editor = ace.edit('codeChallenges');
    let textValue = JSON.stringify(editor.getValue());

    this.setState({aceValue: editor.getValue()});

    var self = this;
    axios.post('/api/challenges', {
      answer: textValue
    })
    .then(function(response) {

      let outputData = JSON.parse(response.data);
      self.setState({result: outputData.result});
      self.setState({console: outputData.console});
    })
    .catch(function(error){
      console.log(error);
    })
  }
  render() {
    let console = this.state.console;
    let consoleArr = [];
    for (let i = 0; i < console.length; i++) {
      consoleArr.push(
        <ul>{ console[i] }</ul>
      )
    }
    let showResult;
    if (this.state.result !== "null"){
     showResult = <ul>{ this.state.result }</ul>;
    }
    return (
      <div>
        <AceEditor
          name="codeChallenges"
          mode="javascript"
          theme="monokai"
          editorProps={{$blockScrolling: Infinity}}
          tabSize={2}
          value={this.state.aceValue}
        />
        <input type='button' value='Submit' onClick={(e) => this.submitCode(e) } />
        <div className="output">
          Output:
          { consoleArr }
          { showResult }
        </div>
        <div className="showAnswer">
          { this.state.questions.answer }
        </div>
        <ChatBox user={this.state.user} />
      </div>

    );
  }
}
export default Challenge;
