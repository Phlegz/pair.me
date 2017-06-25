import React, { Component } from 'react'

import Message from './Message.jsx'

class MessageList extends Component {
  render () {
    const message = this.props.messages.map((message, index) => {
      return (
        <Message
          key = { index }
          username = { message.username }
          content = { message.content }
        />
        )
    });
    return (
      <div className='message-list'>{message}</div>
    )
  }
}

export default MessageList;