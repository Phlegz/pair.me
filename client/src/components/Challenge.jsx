import React, {Component} from 'react';
import brace from 'brace';
import AceEditor from 'react-ace';
import axios from 'axios';

import 'brace/mode/javascript';
import 'brace/theme/monokai';

import ChatBox from './ChatBox.jsx';
import ChallengeQuestions from './ChallengeQuestions.jsx'

const io = require('socket.io-client');
const socket = io();

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
        placeholder: "",
        answer: "",
        unit_test: ""
      },
      sendUpdate: true,
    }
    this.socket = io.connect();
    this.liveCode = this.liveCode.bind(this);
  }
  componentWillMount() {
    axios.get('/api/questions')
    .then((response)=> {
      this.setState({questions: {
        title: response.data[0].title,
        question: response.data[0].question,
        example: response.data[0].example,
        placeholder: response.data[0].placeholder,
        answer: response.data[1].answer,
        unit_test: response.data[0].unit_test
        }
      },
      this.setState({aceValue: `${response.data[1].example}\n\n${response.data[1].placeholder}\n${response.data[1].unit_test}`}))
    })
  }
  componentDidMount() {
    console.log('successfully mounted');

     axios.get('/api/profile_current')
     .then((response)=> {
       this.setState({user: response.data})
     });

    socket.on('serverLiveCode', (code)=> {
      this.setState({sendUpdate:true});
      this.setState({aceValue: code});
    });
  }
  liveCode() {
    // console.log('calling function');
    let editor = ace.edit('codeChallenges');
    let code = editor.getValue();
    if (this.state.sendUpdate) {
      socket.emit('liveCode', JSON.stringify({code: code }));
    }
    this.setState({sendUpdate:true});
  }
  submitCode(event){
    event.preventDefault();

    let editor = ace.edit('codeChallenges');
    let textValue = JSON.stringify(editor.getValue());

    axios.post('/api/challenges', {
      answer: textValue
    })
    .then((response)=> {
      let outputData = JSON.parse(response.data);
      this.setState({result: outputData.result});
      this.setState({console: outputData.console});
    })
    .catch((error)=> {
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
        <ChallengeQuestions questions={ this.state.questions } />
        <AceEditor
          name="codeChallenges"
          mode="javascript"
          theme="monokai"
          editorProps={{$blockScrolling: Infinity}}
          tabSize={2}
          //invoke livecode function everytime the text box changess
          onChange={ this.liveCode }
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
        <ChatBox user={ this.state.user } />
      </div>

    );
  }
}
export default Challenge;
