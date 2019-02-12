import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
// import '../assets/index.css';


const styles = theme => ({
  
});

class Teams extends Component {
  constructor(props) {
    super();
    this.state = {
      
    };
  }



  render() {
    return (
      <div>
       Teams
    </div>
    );
  }
}


Teams.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Teams);