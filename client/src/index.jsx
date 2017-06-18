import React from 'react';
import ReactDOM from 'react-dom';
import {
  HashRouter as Router,
  Route,
  Link
} from 'react-router-dom'

import Dashboard from './components/dashboard.jsx'

ReactDOM.render(<Dashboard />, document.getElementById('react-root'));