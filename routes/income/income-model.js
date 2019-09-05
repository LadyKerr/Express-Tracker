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

//add income - updates for postgress
function add(newIncome) {
  return db("income")
    .returning("id")
    .insert(newIncome)
    .then(ids => {
      const [id] = ids;
      return fetchById(id);
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
    .update(changes)
    .returning("id");
}
