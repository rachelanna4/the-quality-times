const { fetchTopics } = require("../models/topics.model.js");

exports.getTopics = async (req, res, next) => {
  try {
    const topics = await fetchTopics();
    res.status(200).send({ topics: topics });
  } catch (err) {
    next(err);
  }
};
