const { fetchArticleById } = require("../models/articles.model.js");

exports.getArticleById = async (req, res, next) => {
  try {
    const { article_id } = req.params;
    const articleData = await fetchArticleById(article_id);
    res.status(200).send(articleData);
  } catch (err) {
    next(err);
  }
};

// GET /api/articles/:article_id
// Responds with:

// an article object, which should have the following properties:

// author which is the username from the users table
// title
// article_id
// body
// topic
// created_at
// votes
// comment_count which is the total count of all the comments with this article_id - you should make use of queries to the database in order to achieve this
