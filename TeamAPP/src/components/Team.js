import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import axios from 'axios'
import Header from './Header.js';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Checkbox from '@material-ui/core/Checkbox';
import Avatar from '@material-ui/core/Avatar';
import PlayingIcon from '@material-ui/icons/DirectionsRun';
import LinearProgress from '@material-ui/core/LinearProgress';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Badge from '@material-ui/core/Badge';
import Chip from '@material-ui/core/Chip';
import host from '../config/host.json';


const styles = theme => ({
  paperRoot: {
    margin: '0 50px',
    bottom: 170,
    position: 'relative',
    [theme.breakpoints.down('sm')]: {
      margin: '0 20px',
      bottom: 150,
      position: 'relative',
    },
  },
  avatarActive: {
    backgroundColor: '#17944a!important'
  },
  avatarPasive: {
    backgroundColor: '#de1717!important'
  },
  noPayment: {
    color: '#ff0000',
    fontWeight: 600
  },
  editButton: {
    position: 'absolute',
    backgroundColor: '#f6d50f',
    top: 198,
    right: 30,
    zIndex:1,
    [theme.breakpoints.down('sm')]: {
      top: 157,
      right: 3,
    },
  },
  titleContainer: {
    maxWidth: 550,
    margin: '0 auto',
    textAlign: 'center'
  },
  teamTitle : {
    position: 'relative',
    bottom: 240,
    margin: '0 auto',
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 30,
    [theme.breakpoints.down('sm')]: {
      fontSize: 20,
      bottom: 200,
    },
  },
  teamSubtitle : {
    position: 'relative',
    bottom: 233,
    margin: '0 auto',
    color: '#fff',
    fontWeight: 'bold',
    [theme.breakpoints.down('sm')]: {
      fontSize: 30,
      bottom: 185,
    },
  },
  teamTotal : {
    position: 'relative',
    bottom: 215,
    margin: '0 25px',
    color: '#fff',
    fontWeight: 'bold',
    [theme.breakpoints.down('sm')]: {
      fontSize: 30,
      bottom: 162,
      right: 116
    },
  },
  badge :  {
    position: 'relative',
    top: '-177px',
    left: 415,
    padding: '0 10px',
    backgroundColor: '#00000036',
    color: '#fff',
    fontSize: 16,
    margin: '0 10px',
    [theme.breakpoints.down('sm')]: {
      left: 65,
      top: '-155px',
    },
  },
  countBadge :  {
    backgroundColor: '#f6d50e',
    color: '#000',
    padding: '20px 0',
    fontSize: 16,
    width: 100,
    margin: '0 -50px'
  },
  resposiveGrid:  {
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
  },
});
class Team extends Component {
  constructor(props) {
    super();
    this.state = {
      open: false,
      selectedPlayer: {},
      action: '',
      count: 0,
      sum: 0
    };
  }

  componentDidMount () {
    const teamID = this.props.match.params.id;
    axios.get(`${host.url}/team/${teamID}`)
    .then(response => {
      const count = this.getCount(response.data.players);
      const totalCount = this.getTotalCount(response.data.players);

      let paid = 0;
      for (let index = 0; index < response.data.players.length; index++) {
        paid += +response.data.players[index].payment;
      }      
      this.setState({   
          team: response.data,
          count,
          totalCount,
          sum: paid
      })
    }).catch((err)=>{
      console.error(err);
    })
  }

  handleToggle = player_id => () => {
    const { team } = this.state;
    const updatePlayer = team.players.map(player => {
    const newPlayer = Object.assign({}, player);
      if (newPlayer._id === player_id) {
        const updatedStatus = newPlayer.playing ? false : true;
        newPlayer.playing =  updatedStatus;
      }
      return newPlayer;
    });
    team.players = updatePlayer;

    const count = this.getCount(team.players);

    this.setState({   
      team,
      count
    });

    const selectedPlayer = team.players.filter(obj => {
      return obj._id === player_id
    })
   
    axios.put(`${host.url}/player/${team._id}`, {
      playerid: selectedPlayer[0]._id,
      name: selectedPlayer[0].name,
      playing: selectedPlayer[0].playing,
      payment: selectedPlayer[0].payment,
    });
  };

  openModal = (type, oData) => {
    if (oData == null){
      oData = {
        name: '',
        payment: ''
      }
      this.setState({ 
        open: true,
        selectedPlayer: oData,
        action: 'create',
       });
    } else {
      this.setState({ 
        open: true,
        selectedPlayer: oData,
        action: 'edit',
       });
    }
  }

  handleClose = () => {
    this.setState({ open: false });
  };

