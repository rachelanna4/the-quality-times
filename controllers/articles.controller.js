const {
  fetchArticleById,
  updateArticleById,
  fetchArticles,
} = require("../models/articles.model.js");

exports.getArticleById = async (req, res, next) => {
  try {
    const { article_id } = req.params;
    const articleData = await fetchArticleById(article_id);
    res.status(200).send(articleData);
  } catch (err) {
    next(err);
  }
};

exports.patchArticleById = async (req, res, next) => {
  try {
    const { article_id } = req.params;
    const { inc_votes } = req.body;
    await fetchArticleById(article_id);
    await updateArticleById(article_id, inc_votes);
    const patchedArticle = await fetchArticleById(article_id);
    res.status(200).send(patchedArticle);
  } catch (err) {
    next(err);
  }
};

exports.getArticles = async (req, res, next) => {
  const { sort_by, order, topic } = req.query;
  try {
    const articleData = await fetchArticles(sort_by, order, topic);
    res.status(200).send({ articles: articleData });
  } catch (err) {
    next(err);
  }
};

// #### **GET /api/articles**

// Responds with:

// - an `articles` array of article objects, each of which should have the following properties:
//   - `author` which is the `username` from the users table
//   - `title`
//   - `article_id`
//   - `topic`
//   - `created_at`
//   - `votes`
//   - `comment_count` which is the total count of all the comments with this article_id - you should make use of queries to the database in order to achieve this

// Should accept queries:

// - `sort_by`, which sorts the articles by any valid column (defaults to date)
// - `order`, which can be set to `asc` or `desc` for ascending or descending (defaults to descending)
// - `topic`, which filters the articles by the topic value specified in the query

// ---
