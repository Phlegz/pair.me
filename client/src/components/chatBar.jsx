import React, { Component } from 'react';

class ChatBar extends Component {
  render () {
    return (
      <footer className="chatbar">
        <input className="chatbar-message" placeholder="type message here" />
      </footer>
    )
  }
}

export default ChatBar;