import React, {Component} from 'react';
import brace from 'brace';
import AceEditor from 'react-ace';
import axios from 'axios';
import { PageHeader, Jumbotron, Button, Modal, FormGroup, ControlLabel, FormControl, Col, ProgressBar, Label } from 'react-bootstrap';

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
        id: "",
        title: "",
        question: "",
        example: "",
        placeholder: "",
        answer: "",
        unit_test: "",
        test_result: ""
      },
      sendUpdate: true,
      showResultModal: true,
      qCount: 0
    }
    this.socket = io.connect();
    this.liveCode = this.liveCode.bind(this);
    this.nextQuestion = this.nextQuestion.bind(this);
  }

  componentWillMount() {
    axios.get('/api/questions')
    .then((response)=> {
      this.setState({questions: {
        id: response.data[0].id,
        title: response.data[0].title,
        question: response.data[0].question,
        example: response.data[0].example,
        placeholder: response.data[0].placeholder,
        answer: response.data[0].answer,
        unit_test: response.data[0].unit_test,
        test_result: response.data[0].test_result
        }
      },
      this.setState({aceValue: `${response.data[0].example}\n\n${response.data[0].placeholder}`}))
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


  //click to display answer
  onClick(e) {
    e.preventDefault();
    this.setState({ showAnswer: !this.state.showAnswer })
  }

  //function to track changes and send to server for broadcast
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
    let questionId = this.state.questions.id

    axios.post('/api/challenges', {
      answer: textValue,
      questionId: questionId
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
  nextQuestion(event){
    let i = this.state.qCount;
    i += 1;
    this.setState({qCount: i});
    this.setState({ showAnswer: !this.state.showAnswer })
    axios.get('/api/questions')
    .then((response)=> {
      this.setState({questions: {
        id: response.data[i].id,
        title: response.data[i].title,
        question: response.data[i].question,
        example: response.data[i].example,
        placeholder: response.data[i].placeholder,
        answer: response.data[i].answer,
        unit_test: response.data[i].unit_test,
        test_result: response.data[i].test_result
        }
      },
      this.setState({aceValue: `${response.data[i].example}\n\n${response.data[i].placeholder}`}))
      this.setState({result: null})
      this.setState({console: []})
    })
  }
  render() {
    let closeResultModal = () => this.setState({ showResultModal: false});
    let console = this.state.console;
    let consoleArr = [];
    for (let i = 0; i < console.length; i++) {
      consoleArr.push(
        <ul>console.log => { console[i] }</ul>
      )
    }
    let showResult = '';
    let showResultModal = '';
    let result = this.state.result;
    if (result !== null && result !== 'null') {
      let test_result = this.state.questions.test_result
      if (result === test_result){
        showResult = <div className="resultLog">
                       <ul>Unit Test => {this.state.questions.unit_test}</ul>
                       <ul>Expected Answer => {test_result}</ul>
                       <ul>Result => { result }</ul>
                     </div>;
        showResultModal = <Modal
                            show={this.state.showResultModal}
                            onHide={closeResultModal}
                            container={this}
                            aria-labelledby="contained-modal-title"
                            backdrop="static"
                            keyboard={false}
                          >
                          <Modal.Header closeButton>
                            <Modal.Title>CORRECT! Nice work</Modal.Title>
                          </Modal.Header>
                          <Modal.Body>
                            <h5>Unit Test => {this.state.questions.unit_test}</h5>
                            <h5>Expected Answer => {test_result}</h5>
                            <h5>Result => { result }</h5>
                            <Button
                              bsStyle="primary"
                              bsSize="large"
                              onClick={(e) => this.nextQuestion(e)}
                            >
                            Next Question
                            </Button>
                            <Button
                              bsStyle="info"
                              bsSize="large"
                              onClick={closeResultModal}
                            >
                            Close
                            </Button>
                          </Modal.Body>
                        </Modal>
      } else {
        showResult = <div className="resultLog">
                       <ul>Unit Test=> {this.state.questions.unit_test}</ul>
                       <ul>Expected Answer => {test_result}</ul>
                       <ul>Result => { result }</ul>
                       <h3>Wrong, please try again</h3>
                     </div>
      }
    }
    return (

      <div>
        <ChallengeQuestions questions={ this.state.questions } />
        <ChatBox user={ this.state.user } />
      <div id='editor'>
        <AceEditor
          name="codeChallenges"
          mode="javascript"
          theme="monokai"
          editorProps={{$blockScrolling: Infinity}}
          tabSize={2}
          width={1750}
          height={600}
          //invoke livecode function everytime the text box changess
          onChange={ this.liveCode }
          value={this.state.aceValue}
        />
      </div>
      <div>
        <Button
          className="submitButton"  
          bsStyle="success"
          bsSize="large" 
          onClick={(e) => this.submitCode(e) }
        >
        Submit Answer
        </Button>
      </div>
      <div className="output">
         <div className='output-header'>
            <h4>Output:</h4>
            <div className="consoleLog">{ consoleArr }</div>
            { showResult }
          </div>
        </div>

        <div className="showAnswer">
          <Button
            className="answerkeyButton"           
            bsStyle="danger"
            bsSize="large"
            onClick= {this.onClick.bind(this)}
          > 
          Show me the Answer
          </Button>
          {this.state.showAnswer && <ChallengeAnswer answer= { this.state.questions } /> }
        </div>
        {showResultModal}
      </div>
    );
  }
}
export default Challenge;