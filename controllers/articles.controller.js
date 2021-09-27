const {
  fetchArticleById,
  updateArticleVotesById,
  fetchArticles,
  fetchCommentsByArticle,
  addComment,
  addArticle,
  removeArticle,
} = require("../models/articles.model.js");

const { fetchUserByUsername } = require("../models/users.model");

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
  const { sort_by, order, topic, author, limit, page } = req.query;
  try {
    const { articleData, total } = await fetchArticles(
      sort_by,
      order,
      topic,
      author,
      limit,
      page
    );
    res.status(200).send({ articles: articleData, total_count: total });
  } catch (err) {
    next(err);
  }
};

exports.getCommentsByArticle = async (req, res, next) => {
  const { article_id } = req.params;
  try {
    await fetchArticleById(article_id);
    const { commentsData, total } = await fetchCommentsByArticle(article_id);
    res.status(200).send({ comments: commentsData, total_count: total });
  } catch (err) {
    next(err);
  }
};

exports.postCommentToArticle = async (req, res, next) => {
  const { article_id } = req.params;
  const comment = req.body;
  try {
    await fetchArticleById(article_id);
    const postedComment = await addComment(article_id, comment);
    res.status(201).send({ comment: postedComment });
  } catch (err) {
    next(err);
  }
};

exports.postArticle = async (req, res, next) => {
  const newArticle = req.body;
  try {
    await fetchUserByUsername(newArticle.author);
    const newArticleId = await addArticle(newArticle);
    const postedArticle = await fetchArticleById(newArticleId);
    res.status(201).send({ article: postedArticle });
  } catch (err) {
    next(err);
  }
};

exports.deleteArticleById = async (req, res, next) => {
  const { article_id } = req.params;
  try {
    await fetchArticleById(article_id);
    await removeArticle(article_id);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};
