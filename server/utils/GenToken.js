const jwt = require("jsonwebtoken");

const genToken = (token, expiresIn = "1m") => {
  return jwt.sign(token, process.env.JWT_SECRET_KEY, {
    expiresIn,
  });
};

module.exports = genToken;
