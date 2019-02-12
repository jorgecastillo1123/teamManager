const Team = require("../models/Teams");

exports.listAllTeams = (req, res) => {
  Team.find({}, (err, team) => {
    if (err) {
      res.status(500).send(err);
    }
    res.status(200).json(team);
  });
};

exports.createNewTeam = (req, res) => {
  let newTeam = new Team(req.body);
  newTeam.save((err, team) => {
    if (err) {
      res.status(500).send(err);
    }
    res.status(201).json(team);
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