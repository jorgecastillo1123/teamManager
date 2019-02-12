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
  players: [{ 
    name: String, 
    payment: Boolean,
    owePayment:Number
  }],
});

module.exports = mongoose.model("Teams", TeamSchema);

