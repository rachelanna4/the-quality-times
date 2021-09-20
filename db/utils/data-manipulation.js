exports.fetchData = (data, ...args) => {
  if (data.length === 0) return [];
  return [[data[0][args[0]]]];
};

//   return data.map((topic) => {
//     return [topic.slug, topic.desciption];
//   });
