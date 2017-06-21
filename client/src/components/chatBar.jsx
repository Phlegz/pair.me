import React, { Component } from 'react';

class ChatBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // username: '',
      content: ''
    };
    this.onMessage = this.onMessage.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  onMessage(event){
    this.setState({
      content: event.target.value
    });
  }

  handleKeyPress(event){
    if(event.key === 'Enter'){
      this.props.onNewMessage(this.state.content);
      this.setState({
        content: ''
      });
    }
  }
  render () {
    return (
      <footer className="chatbar">
        <input className="chatbar-message"
          placeholder="type message here"
          onChange={this.onMessage}
          onKeyPress={this.handleKeyPress}
          value = { this.state.content }
          />
      </footer>
    )
  }
}

export default ChatBar;