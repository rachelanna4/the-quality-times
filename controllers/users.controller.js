const { fetchUsers, fetchUserByUsername } = require("../models/users.model.js");

exports.getUsers = async (req, res, next) => {
  try {
    const userData = await fetchUsers();
    res.status(200).send({ users: userData });
  } catch (err) {
    next(err);
  }
};

exports.getUserByUsername = async (req, res, next) => {
  const { username } = req.params;
  try {
    const userData = await fetchUserByUsername(username);
    res.status(200).send(userData);
  } catch (err) {
    next(err);
  }
};
