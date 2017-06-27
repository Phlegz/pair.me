import React, {Component} from 'react';
import axios from 'axios';

import Header from './chatHeader.jsx'
import ChatBar from './chatBar.jsx';
import MessageList from './MessageList.jsx'

const io = require('socket.io-client');
const socket = io();

class ChatBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: []
    }
    this.socket = io.connect();
  }

  //function to send messages to server
  onNewMessage(content) {
    let newMessage = {
      username: this.props.user.github_username,
      content: content,
      // userId: true,
    }
    //send to server
    socket.emit('clientMessage', JSON.stringify({ message: newMessage }));
  }

   componentDidMount() {

    console.log('succesfully mounted');

    socket.on('connect', () => {
      console.log('client connected to server');
    });

    socket.on('disconnect', () => {
      console.log('client disconnected');
    });

    socket.on('serverMessage', (message)=>{
      //parsed from server
      this.setState({ messages: this.state.messages.concat(message) })
    });
  }

  render() {
    //TOOO add better error Handling
    if (!this.props.user) {
      return (
        <div>
          fetching user info
        </div>
        )
    }

    return (
      <div className='chat-container'>
        <Header messages={this.state.messages} />
        <MessageList user={ this.props.user } messages={ this.state.messages } />
        <ChatBar onNewMessage={ this.onNewMessage.bind(this) } />
      </div>
      )
  }
}

export default ChatBox;