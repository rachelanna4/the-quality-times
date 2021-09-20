const express = require("express");
const apiRouter = express.Router();

const topicsRouter = require("./topics.router.js");

apiRouter.use("/topics", topicsRouter);

module.exports = apiRouter;
