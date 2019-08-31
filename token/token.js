const secrets = require("../routes/auth/secrets");
const jwt = require("jsonwebtoken");

function generateToken(user) {
  const payload = {
    id: user.id,
    username: user.username
  };

  const options = {
    expiresIn: "1d"
  };

  return jwt.sign(payload, secrets.jwtSecret, options);
}

module.exports = generateToken;
