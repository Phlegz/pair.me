import React, {Component} from 'react';
import Header from './chatHeader.jsx'
import ChatBar from './chatBar.jsx';
import MessageList from './MessageList.jsx'

const io = require('socket.io-client');
const socket = io();

class ChatBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: {name: "req.user"},
      messages: []
    }
    this.socket = io.connect();
  }

  onNewMessage(content) {
    let newMessage = {
      // type: 'postMessage',
      // username: username,
      content: content
    }
    socket.emit('clientMessage', JSON.stringify({ message: newMessage }));
  }

   componentDidMount() {

    axios.get('/api/users')

    console.log('succesfully mounted');

    socket.on('connect', () => {
      console.log('client connected to server');
    });

    socket.on('disconnect', () => {
      console.log('client disconnected');
    });

    socket.on('serverMessage', (message)=>{
      //parsed from server
      let newMessage = {
      // type: 'postMessage',
      username: 'test',
      content: message
    }
      this.setState({ messages: this.state.messages.concat(newMessage) })

    });
  }




  render() {
    return (
      <div className='chat-container'>
        <Header />
        <MessageList messages = { this.state.messages } />
        <ChatBar onNewMessage = { this.onNewMessage } />
      </div>
      )
  }
}

export default ChatBox;