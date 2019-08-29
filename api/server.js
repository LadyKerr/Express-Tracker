const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const expenseRouter = require("../expenses/expense-router");

const server = express();

server.use(cors());
server.use(helmet());
server.use(express.json());

server.use("/api/expenses", expenseRouter);

server.get("/", (req, res) => {
  res.send("it's alive! LEt's track these expenses!");
});

module.exports = server;
