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
    `SELECT username, name, avatar_url FROM users WHERE username = $1;`,
    [username]
  );

  if (result.rows.length === 0) {
    return Promise.reject({ status: 404, msg: "User not found" });
  }

  return result.rows[0];
};
