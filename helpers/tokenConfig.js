const jwt = require("jsonwebtoken");

const generateToken = (user) => {
  const accessToken = jwt.sign(
    { email: user.email, _id: user._id },
    process.env.SECRET_ACCESS_TOKEN
  );
  return accessToken;
};

const authenticateUser = (req, res, next) => {
  const userToken = req.headers["authorization"];
  const token = userToken && userToken.split(" ")[1];
  if (!token) {
    return res.status(403);
  }
  jwt.verify(token, process.env.SECRET_ACCESS_TOKEN, (err, user) => {
    if (err) {
      return res.status(401);
    }
    req.user = user;
    return next();
  });
};

module.exports = { generateToken, authenticateUser };
