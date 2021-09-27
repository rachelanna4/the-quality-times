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

  test("201: returns the correct posted topic object", async () => {
    const res = await request(app)
      .post("/api/topics")
      .send({
        slug: "new topic",
        description: "new description",
      })
      .expect(201);
    expect(res.body.topic).toEqual({
      slug: "new topic",
      description: "new description",
    });
  });

  test("201: ignores any extra properties included in request body", async () => {
    const res = await request(app)
      .post("/api/topics")
      .send({
        slug: "new topic",
        description: "new description",
        extra_property: "ignore me",
      })
      .expect(201);
    expect(res.body.topic).not.toHaveProperty("extra_property");
  });

  test("201: topic is added to the database", async () => {
    await request(app)
      .post("/api/topics")
      .send({
        slug: "new topic",
        description: "new description",
      })
      .expect(201);
    const allTopics = await request(app).get("/api/topics").expect(200);
    expect(allTopics.body.topics.length).toBe(4);
    const newTopic = allTopics.body.topics.filter((topic) => {
      return (
        topic.slug === "new topic" && topic.description === "new description"
      );
    });
    expect(newTopic.length).toBe(1);
  });

  test("400: returns bad request when request object is missing properties", async () => {
    const res = await request(app)
      .post("/api/topics")
      .send({
        slug: "new topic",
      })
      .expect(400);
    expect(res.body.msg).toBe("Bad request");
  });
});
