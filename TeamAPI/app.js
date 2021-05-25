const express = require("express");
const teamController = require("./controllers/TeamController");

require("./config/db");

const app = express();

const port = process.env.PORT || 5000;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.text());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  next();
});

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
  console.log(`Server running in port ${port}`);
});
