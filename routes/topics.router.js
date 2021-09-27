const express = require("express");
const topicsRouter = express.Router();
const { getTopics, postTopic } = require("../controllers/topics.controller.js");

topicsRouter.route("/").get(getTopics).post(postTopic);

module.exports = topicsRouter;
