import React, { Component } from 'react';

class Message extends Component {
  render () {
    return(
      <main>
        <div>
          <span>{ this.props.username }</span>
          <span>{ this.props.content }</span>
        </div>
      </main>
    )
  }
}

export default Message;
