import React, {Component} from 'react';
import Header from './chatHeader.jsx'
import ChatBar from './chatBar.jsx';
import MessageList from './MessageList.jsx'

class App extends Component {
  render() {
    return (
      <div className='chat-container'>
        <Header />
        <MessageList />
        <ChatBar />
      </div>
      )
  }
}

export default App;