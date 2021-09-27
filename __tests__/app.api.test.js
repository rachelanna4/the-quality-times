const db = require("../db/connection.js");
const testData = require("../db/data/test-data/index.js");
const seed = require("../db/seeds/seed.js");
const app = require("../app.js");
const request = require("supertest");

beforeEach(() => seed(testData));
afterAll(() => db.end());

describe("GET /api", () => {
  test("200: responds with an object", async () => {
    const res = await request(app).get("/api").expect(200);
    expect(typeof res.body).toBe("object");
  });

  test("200: returned object contains all available endpoints", async () => {
    const res = await request(app).get("/api").expect(200);
    const returnedEndpoints = Object.keys(res.body);
    const availableEndpoints = [
      "GET /api",
      "GET /api/topics",
      "POST /api/topics",
      "GET /api/articles",
      "POST /api/articles",
      "GET /api/articles/:article_id",
      "PATCH /api/articles/:article_id",
      "DELETE /api/articles/:article_id",
      "GET /api/articles/:article_id/comments",
      "POST /api/articles/:article_id/comments",
      "PATCH /api/comments/:comment_id",
      "DELETE /api/comments/:comment_id",
      "GET /api/users",
      "GET /api/users/:username",
    ];
    expect(returnedEndpoints.length).toBe(14);
    availableEndpoints.forEach((endpoint) => {
      expect(returnedEndpoints.includes(endpoint)).toBe(true);
    });
  });
});
