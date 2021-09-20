const { fetchData } = require("../db/utils/data-manipulation");

describe("fetchData", () => {
  test("returns an empty array when passed an empty array", () => {
    expect(fetchData([])).toEqual([]);
  });
  test("when passed an array containing one object and the name of a key on that object, returns a two dimensional array containing the value of that key, ", () => {
    const array = [{ description: "Code is love, code is life" }];
    const key = "description";
    expect(fetchData(array, key)).toEqual([["Code is love, code is life"]]);
  });
  test("when passed the names of multiple keys, returns a nested array with the values of all of those keys", () => {
    const array = [
      { description: "Code is love, code is life", slug: "coding" },
    ];
    const key1 = "description";
    const key2 = "slug";
    expect(fetchData(array, key1, key2)).toEqual([
      ["Code is love, code is life", "coding"],
    ]);
  });
});

// [
//   { description: "Code is love, code is life", slug: "coding" },
//   { description: "FOOTIE!", slug: "football" },
//   { description: "Hey good looking, what you got cooking?", slug: "cooking" },
// ];
