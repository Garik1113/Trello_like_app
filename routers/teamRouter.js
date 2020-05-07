const { Router } = require("express");
const TeamRouter = Router();
const TeamController = require("../controllers/teamController");
const { authenticateUser } = require("../helpers/tokenConfig");

TeamRouter.post("/create", authenticateUser, TeamController.create);
TeamRouter.get(
  "/getCurrentTeams",
  authenticateUser,
  TeamController.getCurrentTeams
);
module.exports = TeamRouter;
