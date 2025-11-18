// Custom middleware that logs every request with timestamp.

module.exports = (req, res, next) => {
  const time = new Date().toISOString();
  console.log(`[${time}] ${req.method} ${req.url}`);
  next();
};
