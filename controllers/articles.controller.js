const {
  fetchArticleById,
  updateArticleVotesById,
  fetchArticles,
  fetchCommentsByArticle,
  postComment,
  addArticle,
} = require("../models/articles.model.js");

exports.getArticleById = async (req, res, next) => {
  try {
    const { article_id } = req.params;
    const articleData = await fetchArticleById(article_id);
    res.status(200).send({ article: articleData });
  } catch (err) {
    next(err);
  }
};

exports.patchArticleVotesById = async (req, res, next) => {
  try {
    const { article_id } = req.params;
    const userRequest = req.body;
    await fetchArticleById(article_id);
    await updateArticleVotesById(article_id, userRequest);
    const patchedArticle = await fetchArticleById(article_id);
    res.status(200).send({ article: patchedArticle });
  } catch (err) {
    next(err);
  }
};

exports.getArticles = async (req, res, next) => {
  const { sort_by, order, topic, author } = req.query;
  try {
    const articleData = await fetchArticles(sort_by, order, topic, author);
    res.status(200).send({ articles: articleData });
  } catch (err) {
    next(err);
  }
};

exports.getCommentsByArticle = async (req, res, next) => {
  const { article_id } = req.params;
  try {
    await fetchArticleById(article_id);
    const commentData = await fetchCommentsByArticle(article_id);
    res.status(200).send({ comments: commentData });
  } catch (err) {
    next(err);
  }
};

exports.addCommentToArticle = async (req, res, next) => {
  const { article_id } = req.params;
  const comment = req.body;
  try {
    await fetchArticleById(article_id);
    const postedComment = await postComment(article_id, comment);
    res.status(201).send({ comment: postedComment });
  } catch (err) {
    next(err);
  }
};

exports.postArticle = async (req, res, next) => {
  const newArticle = req.body;
  try {
    const newArticleId = await addArticle(newArticle);
    const postedArticle = await fetchArticleById(newArticleId);
    res.status(201).send({ article: postedArticle });
  } catch (err) {
    next(err);
  }
};

// Request body accepts:

// - an object with the following properties:

//   - `author` which is the `username` from the users table
//   - `title`
//   - `body`
//   - `topic`

// Responds with:

// - the newly added article, with all the above properties as well as:
//   - `article_id`
//   - `votes`
//   - `created_at`
//   - `comment_count`
