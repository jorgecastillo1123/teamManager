import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Schedule';
import Drawer from '@material-ui/core/Drawer';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import HeaderImage from '../assets/header.jpg'
import CalendarImage from '../assets/calendar.png'
import schedule from '../assets/schedule.json'

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
  calendar: {
    height: 130,
    backgroundImage: `url(${CalendarImage})`,
    backgroundSize: 'cover',
    textAlign: 'center',
    paddingTop: 30,
    [theme.breakpoints.down('sm')]: {
      height: 130,
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
  constructor(props) {
    super();
    this.state = {
      left: false,
    };
  }

  toggleDrawer = (open) => {
    this.setState({ ...this.state, left: open });
  };

  render () {
    const { open,left } = this.state;
    const { classes } = this.props;

    return (
      <React.Fragment>
      <div className={classes.header}>
        <IconButton className={classes.menuButton} 
                    aria-label="Menu" 
                    onClick={()=>{this.toggleDrawer(true)}}>
            <MenuIcon />
        </IconButton>
        <Drawer anchor="right" open={left} onClose={()=>{this.toggleDrawer(false)}}>
          <div
            tabIndex={0}
            role="button"
            onClick={()=>{this.toggleDrawer(false)}}
            onKeyDown={()=>{this.toggleDrawer(false)}}
          > 
          <div className={classes.calendar}>
              <Typography variant="h3" className={classes.fonts}>
                Next
              </Typography>
              <Typography component="h2" variant="h3" className={classes.fonts}>
                Games
              </Typography>
          </div>
            <Paper className={classes.paper} elevation={1}>
              {schedule.map(game => (
                  <div key={game.index} >
                    <div>
                      <Grid container alignItems="center">
                        <Grid item xs>
                          <Typography  variant="body1">
                            {game.home}
                          </Typography>
                        </Grid>
                        <Grid item>
                          <Typography gutterBottom variant="h6" className={classes.gameTime}>
                            {game.time}
                          </Typography>
                        </Grid>
                      </Grid>
                      <Typography variant="body1">
                        {game.away}
                      </Typography>
                    </div>
                    <Divider variant="middle" className={classes.divider}/>
                  </div>
                ))}
            </Paper>
          </div>
      </Drawer>
      </div>
    </React.Fragment>
    );
  }
}


Header.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Header);