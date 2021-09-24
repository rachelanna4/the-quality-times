const express = require("express");
const usersRouter = express.Router();
const { getUsers } = require("../controllers/users.controller.js");

usersRouter.get("/", getUsers);

module.exports = usersRouter;
