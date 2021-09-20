const express = require("express");

const app = express();
app.use(express.json());

const apiRouter = require("./routes/api.router.js");

app.use("/api", apiRouter);
