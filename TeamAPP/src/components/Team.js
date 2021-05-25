import { useState, useEffect } from 'react';
import { withStyles } from '@material-ui/core/styles';
import axios from 'axios'
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
import Delete from '@material-ui/icons/Delete';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import CircularProgress from '@material-ui/core/CircularProgress';
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
  header: {
    flexGrow: 1,
    height: 200,
    background: `linear-gradient(0deg, rgb(0 0 0) 0%, rgb(12 88 142) 100%)`,
  },
  paperRoot: {
    margin: '0 20px',
    bottom: 0,
    position: 'relative',
  },
  loader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: 200,
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
    backgroundColor: '#ececec',
    top: 173,
    right: 20,
    zIndex: 1,
  },
  titleContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    height: 200,
    position: 'absolute',
    top: 30,
  },
  teamTitle: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 30,
    [theme.breakpoints.down('sm')]: {
      fontSize: 20,
    },
  },
  teamSubtitle: {
    color: '#fff',
    fontWeight: 'bold',
    [theme.breakpoints.down('sm')]: {
      fontSize: 30,
    },
  },
  badge: {
    padding: '0 10px',
    backgroundColor: '#00000036',
    color: '#fff',
    fontSize: 16,
    margin: '0 10px',
    [theme.breakpoints.down('sm')]: {
    },
  },
  delete: {
    color: '#d80000',
    position: 'absolute',
    left: 0,
    marginLeft: 21,
  },
  countBadge: {
    backgroundColor: '#ececec',
    color: '#000',
    padding: '20px 0',
    position: 'relative',
    fontSize: 16,
    width: 100,
    transform: 'none',
    top: 10,
  },
  resposiveGrid: {
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      marginBottom: 20,
    },
  },
});

