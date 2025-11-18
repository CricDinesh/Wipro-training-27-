// Challenge 2: Routing & Query Parameters
// ---------------------------------------

const express = require("express");
const app = express();
const PORT = 4000;

// /products?name=Laptop
app.get("/products", (req, res) => {
  const { name } = req.query;

  if (!name) {
    return res.send("Please provide a product name");
  }

  res.json({ query: name });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
