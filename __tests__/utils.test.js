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
  test("works when passed an array containing multiple objects", () => {
    const array = [
      {
        username: "tickle122",
        name: "Tom Tickle",
        avatar_url:
          "https://vignette.wikia.nocookie.net/mrmen/images/d/d6/Mr-Tickle-9a.png/revision/latest?cb=20180127221953",
      },
      {
        username: "grumpy19",
        name: "Paul Grump",
        avatar_url:
          "https://vignette.wikia.nocookie.net/mrmen/images/7/78/Mr-Grumpy-3A.PNG/revision/latest?cb=20170707233013",
      },
    ];
    expect(fetchData(array, "username", "name", "avatar_url")).toEqual([
      [
        "tickle122",
        "Tom Tickle",
        "https://vignette.wikia.nocookie.net/mrmen/images/d/d6/Mr-Tickle-9a.png/revision/latest?cb=20180127221953",
      ],
      [
        "grumpy19",
        "Paul Grump",
        "https://vignette.wikia.nocookie.net/mrmen/images/7/78/Mr-Grumpy-3A.PNG/revision/latest?cb=20170707233013",
      ],
    ]);
  });
  test("returned array does not have the same reference as the original array", () => {
    const array = [
      { description: "Code is love, code is life", slug: "coding" },
    ];
    expect(fetchData(array, "description", "slug")).not.toBe(array);
  });
});
