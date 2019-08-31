//const router = require("express").Router();

const Users = require("./user-model");

Users.fetchUsers()
  .then(users => {
    res.json(users);
  })
  .catch(err => res.send(err));
