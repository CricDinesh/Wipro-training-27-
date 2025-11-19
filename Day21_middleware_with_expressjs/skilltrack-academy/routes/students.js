const express = require("express");
const router = express.Router();
const validateStudent = require("../middlewares/validateStudent");

// temporary database
let students = [
  { id: 1, name: "Arjun", email: "arjun@example.com", progress: 85 },
  { id: 2, name: "Meera", email: "meera@example.com", progress: 92 }
];

// display students (renders EJS page)
router.get("/", (req, res) => {
  res.render("students", { students });
});

// add new student (uses validation middleware)
router.post("/", validateStudent, (req, res) => {
  const { name, email } = req.body;

  const newStudent = {
    id: students.length + 1,
    name,
    email,
    progress: 0
  };

  students.push(newStudent);
  res.json({ success: true, data: newStudent });
});

module.exports = router;
