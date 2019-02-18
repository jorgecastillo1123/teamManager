const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TeamSchema = new Schema({
  teamName: {
    type: String,
    required: true
  },
  leagueName: {
    type: String,
    required: true
  },
  day: {
    type: String,
    required: true
  },
  nextGame: {
    type: String,
  },
  time: {
    type: String,
  },
  players: [{
    playerid: String,
    name: String, 
    playing: Boolean,
    payment: Number
  }],
});

module.exports = mongoose.model("Teams", TeamSchema);

