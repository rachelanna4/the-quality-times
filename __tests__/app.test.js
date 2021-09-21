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
});
