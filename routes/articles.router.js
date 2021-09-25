const express = require("express");
const articlesRouter = express.Router();

const {
  getArticleById,
  patchArticleVotesById,
  getArticles,
  getCommentsByArticle,
  addCommentToArticle,
  postArticle,
} = require("../controllers/articles.controller.js");

articlesRouter
  .route("/:article_id")
  .get(getArticleById)
  .patch(patchArticleVotesById);
articlesRouter
  .route("/:article_id/comments")
  .get(getCommentsByArticle)
  .post(addCommentToArticle);
articlesRouter.route("/").get(getArticles).post(postArticle);

module.exports = articlesRouter;
