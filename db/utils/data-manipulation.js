exports.fetchData = (data, ...args) => {
  return data.map((dataObj) => {
    return args.map((key) => {
      return dataObj[key];
    });
  });
};

exports.createStringOfLength = (length) => {
  let string = "A";

  return string.repeat(length);
};
