const { removeComment } = require("../models/comments.model.js");

exports.deleteCommentById = async (req, res, next) => {
  const { comment_id } = req.params;
  try {
    await removeComment(comment_id);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};
