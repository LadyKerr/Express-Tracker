const router = require("express").Router();

const Users = require("./user-model");
//const restricted = require("../auth/auth-middleware");

router.get("/", (req, res) => {
  Users.fetchUsers()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => {
      res.status(500).json({ err, message: "Error while retrieving users" });
    });
});

module.exports = router;
