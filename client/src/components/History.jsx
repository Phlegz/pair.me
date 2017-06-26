import React, {Component} from 'react';
import axios from 'axios';
import { PageHeader, Footer, Popover, ButtonToolbar, OverlayTrigger, popoverBottom, Button, Panel } from 'react-bootstrap';
import { Table } from 'react-bootstrap';
import moment from 'moment';
import AceEditor from 'react-ace';
import {
  HashRouter as Router,
  Route,
  Link
} from 'react-router-dom'


class History extends Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [],
      open: true
    };

    axios.get('/api/history')
    .then(/*function*/ (response) => {
      this.setState({history: this.state.history.concat(response.data.rows)})
      console.log('in axios, after concat', response.data.rows);
    })
    .catch (function(error) {
      console.log(error);
    })

    this.getOverlay = this.getOverlay.bind(this);
  }

  getOverlay(historyItem) {
    console.log(JSON.stringify(historyItem));
    const popoverBottom = (
      <Popover id="popover-positioned-bottom" title="Submitted Answer">
        <strong>{historyItem.submitted_answer}</strong><br />
        {moment(historyItem.completed_at).calendar()}
      </Popover>
    );
    return popoverBottom;
  }


  render() {
    console.log('history', this.state.history);
    const allHistory = this.state.history.map((hist, index) => {
      return (
      <div key={index}>
        <div>
          {/*<Button onClick={ ()=> this.setState({ open: !this.state.open })}>
            {hist.question}
          </Button>
          <Panel collapsible expanded={this.state.open}>
            Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid.
            Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident.
          </Panel>*/}
          <div>
            <OverlayTrigger trigger="click" placement="bottom" overlay={this.getOverlay(hist)}>
              <Button>{hist.question}</Button>
            </OverlayTrigger>
          </div>
        </div>
      </div>
      )
    })
    return(
      <div>
        <PageHeader>
          Challenges Done
        </PageHeader>
        {allHistory}
      </div>
    );
  }
}

export default History;