const express = require("express");
const axios = require("axios");

const limiter = require("../utils/limiter");

const router = express.Router();

const BASE_URL = "https://api.nasa.gov/insight_weather/?";

let cachedData;
let cacheTime;

//put them on db
// auth
const apiKeys = new Map();
apiKeys.set("12345", true);
// apiKeys.set("3333", true);

router.get(
  "/",
  (req, res, next) => {
    const apiKey = req.get("X-API-KEY");
    const key = Object.keys(req.query)[0];
    const value = Object.values(req.query)[0];

    if (apiKeys.has(apiKey) || apiKeys.has(value)) {
      next();
    } else {
      const error = new Error("Invalid API KEY");
      next(error);
    }
  },
  async (req, res, next) => {
    // in memory cache
    if (cacheTime && cacheTime > Date.now() - 10 * 1000) {
      return res.json(cachedData);
    }

    try {
      const params = new URLSearchParams({
        api_key: process.env.NASA_API_KEY,
        feedtype: "json",
        ver: "1.0",
      });

      const { data } = await axios.get(`${BASE_URL}${params}`);
      cachedData = data;
      cacheTime = Date.now();
      data.cacheTime = cacheTime;
      return res.json(data);
    } catch (error) {
      return next(error);
    }
  }
);

module.exports = router;
