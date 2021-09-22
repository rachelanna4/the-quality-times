const {
  fetchArticleById,
  updateArticleById,
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
