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

describe("POST /api/topics", () => {
  test("201: responds with a single topic object", async () => {
    const res = await request(app)
      .post("/api/topics")
      .send({
        slug: "new topic",
        description: "new description",
      })
      .expect(201);
    expect(typeof res.body.topic).toBe("object");
    expect(Array.isArray(res.body.topic)).toBe(false);
  });

  test("201: returned object has the correct keys and correct value data types", async () => {
    const res = await request(app)
      .post("/api/topics")
      .send({
        slug: "new topic",
        description: "new description",
      })
      .expect(201);
    expect(res.body.topic).toMatchObject({
      slug: expect.any(String),
      description: expect.any(String),
    });
  });
});

// #### POST /api/topics

// Request body accepts:

// - an object in the form:

// ```json
// {
//   "slug": "topic name here",
//   "description": "description here"
// }
// ```

// Responds with:

// - a topic object containing the newly added topic
