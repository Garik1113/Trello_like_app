const { Router } = require("express");
const userRouter = Router();
const UserController = require("../controllers/userController");
const {
  signupValidation,
  loginValidation,
} = require("../helpers/userValidation");
const { authenticateUser } = require("../helpers/tokenConfig");
userRouter.post("/signup", signupValidation(), UserController.signup);
userRouter.post("/login", loginValidation(), UserController.login);
module.exports = userRouter;
