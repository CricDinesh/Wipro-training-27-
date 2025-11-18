/**
 * Challenge 2: Dynamic Routing
 * -----------------------------
 * This challenge demonstrates how route parameters work.
 * The API returns specific course details based on the ID provided 
 * in the URL.
 */

const express = require("express");
const app = express();
const PORT = 4000;

// Dynamic route: returns course info using the route parameter :id
app.get("/courses/:id", (req, res) => {
  const courseId = req.params.id;

  const courseDetails = {
    id: courseId,
    name: "React Mastery",
    duration: "6 weeks"
  };

  res.json(courseDetails);
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