const Team = (props) => {
  const { classes } = props;

  const [open, setOpen] = useState(false);
  const [openTeamModal, setOpenTeamModal] = useState(false);
  const [gameTime, setGameTime] = useState('');
  const [action, setAction] = useState('');
  const [playingCount, setPlayingCount] = useState(0);
  const [totalFees, setTotalFees] = useState(0);
  const [totalPlayerCount, setTotalPlayerCount] = useState(0);
  const [team, setTeam] = useState([]);
  const [state, setState] = useState({ name: "", payment: "" });

  useEffect(() => {
    const teamID = '60ad2d8754bbdac34bb3daf1';
    axios.get(`${host.url}/team/${teamID}`)
      .then(response => {
        const playerCount = response.data.players.filter((obj) => obj.playing === true).length;
        const totalPlayerCount = response.data.players.length;

        let paid = 0;
        for (let index = 0; index < response.data.players.length; index++) {
          paid += +response.data.players[index].payment;
        }
        setTotalPlayerCount(totalPlayerCount)
        setTeam(response.data);
        setPlayingCount(playerCount);
        setTotalFees(paid);
      });
  }, []);


  const openModal = (type, playerData) => {
    const { name, payment, playing, _id } = playerData;
    setState(prevState => ({
      ...prevState,
      _id,
      name,
      payment,
      playing,
    }));
    setOpen(true);
    setAction(type);
  }

  const handleToggle = (player_id) => {
    const updatePlayer = team.players.map(player => {
      const newPlayer = Object.assign({}, player);
      if (newPlayer._id === player_id) {
        const updatedStatus = !newPlayer.playing;
        newPlayer.playing = updatedStatus;
      }
      return newPlayer;
    });
    team.players = updatePlayer;
    const playerCount = team.players.filter((obj) => obj.playing === true).length;
    setPlayingCount(playerCount);
    setTeam(team);

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

  const updatePlayer = () => {
    axios.put(`${host.url}/player/${team._id}`, {
      playerid: state._id,
      name: state.name,
      playing: state.playing,
      payment: state.payment,
    }).then(response => {
      setTeam(response.data);
      setOpen(false);
    });
  }

  const createPlayer = () => {
    axios.post(`${host.url}/player/${team._id}`, {
      name: state.name,
      playing: false,
      payment: state.payment || '0',
    }).then(response => {
      setTeam(response.data);
      setOpen(false);
    });
  }

  const deletePlayer = (_id) => {
    axios.delete(`${host.url}/player/${team._id}`, {
      data: _id,
    });
  }

  const updateTeam = () => {
    axios.put(`${host.url}/team/60ad2d8754bbdac34bb3daf1`, {
      time: gameTime,
    });
    handleTeamModalClose();
  }

  const handlePlayerChange = (e) => {
    const { name, value } = e.target;
    setState(prevState => ({
      ...prevState,
      [name]: value
    }));
  }

  const handleTeamChange = (e) => {
    const { value } = e.target;
    setGameTime(value);
  }

  const handleClose = () => {
    setOpen(false);
  };

  const handleTeamModalClose = () => {
    setOpenTeamModal(false);
  };

  return (
    <>
      <div className={classes.header}></div>
      {
        team.players ?
          <>
            <Grid container>
              <div className={classes.titleContainer}>
                <Typography
                  component="h2"
                  variant="h4"
                  gutterBottom
                  className={classes.teamSubtitle}
                  onClick={() => setOpenTeamModal(true)}
                >
                  {team.time}
                </Typography>
                <Chip label={`$${totalFees}`} className={classes.badge} />
                <Badge badgeContent={`${playingCount} of ${totalPlayerCount}`} color="primary" showZero={true}
                  classes={{
                    badge: classes.countBadge,
                  }}>
                </Badge>
              </div>
              <Fab aria-label="Edit" className={classes.editButton}
                onClick={() => { openModal('create', { name: '', payment: '' }) }}>
                <AddIcon />
              </Fab>
            </Grid>
            <Grid item sm={12} className={classes.resposiveGrid}>
              <Paper className={classes.paperRoot}>
                <List>
                  {team.players.map(player => (
                    <ListItem key={player._id} button
                      onClick={() => openModal('edit', player)}>
                      <ListItemAvatar>
                        <Avatar className={player.playing ? classes.avatarActive : classes.avatarPasive}>
                          <PlayingIcon />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText primary={player.name}
                        secondary={
                          player.payment >= 40 ? <span>Paid ${player.payment}</span> :
                            <span className={classes.noPayment}>Paid ${player.payment}</span>
                        }
                      />
                      <ListItemSecondaryAction>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={player.playing}
                              onChange={() => handleToggle(player._id)}
                              color="primary"
                            />
                          }
                        />
                      </ListItemSecondaryAction>
                    </ListItem>
                  ))}
                </List>
              </Paper>
            </Grid>
          </>
          : <div className={classes.loader}><CircularProgress size={50} /></div>
      }
      <Dialog
        open={open}
        onClose={handleClose}
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
            value={state.name}
            onChange={handlePlayerChange}
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
            value={state.payment}
            onChange={handlePlayerChange}
            margin="normal"
            variant="outlined"
            InputLabelProps={{
              shrink: true,
            }}
          />
        </DialogContent>
        <DialogActions>
          <Delete className={classes.delete} onClick={() => deletePlayer(state._id)} />
          <Button onClick={handleClose} color="primary">Cancel</Button>
          {
            action === 'create' ?
              <Button onClick={createPlayer} color="primary">Save</Button> :
              <Button onClick={updatePlayer} color="primary">Save</Button>
          }
        </DialogActions>
      </Dialog>

      <Dialog
        open={openTeamModal}
        onClose={handleTeamModalClose}
        aria-labelledby="form-dialog-title"
        fullWidth
      >
        <DialogTitle id="form-dialog-title">Update Team</DialogTitle>
        <DialogContent>
          <TextField
            id="outlined-full-width"
            label="Game Time"
            name="time"
            placeholder="Maybe 7:00pm"
            fullWidth
            value={gameTime}
            onChange={handleTeamChange}
            margin="normal"
            variant="outlined"
            InputLabelProps={{
              shrink: true,
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleTeamModalClose} color="primary">
            Cancel
            </Button>
          <Button onClick={updateTeam} color="primary">
            Save
            </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default withStyles(styles)(Team);
