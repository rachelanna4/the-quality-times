const express = require("express");
const commentsRouter = express.Router();

const {
  deleteCommentById,
  patchCommentVotesById,
} = require("../controllers/comments.controller.js");

commentsRouter
  .route("/:comment_id")
  .delete(deleteCommentById)
  .patch(patchCommentVotesById);

module.exports = commentsRouter;
