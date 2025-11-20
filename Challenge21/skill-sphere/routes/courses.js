const express = require("express");
const router = express.Router();

// Sample list of courses
let courses = [
  { id: 1, title: "Web Development", duration: "3 Months" },
  { id: 2, title: "Python Programming", duration: "2 Months" },
  { id: 3, title: "Data Science Basics", duration: "4 Months" },
];

// GET /courses → Render EJS
router.get("/", (req, res) => {
  res.render("courses", { courses });
});

module.exports = router;
