const { Router } = require("express");
const ListRouter = Router();
const ListController = require("../controllers/listController");
const { authenticateUser } = require("../helpers/tokenConfig");

ListRouter.post("/create", authenticateUser, ListController.create);
ListRouter.get("/get/:board_id", ListController.getLists);

module.exports = ListRouter;
