const { fetchData } = require("../db/utils/data-manipulation");

describe("fetchData", () => {
  test("returns an empty array when passed an empty array", () => {
    expect(fetchData([])).toEqual([]);
  });
});

// [
//   { description: "Code is love, code is life", slug: "coding" },
//   { description: "FOOTIE!", slug: "football" },
//   { description: "Hey good looking, what you got cooking?", slug: "cooking" },
// ];
