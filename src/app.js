const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");

const { limiter, speedLimiter } = require("./utils/limiter");

require("dotenv").config();

const middlewares = require("./middlewares");
const api = require("./api");

const app = express();
app.set("trust proxy", 1);

app.use(morgan("dev"));
app.use(helmet());
app.use(cors());
app.use(express.json());

app.get("/", speedLimiter, limiter, (req, res) => {
  res.json({
    message: "🦄🌈✨👋🌎🌍🌏✨🌈🦄",
  });
});

app.use("/api/v1", api);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

module.exports = app;
