import React, {Component} from 'react';
import brace from 'brace';
import AceEditor from 'react-ace';
import axios from 'axios';

import 'brace/mode/javascript';
import 'brace/theme/monokai';

import ChatBox from './chatBox.jsx';

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
      sendUpdate:true
    }
    this.socket = io.connect();
    this.liveCode = this.liveCode.bind(this);
  }


  componentDidMount() {
    console.log('successfully mounted');

     axios.get('/api/profile_current')
     .then((response)=> {
       this.setState({user: response.data})
     })

    socket.on('serverLiveCode', (code) => {
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
          defaultValue="// Type your code here"
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
        <ChatBox user={this.state.user} />
      </div>

    );
  }
}
export default Challenge;
