exports.fetchData = (data, ...args) => {
  return data.map((dataObj) => {
    return args.map((key) => {
      return dataObj[key];
    });
  });
};

//   return data.map((topic) => {
//     return [topic.slug, topic.desciption];
//   });

// return [[data[0][args[0]]]];
