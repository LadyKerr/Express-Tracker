const db = require("../../data/db-config");

module.exports = {
  fetchIncome,
  fetchBy,
  fetchById,
  add,
  remove,
  update
};

//fetch all income
function fetchIncome() {
  return db("income").select("*");
}

//fetch income by id
function fetchById(id) {
  return db("income")
    .where({ id })
    .first();
}

//fetchBy specified filter
function fetchBy(filter) {
  return db("income").where(filter);
}

//add income
function add(newIncome) {
  return db("income")
    .insert(newIncome)
    .then(id => {
      return fetchById(id[0]);
    });
}

//delete income
function remove(id) {
  return db("income")
    .where({ id })
    .del();
}

//update income
function update(id, changes) {
  return db("income")
    .where({ id })
    .update(changes);
}
