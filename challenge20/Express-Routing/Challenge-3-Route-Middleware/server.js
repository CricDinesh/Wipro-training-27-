/**
 * Challenge 3: Route Level Middleware
 * -----------------------------------
 * Uses a custom middleware to validate the course ID before the
 * main route logic executes. Helps maintain clean and safe routes.
 */

const express = require("express");
const validateCourseId = require("./middleware/validateCourseId");

const app = express();
const PORT = 4000;

// Apply route middleware only on this specific route
app.get("/courses/:id", validateCourseId, (req, res) => {
  const id = req.params.id;

  const courseDetails = {
    id,
    name: "React Mastery",
    duration: "6 weeks"
  };

  res.json(courseDetails);
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
