const express = require("express");
const topicsRouter = express.Router();
const { fetchTopics } = require("../controllers/topics.controller.js");

topicsRouter.get("/", getTopics);
