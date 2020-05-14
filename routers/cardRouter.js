const { Router } = require("express");
const CardRouter = Router();
const CardController = require("../controllers/cardController");
const { authenticateUser } = require("../helpers/tokenConfig");
CardRouter.post("/create", authenticateUser, CardController.create);
CardRouter.get(
  "/getBoardCards/:board_id",
  authenticateUser,
  CardController.getBoardCards
);
CardRouter.post(
  "/changeCardList",
  authenticateUser,
  CardController.changeCardList
);
CardRouter.post(
  "/searchMembers",
  authenticateUser,
  CardController.searchMembers
);
CardRouter.post(
  "/addMemberToCard",
  authenticateUser,
  CardController.addMemberToCard
);

module.exports = CardRouter;
