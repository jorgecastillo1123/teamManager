import React from 'react';
import ReactDOM from 'react-dom';
import { Route, BrowserRouter as Router } from 'react-router-dom'
import Teams from './components/Teams';
import Team from './components/Team';
import './assets/styles.css';

const routing = (
  <Router>
    <div>
      <Route exact path="/" component={Teams} />
      <Route path="/team/:id" component={Team} />
    </div>
  </Router>
)
ReactDOM.render(routing, document.getElementById('root'))

