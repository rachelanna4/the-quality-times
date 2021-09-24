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

exports.updateCommentVotes = async (comment_id, updateRequest) => {
  await db.query(
    "UPDATE comments SET votes = votes + $2 WHERE comment_id = $1;",
    [comment_id, updateRequest.inc_votes]
  );

  const result = await db.query(
    `SELECT * FROM comments WHERE comment_id = $1`,
    [comment_id]
  );

  return result.rows[0];
};

// #### **PATCH /api/comments/:comment_id**

// Request body accepts:

// - an object in the form `{ inc_votes: newVote }`

//   - `newVote` will indicate how much the `votes` property in the database should be updated by

//   e.g.

//   `{ inc_votes : 1 }` would increment the current comment's vote property by 1

//   `{ inc_votes : -1 }` would decrement the current comment's vote property by 1

// Responds with:

// - the updated comment

// ---
