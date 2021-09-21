exports.handle400errors = (err, req, res, next) => {
  if (err.status === 400) {
    res.status(400).send({ msg: "Bad request" });
  }
};

exports.handle500errors = (err, req, res, next) => {
  console.log(err);
  res.status(500).send({ msg: "Internal Server Error" });
};
