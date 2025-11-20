// Simple custom logger middleware
// Logs the HTTP method, the requested URL, and the timestamp

module.exports = function logger(req, res, next) {
  const time = new Date().toISOString();
  console.log(`[${req.method}] ${req.url} at ${time}`);
  next(); // Continue to next middleware/route
};
