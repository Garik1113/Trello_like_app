const { Router } = require("express");
const { authenticateUser } = require("../helpers/tokenConfig");
const BoardController = require("../controllers/BoardController");
const BoardRouter = Router();

BoardRouter.get(
  "/getTeamBoards/:team_id",
  authenticateUser,
  BoardController.getTeamBoards
);
BoardRouter.post("/create", authenticateUser, BoardController.createNewBoard);
BoardRouter.get(
  "/getUserBoards",
  authenticateUser,
  BoardController.getUserBoards
);
module.exports = BoardRouter;
