const db = require("../db/connection.js");

exports.fetchTopics = async () => {
  const result = await db.query(`SELECT * FROM topics`);
  return result.rows;
};

exports.addTopic = async (postRequest) => {
  const result = await db.query(
    `INSERT INTO topics (slug, description) VALUES ($1, $2) RETURNING *;`,
    [postRequest.slug, postRequest.description]
  );

  return result.rows[0];
};
