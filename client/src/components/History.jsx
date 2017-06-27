import React, {Component} from 'react';
import axios from 'axios';
import { PageHeader, Footer, Popover, ButtonToolbar, OverlayTrigger, popoverBottom, Button, Panel } from 'react-bootstrap';
import { Table } from 'react-bootstrap';
import moment from 'moment';
import AceEditor from 'react-ace';
import brace from 'brace';
import 'brace/mode/javascript';
import 'brace/theme/monokai';
class History extends Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [],
    };
    axios.get('/api/history')
    .then((response) => {
      this.setState({history: this.state.history.concat(response.data.rows)})
      console.log('in axios, after concat', response.data.rows);
    })
    .catch (function(error) {
      console.log(error);
    })
    this.getOverlay = this.getOverlay.bind(this);
  }
  setOpenTab(hist) {
    if(this.state.openTab === hist){
      this.setState({openTab: undefined});
    } else {
      this.setState({openTab: hist});
    }
  }
  getOverlay(historyItem) {
    console.log(JSON.stringify(historyItem));
    const popoverBottom = (
      <Popover id="popover-positioned-bottom" title="Submitted Answer">
        <AceEditor
          name="historyAnswer"
          mode="javascript"
          theme="monokai"
          readOnly={true}
          width={400}
          height={200}
          value={historyItem.submitted_answer}
          showGutter={false}
        />
      </Popover>
    );
    return popoverBottom;
  }
  render() {
    // console.log('history', this.state.history);
    const allHistory = this.state.history.map((hist, index) => {
      const toggle = () => { this.setOpenTab(hist); }
      return (
      <div key={index}><div>
          {/*call toggle handler and change state whenever button is pressed */}
          <Button onClick={ toggle }>{hist.question}</Button>
          {/*undefined state when opened*/}
          <Panel collapsible expanded={this.state.openTab === hist}>
            <AceEditor
              name="historyAnswer"
              mode="javascript"
              theme="monokai"
              readOnly={true}
              width={400}
              height={200}
              value={hist.submitted_answer}
              showGutter={false}
            />
            {hist.submitted_answer}
          </Panel>
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
