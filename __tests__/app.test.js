const db = require("../db/connection.js");
const testData = require("../db/data/test-data/index.js");
const seed = require("../db/seeds/seed.js");
const app = require("../app.js");
const request = require("supertest");
const { toBeSortedBy } = require("jest-sorted");
const { createStringOfLength } = require("../db/utils/data-manipulation");

beforeEach(() => seed(testData));
afterAll(() => db.end());

describe("invalid url", () => {
  test("404: returns an invalid url message when passed an endpoint that doesn't exist", async () => {
    const res = await request(app).get("/api/invalidUrl").expect(404);
    expect(res.body.msg).toBe("Invalid URL");
  });
});
