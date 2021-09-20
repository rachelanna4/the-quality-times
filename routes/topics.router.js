const express = require("express");
const topicsRouter = express.Router();
const { getTopics } = require("../controllers/topics.controller.js");

topicsRouter.get("/", getTopics);

module.exports = topicsRouter;
