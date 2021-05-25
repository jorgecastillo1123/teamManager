const mongoose = require("mongoose");

const dbURI = "mongodb://jorgecastillo1123:1ngl%40terra@teammanager-shard-00-00-oajzg.mongodb.net:27017,teammanager-shard-00-01-oajzg.mongodb.net:27017,teammanager-shard-00-02-oajzg.mongodb.net:27017/test?ssl=true&replicaSet=TeamManager-shard-0&authSource=admin&retryWrites=true"
const options = {
  reconnectTries: Number.MAX_VALUE,
  poolSize: 10
};

mongoose.connect(dbURI, options).then(
  () => {
    console.log("Database connection established!");
  },
  err => {
    console.log("Error connecting Database instance due to: ", err);
  }
);

require("../models/Team");
