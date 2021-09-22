const express = require("express");
const articlesRouter = express.Router();

const {
  getArticleById,
  patchArticleById,
  getArticles,
} = require("../controllers/articles.controller.js");

articlesRouter.get("/:article_id", getArticleById);
articlesRouter.patch("/:article_id", patchArticleById);
articlesRouter.get("/", getArticles);

module.exports = articlesRouter;
