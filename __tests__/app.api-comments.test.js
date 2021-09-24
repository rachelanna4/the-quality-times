const db = require("../db/connection.js");
const testData = require("../db/data/test-data/index.js");
const seed = require("../db/seeds/seed.js");
const app = require("../app.js");
const request = require("supertest");

beforeEach(() => seed(testData));
afterAll(() => db.end());

describe("DELETE /api/comments/:comment_id", () => {
  test("204: responds with no content when an existing comment is deleted ", async () => {
    const res = await request(app).delete("/api/comments/1").expect(204);
    expect(res.text).toBe("");
  });

  test("204: comment is deleted from database", async () => {
    const commentsResponse = await request(app)
      .get("/api/articles/1/comments")
      .expect(200);
    const commentId = commentsResponse.body.comments[0].comment_id;
    const commentAmount = commentsResponse.body.comments.length;
    await request(app).delete(`/api/comments/${commentId}`).expect(204);
    const newCommentsResponse = await request(app)
      .get("/api/articles/1/comments")
      .expect(200);
    expect(newCommentsResponse.body.comments.length).toBe(commentAmount - 1);
    const remainingCommentIds = newCommentsResponse.body.comments.map(
      (comment) => {
        return comment.comment_id;
      }
    );
    expect(remainingCommentIds.includes(commentId)).toBe(false);
  });

  test("404: returns Comment not found message when passed a valid but non-existent comment id", async () => {
    const res = await request(app).delete("/api/comments/250").expect(404);
    expect(res.body.msg).toBe("Comment not found");
  });

  test("400: returns Bad request message when passed an invalid comment id", async () => {
    const res = await request(app)
      .delete("/api/comments/not_a_valid_id")
      .expect(400);
    expect(res.body.msg).toBe("Bad request");
  });
});

describe("PATCH /api/comments/:comment_id", () => {
  test("200: returns the updated comment as a single object", async () => {
    const res = await request(app)
      .patch("/api/comments/2")
      .send({ inc_votes: 1 })
      .expect(200);
    expect(typeof res.body.comment).toBe("object");
    expect(Array.isArray(res.body.comment)).toBe(false);
  });
});
