// Challenge 5: Modular Routing + Error Handling

const express = require("express");
const logger = require("./middleware/logger");
const bookRoutes = require("./routes/books");

const app = express();
app.use(express.json());
app.use(logger);

// Main routes
app.use("/books", bookRoutes);

// 404 Error
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error("Internal Error:", err.message);
  res.status(500).json({ error: "Internal Server Error" });
});

app.listen(4000, () =>
  console.log("Server running on http://localhost:4000")
);
