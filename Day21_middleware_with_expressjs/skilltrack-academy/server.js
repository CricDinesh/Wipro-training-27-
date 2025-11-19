const express = require("express");
const app = express();
const morgan = require("morgan");

// Middlewares
const requestLogger = require("./middlewares/requestLogger");
const notFound = require("./middlewares/notFound");
const errorHandler = require("./middlewares/errorHandler");

// Routes
const studentRoutes = require("./routes/students");

// Set view engine
app.set("view engine", "ejs");

// Built-in middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Custom logging middleware
app.use(requestLogger);

// Morgan logging middleware (development mode)
app.use(morgan("dev"));

// Home route
app.get("/", (req, res) => {
  res.render("home");
});

// Student routes
app.use("/students", studentRoutes);

// 404 middleware
app.use(notFound);

// Error-handling middleware (must be last)
app.use(errorHandler);

// Start server
app.listen(4000, () => {
  console.log("Server running at http://localhost:4000");
});
