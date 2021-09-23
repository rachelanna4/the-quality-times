const express = require("express");
const articlesRouter = express.Router();

const {
  getArticleById,
  patchArticleById,
  getArticles,
  getCommentsByArticle,
  addCommentToArticle,
} = require("../controllers/articles.controller.js");

articlesRouter.get("/:article_id", getArticleById);
articlesRouter.patch("/:article_id", patchArticleById);
articlesRouter.get("/", getArticles);
articlesRouter.get("/:article_id/comments", getCommentsByArticle);
articlesRouter.post("/:article_id/comments", addCommentToArticle);

module.exports = articlesRouter;
