const db = require("../connection.js");

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
      votes INT NOT NULL DEFAULT 0, 
      topic VARCHAR(20) NOT NULL,
      author VARCHAR(20) NOT NULL,
      created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (topic) REFERENCES topics(slug) ON DELETE CASCADE,
      FOREIGN KEY (author) REFERENCES users(username) ON DELETE CASCADE
      );`
  );

  await db.query(
    `CREATE TABLE comments (
      comment_id SERIAL PRIMARY KEY,  
      author VARCHAR(20) NOT NULL, 
      article_id INT NOT NULL,
      votes INT NOT NULL DEFAULT 0, 
      created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      body VARCHAR(500) NOT NULL,
      FOREIGN KEY (author) REFERENCES users(username) ON DELETE CASCADE,
      FOREIGN KEY (article_id) REFERENCES articles(article_id) ON DELETE CASCADE
      );`
  );
};

const seed = async (data) => {
  const { articleData, commentData, topicData, userData } = data;

  await createTables();
  // 1. create tables
  // 2. insert data
};

module.exports = seed;
