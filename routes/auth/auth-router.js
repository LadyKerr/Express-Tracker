const router = require("express").Router();
const bcrypt = require("bcryptjs");

const Users = require("../users/user-model");
const generateToken = require("../../token/token");

//Users can register
router.post("/register", (req, res) => {
  let user = req.body;
  const hash = bcrypt.hashSync(user.password, 10);
  user.password = hash;

  Users.add(user)
    .then(newUser => {
      res.status(201).json(newUser);
    })
    .catch(err => {
      res.status(500).json({
        err,
        message: "the username or email already exist. Please login"
      });
    });
});

//Users can login after they register
router.post("/login", (req, res) => {
  let { username, password } = req.body;

  Users.findBy({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = generateToken(user);

        res.status(200).json({
          message: `Nice to see you ${user.username}!`,
          token
        });
      } else {
        res.status(401).json({ message: "Invalid credentials" });
      }
    })
    .catch(err => {
      res.status(500).json({
        err,
        message: "login failed. User may not exist in the database"
      });
    });
});

//Auth Router handles login and register
