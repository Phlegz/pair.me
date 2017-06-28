import React, { Component } from 'react';

class Header extends Component {
  render() {
    return (
      <div className='chat-header'>
        <span className='chat-title'>
          <h4>Chatting with your PAIR</h4>
        </span>
      </div>
    )
  }
}

export default Header;