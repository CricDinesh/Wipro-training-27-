// Challenge 1: Basic Express Server
// ----------------------------------
// Creates a simple server that responds with a welcome message.

const express = require("express");
const app = express();
const PORT = 4000;

// Default route
app.get("/", (req, res) => {
  res.send("Welcome to Express Server");
});

// Status route (Bonus)
app.get("/status", (req, res) => {
  res.json({ server: "running", uptime: "OK" });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
