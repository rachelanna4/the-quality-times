const db = require("../db/connection.js");

exports.fetchArticleById = async (article_id) => {
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

exports.updateArticleVotesById = async (article_id, userRequest) => {
  const requestedUpdates = Object.keys(userRequest);

  if (!requestedUpdates.includes("inc_votes")) {
    return Promise.reject({ status: 400, msg: "Bad request" });
  }

  await db.query(
    "UPDATE articles SET votes = votes + $2 WHERE article_id = $1;",
    [article_id, userRequest.inc_votes]
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
  topic,
  author,
  limit = 10,
  page = 1
) => {
  const validColumns = [
    "author",
    "title",
    "article_id",
    "topic",
    "created_at",
    "votes",
  ];

  if (limit > 100) {
    return Promise.reject({ status: 400, msg: "Bad request" });
  }

  const validOrder = ["asc", "desc"];

  if (!validColumns.includes(sort_by) || !validOrder.includes(order)) {
    return Promise.reject({ status: 400, msg: "Bad request" });
  }

  const topics = await db.query(`SELECT slug FROM topics;`);
  const topicSlugs = topics.rows.map((topic) => topic.slug);

  if (topic && !topicSlugs.includes(topic)) {
    return Promise.reject({ status: 404, msg: "Topic not found" });
  }

  const users = await db.query(`SELECT username FROM users;`);
  const validAuthors = users.rows.map((user) => user.username);

  if (author && !validAuthors.includes(author)) {
    return Promise.reject({ status: 404, msg: "Topic not found" });
  }

  const offset = (page - 1) * limit;

  let queryStr = `SELECT articles.author, title, articles.article_id, topic, articles.created_at, articles.votes, COUNT(comment_id) AS comment_count FROM articles LEFT JOIN comments ON articles.article_id = comments.article_id `;

  const filters = [];

  if (topic) {
    filters.push(`articles.topic = '${topic}'`);
  }

  if (author) {
    filters.push(`articles.author = '${author}'`);
  }

  if (filters.length >= 1) {
    const queries = filters.join(" AND ");
    queryStr += `WHERE ${queries} `;
  }

  const totalCountQuery =
    queryStr + `GROUP BY articles.article_id ORDER BY ${sort_by} ${order};`;

  const paginatedArticlesQuery =
    queryStr +
    `GROUP BY articles.article_id ORDER BY ${sort_by} ${order} LIMIT $1 OFFSET $2;`;

  const result = {};

  const paginatedArticlesResult = await db.query(paginatedArticlesQuery, [
    limit,
    offset,
  ]);

  result.articleData = paginatedArticlesResult.rows.map((article) => {
    article.comment_count = parseInt(article.comment_count);
    return article;
  });

  const totalCountResult = await db.query(totalCountQuery);

  result.total = totalCountResult.rows.length;

  return result;
};

exports.fetchCommentsByArticle = async (article_id, limit = 10, page = 1) => {
  const offset = (page - 1) * limit;

  const paginatedComments = await db.query(
    `SELECT comment_id, votes, created_at, author, body FROM comments WHERE article_id = $1 LIMIT $2 OFFSET $3; `,
    [article_id, limit, offset]
  );

  const allComments = await db.query(
    `SELECT comment_id, votes, created_at, author, body FROM comments WHERE article_id = $1;`,
    [article_id]
  );

  const result = {};

  result.commentsData = paginatedComments.rows;
  result.total = allComments.rows.length;

  return result;
};

exports.addComment = async (article_id, comment) => {
  const { username, body } = comment;

  if (!username || !body) {
    return Promise.reject({ status: 400, msg: "Bad request" });
  }

  const user = await db.query(`SELECT * FROM users WHERE username = $1`, [
    username,
  ]);

  if (user.rows.length === 0) {
    return Promise.reject({ status: 404, msg: "User not found" });
  }

  if (body.length > 500) {
    return Promise.reject({ status: 400, msg: "Bad request" });
  }

  const result = await db.query(
    `INSERT INTO comments (author, article_id, body) VALUES ($1, $2, $3) RETURNING *;`,
    [username, article_id, body]
  );

  return result.rows[0];
};

exports.addArticle = async (newArticle) => {
  if (
    !newArticle.title ||
    !newArticle.body ||
    !newArticle.topic ||
    !newArticle.author
  ) {
    return Promise.reject({ status: 400, msg: "Bad request" });
  }

  const result = await db.query(
    `INSERT INTO articles (title, body, topic, author) VALUES ($1, $2, $3, $4) RETURNING *;`,
    [newArticle.title, newArticle.body, newArticle.topic, newArticle.author]
  );

  return result.rows[0].article_id;
};

exports.removeArticle = async (article_id) => {
  await db.query(`DELETE FROM articles WHERE article_id = $1;`, [article_id]);
};
