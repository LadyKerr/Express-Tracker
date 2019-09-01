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

//add expense
function add(newExpense) {
  return db("expenses")
    .insert(newExpense)
    .then(id => {
      return fetchById(id[0]);
    });
}

//delete expense
function remove(id) {
  return db("expenses")
    .where({ id })
    .del();
}

//update expense
function update(changes, id) {
  return db("expenses")
    .where({ id })
    .update(changes);
}
