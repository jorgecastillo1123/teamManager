import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import HeaderImage from '../assets/header.jpg'

const styles = theme => ({
  header: {
    flexGrow: 1,
    height: 300,
    backgroundImage: `url(${HeaderImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'bottom',
    [theme.breakpoints.down('sm')]: {
      height: 250,
    },
  },
});

function Header(props) {
  const { classes } = props;
  return (
    <React.Fragment>
      <div className={classes.header}></div>
    </React.Fragment>
  );
}

Header.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Header);