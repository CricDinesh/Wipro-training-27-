// Challenge 3: Middleware
// -------------------------

const express = require("express");
const logger = require("./middleware/logger");

const app = express();
const PORT = 4000;

app.use(logger);

app.get("/", (req, res) => {
  res.send("Middleware demo server");
});

app.get("/products", (req, res) => {
  res.send("Products route");
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
