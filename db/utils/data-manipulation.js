exports.fetchData = (data, ...args) => {
  return data.map((dataObj) => {
    return args.map((key) => {
      return dataObj[key];
    });
  });
};
