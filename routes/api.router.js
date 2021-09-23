const express = require("express");
const apiRouter = express.Router();

const topicsRouter = require("./topics.router.js");
const articlesRouter = require("./articles.router.js");

const { getEndpoints } = require("../controllers/endpoints.controller.js");

apiRouter.use("/topics", topicsRouter);
apiRouter.use("/articles", articlesRouter);
apiRouter.get("/", getEndpoints);

module.exports = apiRouter;
