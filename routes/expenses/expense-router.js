const router = require("express").Router();

const Expenses = require("./expense-model");
const Users = require("../users/user-model");

//get all expenses
router.get("/", (req, res) => {
  Expenses.fetchExpenses()
    .then(expense => {
      res.status(200).json(expense);
    })
    .catch(err => {
      res.status(500).json({ err, message: "Error while retrieving expense" });
    });
});

//get expense by id
router.get("/:id", (req, res) => {
  const { id } = req.params;

  Expenses.fetchById(id)
    .then(expense => {
      if (expense) {
        res.status(200).json(expense);
      } else {
        res
          .status(404)
          .json({ message: "Sorry, that expense does not exist." });
      }
    })
    .catch(err => {
      console.log(err);
      res
        .status(500)
        .json({ err, message: "There was an error finding that expense" });
    });
});

//get user expenses by their ids
router.get("/:id/expenses", (req, res) => {
  const { id } = req.params;

  Expenses.getUserExpenses(id)
    .then(userExpense => {
      if (userExpense && userExpense.length) {
        res.status(200).json(userExpense);
      } else {
        res
          .status(404)
          .json({ message: "The expense with that userID does not exist." });
      }
    })
    .catch(err => {
      console.log(err);
      res
        .status(500)
        .json({ message: "There was an error retrieving the user's expense" });
    });
});

//add new expense
router.post("/", (req, res) => {
  const { amount, category, notes, date, paid } = req.body;

  if (!amount || !category || !date) {
    res
      .status(400)
      .json({ message: "Please add amount, category and description" });
  } else {
    Expenses.add(req.body)
      .then(newExpense => {
        res.status(200).json(newExpense);
      })
      .catch(err => {
        console.log(err);
        res
          .status(500)
          .json({ message: "There was an error adding that expense" });
      });
  }
});

//update expense
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const changes = req.body;
  const { amount, category, notes, date, paid } = req.body;

  Expenses.update(id, changes)
    .then(updated => {
      if (!updated) {
        res.status(404).json({ message: "That expense does not exist" });
      } else if (!amount || !category || !date) {
        res
          .status(400)
          .json({ errorMessage: "Please provide amount, category and date" });
      } else {
        res.status(200).json(updated);
      }
    })
    .catch(err => {
      console.log(err);
      res
        .status(500)
        .json({ message: "There was an error updating that expense." });
    });
});

//add new expense for existing user

module.exports = router;
