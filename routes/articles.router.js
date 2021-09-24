const express = require("express");
const articlesRouter = express.Router();

const {
  getArticleById,
  patchArticleById,
  getArticles,
  getCommentsByArticle,
  addCommentToArticle,
} = require("../controllers/articles.controller.js");

articlesRouter
  .route("/:article_id")
  .get(getArticleById)
  .patch(patchArticleById);
articlesRouter
  .route("/:article_id/comments")
  .get(getCommentsByArticle)
  .post(addCommentToArticle);
articlesRouter.get("/", getArticles);

module.exports = articlesRouter;
