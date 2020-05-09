const jwt = require("jsonwebtoken");

const generateToken = (user) => {
  const accessToken = jwt.sign(
    { email: user.email, name: user.name, _id: user._id },
    process.env.SECRET_ACCESS_TOKEN
  );
  return accessToken;
};

const authenticateUser = (req, res, next) => {
  const userToken = req.headers["authorization"];
  const token = userToken && userToken.split(" ")[1];
  if (!token) {
    return res.status(403).send("Can't find token");
  }
  jwt.verify(token, process.env.SECRET_ACCESS_TOKEN, (err, user) => {
    if (err) {
      return res.status(401).send("Incorrect token");
    }
    req.user = user;
    return next();
  });
};

module.exports = { generateToken, authenticateUser };
