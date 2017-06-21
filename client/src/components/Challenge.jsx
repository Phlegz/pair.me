import React, {Component} from 'react';
import brace from 'brace';
import AceEditor from 'react-ace';
import axios from 'axios';

import 'brace/mode/javascript';
import 'brace/theme/monokai';

import ChatBox from './chatApp.jsx';

const io = require('socket.io-client');
const socket = io();


class Challenge extends Component {
  constructor(props) {
    super(props);
    this.socket = io.connect();
  }

  componentDidMount() {

    console.log('succesfully mounted');

    socket.on('connect', () => {
      console.log('client connected to server');
    });

    socket.on('disconnect', () => {
      console.log('client disconnected');
    });
  }


  submitCode(event){
    event.preventDefault();
    //to get the instance of the Editor through ace-editor name
    //finally use getValue() function to get the contents
    let editor = ace.edit('codeChallenges');
    let textValue = JSON.stringify(editor.getValue());

    axios.post('/api/challenges', {
      answer: textValue
    })
    .then(function(response) {
      console.log('RESPONSE',response);
    })
    .catch(function(error){
      console.log(error);
    })
  }
  onChange(newValue) {
    // console.log(newValue);
  }
  render() {
    return (
      <div>
          <AceEditor
            name="codeChallenges"
            mode="javascript"
            theme="monokai"
            onChange={ this.onChange }
            editorProps={{$blockScrolling: true}}
            value="// Type your code here"
            tabSize="2"
          />
          <input type='button' value='Submit' onClick={this.submitCode} />
          <ChatBox />
      </div>



    );
  }
}
export default Challenge;
