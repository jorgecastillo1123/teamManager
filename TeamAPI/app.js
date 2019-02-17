const express = require("express");
const bodyParser = require("body-parser");
const teamController = require("./controllers/TeamsController");

// db instance connection
require("./config/db");

const app = express();

const port = process.env.PORT || 9090;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
     next();
});

// API ENDPOINTS
app
  .route("/teams")
  .get(teamController.listAllTeams)
  .post(teamController.createNewTeam);

app
  .route("/team/:teamid")
  .get(teamController.readTeam)
  .put(teamController.updateTeam)
  .delete(teamController.deleteTeam);

app
  .route("/player/:teamid")
  .post(teamController.createNewPlayer)
  .put(teamController.updatePlayer)
  .delete(teamController.deletePlayer);

app.listen(port, () => {
  console.log(`Server running`);
});
