const express = require("express");
const articlesRouter = express.Router();

const {
  getArticleById,
  patchArticleById,
} = require("../controllers/articles.controller.js");

articlesRouter.get("/:article_id", getArticleById);
articlesRouter.patch("/:article_id", patchArticleById);

module.exports = articlesRouter;
