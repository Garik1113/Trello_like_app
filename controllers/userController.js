const Users = require("../models/user");
const { validationResult } = require("express-validator");
const { generateToken } = require("../helpers/tokenConfig");
const { hashPassword, verifyPassword } = require("../helpers/passwordHash");
class UserController {
  async signup(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(401).send(errors.mapped());
    }
    const existUser = await Users.findOne({ email: req.body.email });
    if (existUser) {
      return res.status(401).send("User with that email is exist");
    }
    const password = await hashPassword(req.body.password);
    Users.create(
      {
        name: req.body.name,
        email: req.body.email,
        password,
      },
      (err, user) => {
        if (err) {
          return res.status(500);
        }
        return res.status(200).send({ token: generateToken(user) });
      }
    );
  }
  async login(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(401).send(errors.mapped());
    }
    const user = await Users.findOne({ email: req.body.email });
    if (!user) {
      return res.status(401).send("User with that email is not exist");
    }
    const isCorrectPassword = await verifyPassword(
      req.body.password,
      user.password
    );
    if (!isCorrectPassword) {
      return res.status(401).send("Incorrect password");
    }
    return res.status(200).send({ token: generateToken(user) });
  }

  async getProfileData(req, res) {
    if (req.user) {
      const user = await Users.findById(req.user._id);
      if (user) {
        res.status(200).send(user);
      }
    } else {
      res.status(401).send("No Profile data");
    }
  }
}

module.exports = new UserController();
