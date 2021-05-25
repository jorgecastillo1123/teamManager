import React from 'react';
import ReactDOM from 'react-dom';
import { Route, BrowserRouter as Router } from 'react-router-dom'
import Team from './components/Team';

const routing = (
  <Router basename={process.env.PUBLIC_URL}>
    <Route path='/' component={Team} />
  </Router>
)
ReactDOM.render(routing, document.getElementById('root'))

