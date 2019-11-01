import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import axios from 'axios'
import Header from './Header.js';
import { Link } from 'react-router-dom'
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import CardActions from '@material-ui/core/CardActions';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Logo from '../assets/logo.png'
import host from '../config/host.json';

const styles = {
  content: {
    position: 'relative',
    bottom: 100
  },
  media: {
    height: 240,
  },
  card: {
    maxWidth: 345,
    minWidth: 300
  },
  cardContent: {
    textAlign: 'center'
  },
  noLink: {
    textDecoration: 'none'
  },
  boldText: {
    fontWeight: 'bold'
  },
  focusHighlight: {
    backgroundColor: '#3a3a3a'
  },
  editButton: {
    width: '100%'
  }
};

class Teams extends Component {
  constructor() {
    super();
    this.state = {
      teams: [],
      open: false,
      selectedTeam: {}
    };
  }

  componentDidMount () {
    axios.get(`${host.url}/teams`)
    .then(response => {
      this.setState({   
          teams: response.data,
      })
    }).catch((err)=>{
      console.error(err);
    })
  }

  openModal = (oTeam) => {
    this.setState({ 
      open: true ,
      selectedTeam: oTeam
    });
  }

  handleClose = () => {
    this.setState({ open: false });
  };

  handleChange = () => event => {
    const eventType = event.target.value;
    const eventName = event.target.name;
    this.setState(prevState => ({
      selectedTeam: {
          ...prevState.selectedTeam,
          [eventName]: eventType
      }
    }))
  };

  updateTeam = () => {
    const {selectedTeam, teams} = this.state;
    axios.put(`${host.url}/team/${selectedTeam._id}`, {  
      teamName: selectedTeam.teamName,
      leagueName: selectedTeam.leagueName,
      day: selectedTeam.day,
      nextGame: selectedTeam.nextGame,
      time: selectedTeam.time,
    }).then(response => {
      const updateTeam = teams.map(team => {
        const newTeam = Object.assign({}, team);
        if (newTeam._id === response.data._id) {
          newTeam.teamName =  response.data.teamName;
        }
        return newTeam;
      });
      this.setState({   
        teams:updateTeam,
        open: false
      });
    }).catch((err)=>{
      console.error(err);
    });
  }

  render () {
    const { teams, selectedTeam } = this.state
    const { classes } = this.props;
    return (
      <React.Fragment>
        <Header />
        <Grid container className={classes.content} spacing={16}>
          <Grid item xs={12}>
            <Grid container justify="center" spacing={16}>
              {teams.map(team => (
                <Grid key={team._id} item>
                  <Card className={classes.card}>
                    <Link to={`/team/${team._id}`} className={classes.noLink}>
                        <CardMedia
                          className={classes.media}
                          image= {Logo}
                          title={team.leagueName}/>
                        <CardContent className={classes.cardContent}>
                          <Typography gutterBottom variant="h5" component="h2" className={classes.boldText}>
                            {team.teamName}
                          </Typography>
                          <Typography component="p">
                            {team.day}
                          </Typography>
                        </CardContent>
                        </Link>
                        <CardActions>
                        <Button color="primary" className={classes.editButton} onClick={()=>{this.openModal(team)}}>
                          Edit
                        </Button>
                      </CardActions>
                    </Card>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
          fullWidth
        >       
          <DialogTitle id="form-dialog-title">Update Team</DialogTitle>
          <DialogContent>
            <TextField
                id="outlined-full-width"
                label="Team Name"
                name="teamName"
                placeholder="Maybe Liverpool FC"
                fullWidth
                value={selectedTeam.teamName}
                onChange={this.handleChange(selectedTeam.teamName)}
                margin="normal"
                variant="outlined"
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <TextField
                id="outlined-full-width"
                label="Next Game"
                name="nextGame"
                placeholder="Tuesday"
                fullWidth
                value={selectedTeam.nextGame}
                onChange={this.handleChange(selectedTeam.nextGame)}
                margin="normal"
                variant="outlined"
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <TextField
                id="outlined-full-width"
                label="Game Time"
                name="time"
                placeholder="Maybe 7:00pm"
                fullWidth
                value={selectedTeam.time}
                onChange={this.handleChange(selectedTeam.time)}
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
            <Button onClick={this.updateTeam} color="primary">
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    );
  }
}


Teams.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Teams);