import React, { Component } from 'react';

class Message extends Component {


  render () {
    //add class if user sent the message
    const fromMe = this.props.fromMe ?'from-me' :'';

    return(
      <main>
        <div className={`message ${fromMe}`}>

          <span className="chatbar-username">{ this.props.username }</span>
          <span className="message-content">{ this.props.content }</span>
        </div>
      </main>
    )
  }
}




export default Message;
