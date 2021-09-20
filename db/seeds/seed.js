const db = require("../connection.js");
const format = require("pg-format");
const { fetchData } = require("../utils/data-manipulation.js");

const createTables = async () => {
  await db.query(`DROP TABLE IF EXISTS comments;`);
  await db.query(`DROP TABLE IF EXISTS articles;`);
  await db.query(`DROP TABLE IF EXISTS users;`);
  await db.query(`DROP TABLE IF EXISTS topics;`);

  await db.query(
    `CREATE TABLE topics (
      slug VARCHAR (20) NOT NULL PRIMARY KEY, 
      description VARCHAR (250) NOT NULL 
      );`
  );

  await db.query(
    `CREATE TABLE users (
      username VARCHAR(20) NOT NULL PRIMARY KEY, 
      avatar_url VARCHAR(500), 
      name VARCHAR (30) 
      );`
  );

  await db.query(
    `CREATE TABLE articles (
      article_id SERIAL PRIMARY KEY,  
      title VARCHAR(100) NOT NULL, 
      body TEXT NOT NULL,
      votes INT DEFAULT 0, 
      topic VARCHAR(20) NOT NULL,
      author VARCHAR(20) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (topic) REFERENCES topics(slug) ON DELETE CASCADE,
      FOREIGN KEY (author) REFERENCES users(username) ON DELETE CASCADE
      );`
  );

  await db.query(
    `CREATE TABLE comments (
      comment_id SERIAL PRIMARY KEY,  
      author VARCHAR(20) NOT NULL, 
      article_id INT NOT NULL,
      votes INT DEFAULT 0, 
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      body VARCHAR(500) NOT NULL,
      FOREIGN KEY (author) REFERENCES users(username) ON DELETE CASCADE,
      FOREIGN KEY (article_id) REFERENCES articles(article_id) ON DELETE CASCADE
      );`
  );
};

const seed = async (data) => {
  const { articleData, commentData, topicData, userData } = data;

  await createTables();

  const topics = fetchData(topicData, "slug", "description");
  const topicQuery = format(
    `INSERT INTO topics (slug, description) VALUES %L;`,
    topics
  );
  await db.query(topicQuery);

  const users = fetchData(userData, "username", "avatar_url", "name");
  const userQuery = format(
    `INSERT INTO users(username, avatar_url, name) VALUES %L;`,
    users
  );
  await db.query(userQuery);

  const articles = fetchData(
    articleData,
    "title",
    "body",
    "votes",
    "topic",
    "author",
    "created_at"
  );
  const articleQuery = format(
    `INSERT INTO articles(title, body, votes, topic, author, created_at) VALUES %L;`,
    articles
  );
  await db.query(articleQuery);

  const comments = fetchData(
    commentData,
    "author",
    "article_id",
    "votes",
    "created_at",
    "body"
  );
  const commentQuery = format(
    `INSERT INTO comments(author, article_id, votes, created_at, body) VALUES %L;`,
    comments
  );
  await db.query(commentQuery);
};

module.exports = seed;