  createPlayer = () => {
    const {team, selectedPlayer} = this.state;
    axios.post(`${host.url}/player/${team._id}`, {
      name: selectedPlayer.name,
      playing: false,
      payment: selectedPlayer.payment || '0',
    }).then(response => {
      this.setState({   
          team: response.data,
          open: false
      });
    }).catch((err)=>{
      console.error(err);
    });
  }

  updatePlayer = () => {
    const { team, selectedPlayer } = this.state;
    axios.put(`${host.url}/player/${team._id}`, {
      playerid: selectedPlayer._id,
      name: selectedPlayer.name,
      playing: selectedPlayer.playing,
      payment: selectedPlayer.payment,
    }).then(response => {
      this.setState({   
          team: response.data,
          open: false
      });
    }).catch((err)=>{
      console.error(err);
    });
  }

  handlePlayerChange = () => event => {
    const eventType = event.target.value;
    const eventName = event.target.name;
    this.setState(prevState => ({
      selectedPlayer: {
          ...prevState.selectedPlayer,
          [eventName]: eventType
      }
    }))
  };

  getCount = (players) => {
    return players.filter((obj) => obj.playing === true).length;
  }

  getTotalCount = (players) => {
    return players.length;
  }

  
  render () {
    const { team, selectedPlayer, action, count, sum, totalCount } = this.state;
    const { classes } = this.props;

    return (
      <React.Fragment>
        <Header />
        {
          team ? 
            <Grid container>
              <div className={classes.titleContainer}>
                <Typography component="h2" variant="h1" gutterBottom className={classes.teamTitle}>
                  {team.teamName} 
                </Typography>
                <Typography component="h2" variant="h4" gutterBottom className={classes.teamSubtitle}>
                  {team.time}
                </Typography>
                <Badge className={classes.teamTotal} badgeContent={`${count} of ${totalCount}`} color="primary" showZero={true}
                  classes={{
                    badge: classes.countBadge, 
                  }}>
                  <PlayingIcon />
                </Badge>
                <Chip label={`$${sum}`} className={classes.badge} />
              </div>
              <Fab aria-label="Edit" className={classes.editButton} 
                   onClick={()=>{this.openModal('editPlayer')}}>
                <AddIcon />
              </Fab>
              <Grid item sm={12} className={classes.resposiveGrid}>
              <Paper className={classes.paperRoot}>
                <List>
                  {team.players.map(player => (
                    <ListItem key={player._id} button 
                              onClick={()=>{this.openModal('editPlayer',player)}}>
                      <ListItemAvatar>
                      <Avatar className={player.playing ? classes.avatarActive : classes.avatarPasive}>
                        <PlayingIcon />
                      </Avatar>
                      </ListItemAvatar>
                      <ListItemText primary={player.name} 
                      secondary={
                        player.payment >= 40 ? <span>Paid ${player.payment}</span>  : 
                        <span className={classes.noPayment}>Paid ${player.payment}</span>
                      }
                      />
                      <ListItemSecondaryAction>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={player.playing}
                              onChange={this.handleToggle(player._id)}
                              color="primary"
                            />
                          }
                          label="Playing"
                        />
                      </ListItemSecondaryAction>
                    </ListItem>
                  ))}
                </List>
              </Paper>
              </Grid>
              <Dialog
                  open={this.state.open}
                  onClose={this.handleClose}
                  aria-labelledby="form-dialog-title"
                  fullWidth
                >
                  <DialogTitle id="form-dialog-title">{action} Player</DialogTitle>
                  <DialogContent>
                    <TextField
                        id="outlined-full-width"
                        label="Player Name"
                        name="name"
                        placeholder="Maybe Ronaldo"
                        fullWidth
                        value={selectedPlayer.name}
                        onChange={this.handlePlayerChange(selectedPlayer.name)}
                        margin="normal"
                        variant="outlined"
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                      <TextField
                        id="outlined-full-width"
                        label="Player Payment"
                        name="payment"
                        placeholder="Payment"
                        fullWidth
                        value={selectedPlayer.payment}
                        onChange={this.handlePlayerChange(selectedPlayer.payment)}
                        margin="normal"
                        variant="outlined"
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={this.handleClose} color="primary">
                      Cancel
                    </Button>
                      {
                        action === 'create' ? 
                          <Button onClick={this.createPlayer} color="primary">
                            Save
                          </Button> : 
                          <Button onClick={this.updatePlayer} color="primary">
                            Save
                          </Button>
                      }
                    </DialogActions>
                </Dialog>
            </Grid>
          :  
            <LinearProgress />
        }
      </React.Fragment>
    );
  }
}

Team.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Team);
