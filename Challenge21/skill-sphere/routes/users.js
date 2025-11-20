const express = require("express");
const router = express.Router();

let users = [];

// GET /users → List all users
router.get("/", (req, res) => {
  res.json({
    message: "List of all users",
    users,
  });
});

// POST /users → Create a new user
router.post("/", (req, res) => {
  const userData = req.body;
  users.push(userData);

  res.json({
    message: "User created successfully",
    data: userData,
  });
});

module.exports = router;
