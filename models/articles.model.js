const db = require("../db/connection.js");

exports.fetchArticleById = async (article_id) => {
  if (isNaN(article_id)) {
    return Promise.reject({ status: 400, msg: "Bad request" });
  }
  const result = await db.query(
    `SELECT articles.author, title, articles.article_id, articles.body, topic, articles.created_at, articles.votes, COUNT(comment_id) AS comment_count FROM articles LEFT JOIN comments ON articles.article_id = comments.article_id WHERE articles.article_id = $1 GROUP BY articles.article_id;`,
    [article_id]
  );

  if (result.rows.length === 0) {
    return Promise.reject({ status: 404, msg: "Article not found" });
  }

  const article = result.rows[0];
  article.comment_count = parseInt(article.comment_count);
  return article;
};

exports.updateArticleById = async (article_id, inc_votes) => {
  if (isNaN(inc_votes)) {
    return Promise.reject({ status: 400, msg: "Bad request" });
  }

  await db.query(
    "UPDATE articles SET votes = votes + $2 WHERE article_id = $1;",
    [article_id, inc_votes]
  );

  const result = await db.query(
    `SELECT * FROM articles WHERE article_id = $1`,
    [article_id]
  );

  return result.rows[0];
};

exports.fetchArticles = async (sort_by = "created_at") => {
  const result = await db.query(
    `SELECT articles.author, title, articles.article_id, articles.body, topic, articles.created_at, articles.votes, COUNT(comment_id) AS comment_count FROM articles LEFT JOIN comments ON articles.article_id = comments.article_id GROUP BY articles.article_id ORDER BY articles.${sort_by};`
  );

  return result.rows.map((article) => {
    article.comment_count = parseInt(article.comment_count);
    return article;
  });
};
