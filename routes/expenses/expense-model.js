const db = require("../../data/db-config");

module.exports = {
  fetchExpenses,
  fetchBy,
  fetchById,
  add,
  remove,
  update
};

//fetch all expenses
function fetchExpenses() {
  return db("expenses").select("*");
}

//fetch expenses by id
function fetchById(id) {
  return db("expenses")
    .where({ id })
    .first();
}

//fetchBy specified filter
function fetchBy(filter) {
  return db("expenses").where(filter);
}

//add new expense - updates for postgress
function add(newExpense) {
  return db("expenses")
    .returning("id")
    .insert(newExpense)
    .then(ids => {
      const [id] = ids;
      return fetchById(id);
    });
}

//delete expense
function remove(id) {
  return db("expenses")
    .where({ id })
    .del();
}

//update expense
function update(id, changes) {
  return db("expenses")
    .where({ id })
    .update(changes)
    .returning("id");
}
