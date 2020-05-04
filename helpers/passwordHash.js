const bcrypt = require("bcrypt");

const hashPassword = (password) => {
  return bcrypt.hash(password, 10);
};

const verifyPassword = (password, dbPassword) => {
  return bcrypt.compare(password, dbPassword);
};

module.exports = { hashPassword, verifyPassword };
