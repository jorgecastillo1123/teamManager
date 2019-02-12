import React, { Component } from 'react';
import Teams from './Teams.js';
import Header from './Header.js';
class App extends Component {

  render() {
    return (
      <React.Fragment>
        <Header />
        <Teams />
      </React.Fragment>
    );
  }
}

export default App;
