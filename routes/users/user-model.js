const db = require("../../data/db-config");

module.exports = {
  fetchUsers,
  findBy,
  fetchById,
  add,
  remove,
  update
};

//fetch all users
function fetchUsers() {
  return db("users");
}

//fetch users by id
function fetchById(id) {
  return db("users")
    .where({ id })
    .first()
    .then(user => {
      if (user) {
        return user;
      } else {
        return null;
      }
    });
}

//findby specified filter
function findBy(filter) {
  return db("users").where(filter);
}

//add user
function add(newUser) {
  return db("users")
    .insert(newUser)
    .then(id => {
      return fetchById(id[0]);
    });
}

//delete user
function remove(id) {
  return db("users")
    .where({ id })
    .del();
}

//update user
function update(changes, id) {
  return db("users")
    .where({ id })
    .update(changes);
}
