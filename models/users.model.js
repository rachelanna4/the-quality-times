const db = require("../db/connection.js");

exports.fetchUsers = async () => {
  const result = await db.query(`SELECT * FROM users;`);
  return result.rows.map((user) => {
    return {
      username: user.username,
    };
  });
};

exports.fetchUserByUsername = async (username) => {
  const result = await db.query(
    `SELECT username, avatar_url, name FROM users WHERE username = $1;`,
    [username]
  );

  return result.rows[0];
};
