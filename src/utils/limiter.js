const rateLimit = require("express-rate-limit");
const slowDown = require("express-slow-down");

// Enable if you're behind a reverse proxy (Heroku, Bluemix, AWS ELB, Nginx, etc)
// see https://expressjs.com/en/guide/behind-proxies.html
// app.set('trust proxy', 1);
const limiter = rateLimit({
  windowMs: 30 * 1000,
  max: 3, // limit each IP to 100 requests per windowMs
});
//  apply to all requests
// app.use(limiter);

const speedLimiter = slowDown({
  windowMs: 30 * 1000,
  delayAfter: 1,
  delayMs: 500,
});

//  apply to all requests
// app.use(speedLimiter);

module.exports = { limiter, speedLimiter };
