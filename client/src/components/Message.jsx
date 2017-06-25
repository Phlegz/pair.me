import React, { Component } from 'react';

class Message extends Component {
  render () {
    return(
      <main>
        <div>
          <span className="chatbar-username">{ this.props.username }</span>
          <span className="message-content">{ this.props.content }</span>
        </div>
      </main>
    )
  }
}

export default Message;
