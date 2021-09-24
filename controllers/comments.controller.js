const {
  removeComment,
  updateCommentVotes,
} = require("../models/comments.model.js");

exports.deleteCommentById = async (req, res, next) => {
  const { comment_id } = req.params;
  try {
    await removeComment(comment_id);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};

exports.patchCommentVotesById = async (req, res, next) => {
  const { comment_id } = req.params;
  const updateRequest = req.body;
  try {
    const updatedComment = await updateCommentVotes(comment_id, updateRequest);
    res.status(200).send({ comment: updatedComment });
  } catch (err) {
    next(err);
  }
};
