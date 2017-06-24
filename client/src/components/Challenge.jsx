import React, {Component} from 'react';
import brace from 'brace';
import AceEditor from 'react-ace';
import axios from 'axios';

import 'brace/mode/javascript';
import 'brace/theme/monokai';

import ChatBox from './ChatBox.jsx';
import ChallengeQuestions from './ChallengeQuestions.jsx'
import ChallengeAnswer from './ChallengeAnswer.jsx'


const io = require('socket.io-client');
const socket = io();

class Challenge extends Component {
  constructor(props) {
    super(props);
    this.state = {
      result: null,
      console: [],
      aceValue: "",
      user: null,
      showAnswer: false,
      questions: {
        title: "",
        question: "",
        example: "",
        placeholder: "",
        answer: "",
        unit_test: "",
        test_result: ""
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
        title: response.data[1].title,
        question: response.data[1].question,
        example: response.data[1].example,
        placeholder: response.data[1].placeholder,
        answer: response.data[1].answer,
        unit_test: response.data[1].unit_test,
        test_result: response.data[1].test_result
        }
      },
      this.setState({aceValue: `${response.data[1].example}\n\n${response.data[1].placeholder}`}))
    })
  }
  componentDidMount() {
    console.log('successfully mounted');
    console.log("RESULT",this.state.result)
     axios.get('/api/profile_current')
     .then((response)=> {
       this.setState({user: response.data})
     });

    socket.on('serverLiveCode', (code)=> {
      this.setState({sendUpdate:true});
      this.setState({aceValue: code});
    });
  }

  onClick(e) {
    e.preventDefault();
    this.setState({ showAnswer: !this.state.showAnswer })
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
        <ul>console.log => { console[i] }</ul>
      )
    }
    let showResult = '';
    let result = this.state.result;
    if (result !== null && result !== 'null') {
      let test_result = this.state.questions.test_result
      if (result === test_result){
        showResult = <div className="resultLog">
                       <ul>Unit Test => {this.state.questions.unit_test}</ul>
                       <ul>Result => { result }</ul>
                       <ul>Expected Answer => {test_result}</ul>
                       <h3>CORRECT!</h3>
                     </div>  
      } else {
        showResult = <div className="resultLog">
                       <ul>Unit Test=> {this.state.questions.unit_test}</ul>
                       <ul>Result => { result }</ul>
                       <ul>Expected Answer => {test_result}</ul>
                       <h3>Wrong, please try again</h3>
                     </div>  
      }
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
          <div className="consoleLog">{ consoleArr }</div>
          { showResult }
        </div>
        <div className="showAnswer">
          <a onClick= {this.onClick.bind(this)} href='#'> Give me answeR</a>
          {this.state.showAnswer && <ChallengeAnswer answer= { this.state.questions } /> }
        </div>


        <ChatBox user={ this.state.user } />
      </div>

    );
  }
}
export default Challenge;
