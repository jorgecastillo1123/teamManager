const express = require("express");
const bodyParser = require("body-parser");
const teamController = require("./controllers/TeamsController");

// db instance connection
require("./config/db");

const app = express();

const port = process.env.PORT || 9090;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// API ENDPOINTS
app
  .route("/teams")
  .get(teamController.listAllTeams)
  .post(teamController.createNewTeam);

app
  .route("/teams/:teamid")
  .get(teamController.readTeam)
  .put(teamController.updateTeam)
  .delete(teamController.deleteTeam);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
