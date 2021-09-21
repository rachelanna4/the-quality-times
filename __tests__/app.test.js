const db = require("../db/connection.js");
const testData = require("../db/data/test-data/index.js");
const seed = require("../db/seeds/seed.js");
const app = require("../app.js");
const request = require("supertest");

beforeEach(() => seed(testData));
afterAll(() => db.end());

describe("invalid url", () => {
  test("404: returns an invalid url message when passed an endpoint that doesn't exist", async () => {
    const res = await request(app).get("/api/invalidUrl").expect(404);
    expect(res.body.msg).toBe("Invalid URL");
  });
});

describe("GET /api/topics", () => {
  test("200: returns an array of objects", async () => {
    const res = await request(app).get("/api/topics").expect(200);
    expect(Array.isArray(res.body.topics)).toEqual(true);
    expect(typeof res.body.topics[0]).toEqual("object");
  });
  test("200: returns an array of correct length", async () => {
    const res = await request(app).get("/api/topics").expect(200);
    expect(res.body.topics.length).toBe(3);
  });
  test("200: returns an array of objects containing the correct keys and correct value data types", async () => {
    const res = await request(app).get("/api/topics").expect(200);
    expect(res.body.topics.length).toBeGreaterThanOrEqual(1);
    res.body.topics.forEach((student) => {
      expect(student).toMatchObject({
        slug: expect.any(String),
        description: expect.any(String),
      });
    });
  });
  test("200: returns an array containing the expected topics", async () => {
    const res = await request(app).get("/api/topics").expect(200);
    expect(res.body.topics[0]).toEqual({
      slug: "mitch",
      description: "The man, the Mitch, the legend",
    });
  });
});

describe("GET /api/articles/:article_id", () => {
  test("200: return a single object", async () => {
    const res = await request(app).get("/api/articles/2").expect(200);
    expect(typeof res.body).toEqual("object");
    expect(Array.isArray(res.body)).toEqual(false);
  });
  test("200: object returned has correct keys and correct value data types", async () => {
    const res = await request(app).get("/api/articles/1").expect(200);
    expect(res.body).toMatchObject({
      author: expect.any(String),
      title: expect.any(String),
      article_id: expect.any(Number),
      body: expect.any(String),
      topic: expect.any(String),
      created_at: expect.any(String),
      votes: expect.any(Number),
      comment_count: expect.any(Number),
    });
  });
  test("200: returns an object containing the expected article data", async () => {
    const res = await request(app).get("/api/articles/1").expect(200);
    expect(res.body).toEqual({
      author: "butter_bridge",
      title: "Living in the shadow of a great man",
      article_id: 1,
      body: "I find this existence challenging",
      topic: "mitch",
      created_at: "2020-07-09T20:11:00.000Z",
      votes: 100,
      comment_count: 13,
    });
  });
  test("200: returns an object with comment_count property of 0 when an article does not have any associated comments", async () => {
    const res = await request(app).get("/api/articles/4").expect(200);
    expect(res.body).toEqual({
      author: "rogersop",
      title: "Student SUES Mitch!",
      article_id: 4,
      body: "We all love Mitch and his wonderful, unique typing style. However, the volume of his typing has ALLEGEDLY burst another students eardrums, and they are now suing for damages",
      topic: "mitch",
      created_at: "2020-05-06T01:14:00.000Z",
      votes: 0,
      comment_count: 0,
    });
  });
  test("400: when passed a non-valid article_id", async () => {
    const res = await request(app).get("/api/articles/invalid_id").expect(400);
    expect(res.body.msg).toBe("Bad request");
  });
  test("404: when passed a valid but non-existent article_id", async () => {
    const res = await request(app).get("/api/articles/92").expect(404);
    expect(res.body.msg).toBe("Article not found");
  });
});

describe("PATCH /api/articles/:article_id", () => {
  test("200: return a single object", async () => {
    const res = await request(app).patch("/api/articles/1").expect(200);
    expect(typeof res.body).toEqual("object");
    expect(Array.isArray(res.body)).toEqual(false);
  });
});
