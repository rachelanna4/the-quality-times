const express = require("express");
const topicsRouter = express.Router();
const { getTopics, postTopic } = require("../controllers/topics.controller.js");

topicsRouter.route("/").get(getTopics);

module.exports = topicsRouter;
