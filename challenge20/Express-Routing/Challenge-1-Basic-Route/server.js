/**
 * Challenge 1: Basic Route Setup
 * ------------------------------
 * This file sets up a simple Express server that returns a welcome
 * message on the root route. Used to verify API is running correctly.
 */

const express = require("express");
const app = express();
const PORT = 4000;

// Root route → confirms server is running
app.get("/", (req, res) => {
  res.send("Welcome to SkillSphere LMS API");
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
