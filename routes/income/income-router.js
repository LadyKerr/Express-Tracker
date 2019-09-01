const router = require("express").Router();

const Income = require("./income-model");

//get all income
router.get("/", (req, res) => {
  Income.fetchIncome()
    .then(income => {
      res.status(200).json(income);
    })
    .catch(err => {
      res.status(500).json({ err, message: "Error while retrieving income" });
    });
});

//get income by id
router.get("/:id", (req, res) => {
  const { id } = req.params;

  Income.fetchById(id)
    .then(income => {
      if (income) {
        res.status(200).json(income);
      } else {
        res.status(404).json({ message: "Sorry, that income does not exist." });
      }
    })
    .catch(err => {
      console.log(err);
      res
        .status(500)
        .json({ err, message: "There was an error finding that income" });
    });
});

//add new income
router.post("/", (req, res) => {
  const { payor, amount } = req.body;

  if (!payor || !amount) {
    res.status(400).json({ message: "Please add payor and amount" });
  } else {
    Income.add(req.body)
      .then(newincome => {
        res.status(200).json(newincome);
      })
      .catch(err => {
        console.log(err);
        res
          .status(500)
          .json({ message: "There was an error adding that income" });
      });
  }
});

//update income
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const changes = req.body;
  const { payor, amount } = req.body;

  if (!payor || !amount) {
    res.status(400).json({ errorMessage: "Please provide payor and amount" });
  } else {
    Income.update(id, changes)
      .then(updated => {
        if (!updated) {
          res.status(404).json({ message: "That income does not exist" });
        } else {
          res.status(200).json(updated);
        }
      })
      .catch(err => {
        console.log(err);
        res
          .status(500)
          .json({ message: "There was an error updating that income." });
      });
  }
});

//delete an income
router.delete("/:id", (req, res) => {
  const { id } = req.params;

  Income.remove(id)
    .then(deleted => {
      if (deleted) {
        res.status(200).json(deleted);
      } else {
        res
          .status(404)
          .json({ message: "The income with that ID does not exist." });
      }
    })
    .catch(err => {
      console.log(err);
      res
        .status(500)
        .json({ message: "Could not delete that income. Try again" });
    });
});

module.exports = router;
