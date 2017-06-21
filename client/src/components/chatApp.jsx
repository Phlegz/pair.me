import React, {Component} from 'react';
import Header from './chatHeader.jsx'
import ChatBar from './chatBar.jsx';
import MessageList from './MessageList.jsx'

class ChatBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: {name: "Bob"}, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: [];
    }
  }



  render() {
    return (
      <div className='chat-container'>
        <Header />
        <MessageList messages = { this.state.messages } />
        <ChatBar />
      </div>
      )
  }
}

export default ChatBox;