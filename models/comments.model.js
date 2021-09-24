const db = require("../db/connection.js");

exports.removeComment = async (comment_id) => {
  const existingComments = await db.query(
    `SELECT comment_id FROM comments WHERE comment_id = $1;`,
    [comment_id]
  );
  if (existingComments.rows.length === 0) {
    return Promise.reject({ status: 404, msg: "Comment not found" });
  }

  await db.query(`DELETE FROM comments WHERE comment_id = $1;`, [comment_id]);
};
