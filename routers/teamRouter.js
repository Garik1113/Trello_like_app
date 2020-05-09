const { Router } = require("express");
const TeamRouter = Router();
const TeamController = require("../controllers/teamController");
const { authenticateUser } = require("../helpers/tokenConfig");

TeamRouter.post("/create", authenticateUser, TeamController.create);
TeamRouter.get("/getTeams", authenticateUser, TeamController.getCurrentTeams);
TeamRouter.get(
  "/getTeamData/:id",
  authenticateUser,
  TeamController.getTeamData
);
module.exports = TeamRouter;
