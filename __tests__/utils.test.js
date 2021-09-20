const { fetchTopics } = require("../db/utils/data-manipulation");

describe("fetchTopics", () => {
  test("returns an empty array when passed an empty array", () => {
    expect(fetchTopics([])).toEqual([]);
  });
});

// [
//   { description: "Code is love, code is life", slug: "coding" },
//   { description: "FOOTIE!", slug: "football" },
//   { description: "Hey good looking, what you got cooking?", slug: "cooking" },
// ];
