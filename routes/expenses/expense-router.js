const router = require("express").Router();

const Expenses = require("./expense-model");

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

//get user expenses once expenses route is configured
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

module.exports = router;
