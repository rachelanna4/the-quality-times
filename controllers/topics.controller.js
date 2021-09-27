const { fetchTopics, addTopic } = require("../models/topics.model.js");

exports.getTopics = async (req, res, next) => {
  try {
    const topics = await fetchTopics();
    res.status(200).send({ topics: topics });
  } catch (err) {
    next(err);
  }
};

exports.postTopic = async (req, res, next) => {
  const postRequest = req.body;
  try {
    const postedTopic = await addTopic(postRequest);
    res.status(201).send({ topic: postedTopic });
  } catch (err) {
    next(err);
  }
};
