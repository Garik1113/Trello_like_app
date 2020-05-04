const { check } = require("express-validator");
const signupValidation = () => {
  return [
    check("name").notEmpty().withMessage("Name is Required"),
    check("email").notEmpty().withMessage("Email is Required"),
    check("password").notEmpty().withMessage("Password is Required"),
    check("confirmPassword")
      .notEmpty()
      .withMessage("You must confirm password")
      .custom((value, { req }) => value === req.body.password)
      .withMessage("Passwords are not the same"),
  ];
};

const loginValidation = () => {
  return [
    check("email").notEmpty().withMessage("Email is Required"),
    check("password").notEmpty().withMessage("Password is Required"),
  ];
};

module.exports = { signupValidation, loginValidation };
