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
    expect(fetchData(array, "description", "slug")).toEqual([
      ["Code is love, code is life", "coding"],
    ]);
    const array2 = [
      {
        title: "Running a Node App",
        topic: "coding",
        author: "jessjelly",
        body: "This is part two of a series",
        created_at: new Date(1604728980000),
        votes: 0,
      },
    ];
    expect(
      fetchData(
        array2,
        "title",
        "topic",
        "author",
        "body",
        "created_at",
        "votes"
      )
    ).toEqual([
      [
        "Running a Node App",
        "coding",
        "jessjelly",
        "This is part two of a series",
        new Date(1604728980000),
        0,
      ],
    ]);
  });
  test("works when passed an array containing multiple objects");
});

// [
//   { description: "Code is love, code is life", slug: "coding" },
//   { description: "FOOTIE!", slug: "football" },
//   { description: "Hey good looking, what you got cooking?", slug: "cooking" },
// ];
