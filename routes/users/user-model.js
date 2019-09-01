const db = require("../../data/db-config");

module.exports = {
  fetchUsers,
  fetchBy,
  fetchById,
  add,
  remove,
  update,
  getUserExpenses,
  getUserIncome
};

//fetch all users
function fetchUsers() {
  return db("users").select("*");
}

//fetch users by id
function fetchById(id) {
  return db("users")
    .where({ id })
    .first();
}

//get user's expenses using foreign key: user_id
function getUserExpenses(userId) {
  return db("expenses")
    .where("user_id", userId)
    .then(expense => {
      return expense;
    });
}

//get user's income using foreign key: user_id
function getUserIncome(userId) {
  return db("income")
    .where("user_id", userId)
    .then(income => {
      return income;
    });
}

//fetchBy specified filter
function fetchBy(filter) {
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
