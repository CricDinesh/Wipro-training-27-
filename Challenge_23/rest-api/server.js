
// Main Server Entry File

const express = require("express");
const cors = require("cors");
const courseRoutes = require("./routes/courseRoutes");
const errorHandler = require("./middleware/errorHandler");

const app = express();
const PORT = 5000;

// Enable CORS for API testing
app.use(cors());

// Parse JSON body data
app.use(express.json());

// Base API versioning
app.use("/api/v1/courses", courseRoutes);

// Centralized error handler middleware
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(` Server running on http://localhost:${PORT}`);
});
