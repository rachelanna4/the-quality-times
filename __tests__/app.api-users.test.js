const db = require("../db/connection.js");
const testData = require("../db/data/test-data/index.js");
const seed = require("../db/seeds/seed.js");
const app = require("../app.js");
const request = require("supertest");

beforeEach(() => seed(testData));
afterAll(() => db.end());

describe("GET /api/users", () => {
  test("200: returns an array of all user objects", async () => {
    const res = await request(app).get("/api/users").expect(200);
    expect(Array.isArray(res.body.users)).toBe(true);
    expect(res.body.users.length).toBe(4);
    res.body.users.forEach((user) => {
      expect(typeof user).toBe("object");
    });
  });
  test("200: user objects should have a username property only", async () => {
    const res = await request(app).get("/api/users").expect(200);
    res.body.users.forEach((user) => {
      expect(user).toMatchObject({
        username: expect.any(String),
      });
    });
    expect(res.body.users[0]).toEqual({
      username: "butter_bridge",
    });
  });
});

describe("GET /api/users/:username", () => {
  test("200: returns a single user object with the correct keys and value data types", async () => {
    const res = await request(app).get("/api/users/butter_bridge").expect(200);
    expect(typeof res.body.user).toBe("object");
    expect(Array.isArray(res.body.user)).toBe(false);
    expect(res.body.user).toMatchObject({
      username: expect.any(String),
      name: expect.any(String),
      avatar_url: expect.any(String),
    });
  });

  test("200: user object contains expected property values", async () => {
    const res = await request(app).get("/api/users/butter_bridge").expect(200);
    expect(res.body.user).toEqual({
      username: "butter_bridge",
      name: "jonny",
      avatar_url:
        "https://www.healthytherapies.com/wp-content/uploads/2016/06/Lime3.jpg",
    });
  });
});
