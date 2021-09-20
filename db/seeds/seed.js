const db = require("../connection.js");

const seed = async (data) => {
  const { articleData, commentData, topicData, userData } = data;

  await Promise.all(
    ["topics", "articles", "users", "comments"].map((tableName) => {
      return db.query(`DROP TABLE IF EXISTS ${tableName};`);
    })
  );

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
      FOREIGN KEY (topic) REFERENCES topics(slug),
      FOREIGN KEY (author) REFERENCES users(username),
      created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
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
      FOREIGN KEY (author) REFERENCES users(username),
      FOREIGN KEY (article_id) REFERENCES articles(article_id)
      );`
  );
  // 1. create tables
  // 2. insert data
};

module.exports = seed;
