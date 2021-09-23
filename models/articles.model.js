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

exports.fetchArticles = async (
  sort_by = "created_at",
  order = "desc",
  topic
) => {
  const validColumns = [
    "author",
    "title",
    "article_id",
    "body",
    "topic",
    "created_at",
    "votes",
  ];

  const validOrder = ["asc", "desc"];

  if (!validColumns.includes(sort_by) || !validOrder.includes(order)) {
    return Promise.reject({ status: 400, msg: "Bad request" });
  }

  const topics = await db.query(`SELECT slug FROM topics;`);
  const topicSlugs = topics.rows.map((topic) => topic.slug);

  if (topic && !topicSlugs.includes(topic)) {
    return Promise.reject({ status: 404, msg: "Topic not found" });
  }

  let queryStr = `SELECT articles.author, title, articles.article_id, articles.body, topic, articles.created_at, articles.votes, COUNT(comment_id) AS comment_count FROM articles LEFT JOIN comments ON articles.article_id = comments.article_id `;

  if (topic) {
    queryStr += `WHERE articles.topic = '${topic}' `;
  }

  queryStr += `GROUP BY articles.article_id ORDER BY ${sort_by} ${order};`;

  const result = await db.query(queryStr);

  return result.rows.map((article) => {
    article.comment_count = parseInt(article.comment_count);
    return article;
  });
};

exports.fetchCommentsByArticle = async (article_id) => {
  const result = await db.query(
    `SELECT comment_id, votes, created_at, author, body FROM comments WHERE article_id = $1;`,
    [article_id]
  );

  return result.rows;
};

exports.postComment = async (article_id) => {};

// Request body accepts:

// - an object with the following properties:
//   - `username`
//   - `body`

// Responds with:

// - the posted comment

// ---
