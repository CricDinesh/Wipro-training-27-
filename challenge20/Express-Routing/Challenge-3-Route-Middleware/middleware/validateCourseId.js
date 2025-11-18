/**
 * Route Middleware: validateCourseId
 * ----------------------------------
 * Ensures the course ID passed in the URL is numeric.
 * If invalid, the request is stopped early,
 * preventing unnecessary route execution.
 */

module.exports = (req, res, next) => {
  const { id } = req.params;

  // Check if ID is NOT numeric
  if (isNaN(id)) {
    return res.status(400).json({ error: "Invalid course ID" });
  }

  // Proceed to main route handler
  next();
};
