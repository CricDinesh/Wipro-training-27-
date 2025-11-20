const express = require("express");
const app = express();
const path = require("path");

// Custom logger middleware
const logger = require("./middleware/logger");

// Routers
const userRoutes = require("./routes/users");
const courseRoutes = require("./routes/courses");

// -----------------------------
// Global Middlewares
// -----------------------------

app.use(logger);                     // Challenge 1: custom logger
app.use(express.json());             // Challenge 2: JSON parsing
app.use(express.urlencoded({ extended: true })); // Form-data parsing

// Set EJS as template engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// -----------------------------
// Routes
// -----------------------------
app.use("/users", userRoutes);
app.use("/courses", courseRoutes);

// -----------------------------
// Start Server
// -----------------------------
const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
