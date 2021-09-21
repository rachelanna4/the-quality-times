const express = require("express");
const articlesRouter = express.Router();

const { getArticleById } = require("../controllers/articles.controller.js");

articlesRouter.get("/:article_id", getArticleById);

module.exports = articlesRouter;
