const Team = require("../models/Team");

exports.listAllTeams = (req, res) => {
  Team.find({}, (err, team) => {
    if (err) {
      res.status(500).send(err);
    }
    res.status(200).json(team);
  });
};

exports.readTeam = (req, res) => {
  Team.findById(req.params.teamid, (err, team) => {
    if (err) {
      res.status(500).send(err);
    }
    res.status(200).json(team);
  });
};

exports.updateTeam = (req, res) => {
  Team.findOneAndUpdate(
    { _id: req.params.teamid },
    req.body,
    { new: true },
    (err, team) => {
      if (err) {
        res.status(500).send(err);
      }
      res.status(200).json(team);
    }
  );
};

exports.deleteTeam = (req, res) => {
  Team.remove({ _id: req.params.teamid }, (err, team) => {
    if (err) {
      res.status(404).send(err);
    }
    res.status(200).json({ message: "Team successfully deleted" });
  });
};

exports.updatePlayer = (req, res) => {
  Team.findOneAndUpdate({
    _id: req.params.teamid,
    'players._id': req.body.playerid
  },
    {
      '$set': {
        'players.$.name': req.body.name,
        'players.$.playing': req.body.playing,
        'players.$.payment': req.body.payment
      }
    },
    { new: true },
    (err, team) => {
      if (err) {
        res.status(500).send(err);
      }
      res.status(200).json(team);
    }
  );
};

exports.createNewPlayer = (req, res) => {
  var newPlayer = {
    name: req.body.name,
    playing: req.body.playing,
    payment: req.body.payment
  };
  Team.findOneAndUpdate(
    { _id: req.params.teamid, },
    { $push: { players: newPlayer } },
    { new: true },
    (error, team) => {
      if (error) {
        res.status(500).send(err);
      } else {
        res.status(200).json(team);
      }
    });
};

exports.deletePlayer = (req, res) => {

};
