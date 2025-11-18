// index.js
const express = require("express");
const logger = require("./middleware/logger");
const studentRoutes = require("./routes/students");

const app = express();

// Middlewares
app.use(express.json());
app.use(logger);

// Main API Route
app.use("/api/students", studentRoutes);

// Start Server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
