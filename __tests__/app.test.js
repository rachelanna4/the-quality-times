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
    expect(Array.isArray(res.body.topics)).toEqual(true);
    expect(typeof res.body.topics[0]).toEqual("object");
  });
  test("200: returns an array of correct length", async () => {
    const res = await request(app).get("/api/topics").expect(200);
    expect(res.body.topics.length).toBe(3);
  });
});

// 200: objects returned in the array have the correct keys
// test("200: returns an array containing the expected topics")
