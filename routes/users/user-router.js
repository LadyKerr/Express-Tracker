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

router.get("/:id", (req, res) => {
  const { id } = req.params;

  Users.fetchById(id)
    .then(user => {
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({ message: "Sorry, that user does not exist." });
      }
    })
    .catch(err => {
      console.log(err);
      res
        .status(500)
        .json({ err, message: "There was an error finding that user" });
    });
});

module.exports = router;
