const mongoose = require("mongoose");
mongoose.set('useFindAndModify', false);
const Schema = mongoose.Schema;

const TeamSchema = new Schema({
  teamName: {
    type: String,
    required: true
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

module.exports = mongoose.model("Team", TeamSchema);

