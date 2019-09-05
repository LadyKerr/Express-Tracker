const jwt = require("jsonwebtoken");
const secrets = require("./secrets");

module.exports = (req, res, next) => {
  const token = req.headers.authorization;

  if (token) {
    jwt.verify(token, secrets.jwtSecret, (err, decodedToken) => {
      if (err) {
        res.status(401).json({ err, message: "please login" });
      } else {
        req.jwtToken = decodedToken;
        next();
      }
    });
  } else {
    res.status(401).json({ message: "restricted access. Please login." });
  }
};

//restricted global middleware
