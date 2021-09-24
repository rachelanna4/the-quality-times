const { fetchUsers } = require("../models/users.model.js");

exports.getUsers = async (req, res, next) => {
  try {
    const userData = await fetchUsers();
    res.status(200).send({ users: userData });
  } catch (err) {
    next(err);
  }
};

// #### **GET /api/users**

// Responds with:

// - an array of objects, each object should have the following property:
//   - `username`

// ---
