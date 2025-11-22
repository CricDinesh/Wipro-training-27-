
// Rate Limiter Middleware (5 requests per minute)
// Prevents API abuse

const rateLimit = require("express-rate-limit");

const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 5, // Max requests
  message: { error: "Too many requests" }
});

module.exports = limiter;
