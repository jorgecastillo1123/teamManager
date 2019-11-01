import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  header: {
    flexGrow: 1,
    height: 300,
    background: `linear-gradient(0deg, rgba(0,0,0,1) 0%, rgba(246,213,14,1) 100%);`,
    [theme.breakpoints.down('sm')]: {
      height: 250,
    },
  },
  fonts: {
    color: '#fff',
  },
  divider: {
    margin: '10px 0'
  },
  paper: {
    width: 300,
    padding: 10
  },
  gameTime:{
    position: 'relative',
    top: 17,
    right: 17,
  },
  menuButton: {
    color: '#4a4a4a',
    float: 'right',
    margin: 20,
    backgroundColor: '#fff',
    '&:hover': {
      backgroundColor: '#3546b2',
      color: '#fff',
    }
  },
});


class Header extends Component {
  render () {
    const { classes } = this.props;

    return (
      <div className={classes.header}></div>
    );
  }
}

Header.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Header);