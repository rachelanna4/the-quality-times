const express = require("express");
const apiRouter = require("./routes/api.router.js");
const { handle500errors } = require("./errors.js");

const app = express();

app.use(express.json());

app.use("/api", apiRouter);

app.all("*", (req, res) => {
  res.status(404).send({ msg: "Invalid URL" });
});

app.use(handle500errors);

module.exports = app;
