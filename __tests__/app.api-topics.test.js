const db = require("../db/connection.js");
const testData = require("../db/data/test-data/index.js");
const seed = require("../db/seeds/seed.js");
const app = require("../app.js");
const request = require("supertest");

beforeEach(() => seed(testData));
afterAll(() => db.end());

describe("GET /api/topics", () => {
  test("200: returns an array of objects", async () => {
    const res = await request(app).get("/api/topics").expect(200);
    expect(Array.isArray(res.body.topics)).toBe(true);
    res.body.topics.forEach((topic) => expect(typeof topic).toBe("object"));
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
