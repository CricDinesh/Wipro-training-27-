// Challenge 4: CRUD Operations
// -----------------------------

const express = require("express");
const app = express();
app.use(express.json());

const PORT = 4000;

// In-memory book list
let books = [
  { id: 1, title: "1984", author: "Orwell" },
  { id: 2, title: "The Alchemist", author: "Coelho" }
];

// GET all books
app.get("/books", (req, res) => {
  res.json(books);
});

// POST add a new book
app.post("/books", (req, res) => {
  const { title, author } = req.body;

  if (!title || !author)
    return res.status(400).json({ error: "Title and author are required" });

  const newBook = {
    id: books.length + 1,
    title,
    author
  };

  books.push(newBook);
  res.status(201).json(newBook);
});

// PUT update book
app.put("/books/:id", (req, res) => {
  const book = books.find(b => b.id == req.params.id);
  if (!book) return res.status(404).json({ error: "Book not found" });

  book.title = req.body.title || book.title;
  book.author = req.body.author || book.author;

  res.json(book);
});

// DELETE book
app.delete("/books/:id", (req, res) => {
  books = books.filter(b => b.id != req.params.id);
  res.json({ message: "Book deleted" });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
