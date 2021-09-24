const db = require("../db/connection.js");

exports.removeComment = async (comment_id) => {
  const existingComments = await db.query(`SELECT comment_id FROM comments;`);

  const validCommentIds = existingComments.rows.map((comment) => {
    return comment.comment_id;
  });

  if (!validCommentIds.includes(Number(comment_id))) {
    return Promise.reject({ status: 404, msg: "Comment not found" });
  }

  await db.query(`DELETE FROM comments WHERE comment_id = $1;`, [comment_id]);
};
