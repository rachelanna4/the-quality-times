const express = require("express");
const apiRouter = express.Router();

const topicsRouter = require("./topics.router.js");
const articlesRouter = require("./articles.router.js");

apiRouter.use("/topics", topicsRouter);
apiRouter.use("/articles", articlesRouter);

module.exports = apiRouter;
