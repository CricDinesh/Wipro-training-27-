const express = require("express");
const router = express.Router();

// In-memory book list
let books = [
  { id: 1, title: "1984", author: "Orwell" },
  { id: 2, title: "The Alchemist", author: "Coelho" }
];

// GET all books
router.get("/", (req, res) => res.json(books));

// GET by ID
router.get("/:id", (req, res) => {
  const book = books.find(b => b.id == req.params.id);
  if (!book) return res.status(404).json({ error: "Book not found" });
  res.json(book);
});

// POST add book
router.post("/", (req, res) => {
  const { title, author } = req.body;
  if (!title || !author)
    return res.status(400).json({ error: "Title and author required" });

  const newBook = { id: books.length + 1, title, author };
  books.push(newBook);
  res.status(201).json(newBook);
});

// PUT update
router.put("/:id", (req, res) => {
  const book = books.find(b => b.id == req.params.id);
  if (!book) return res.status(404).json({ error: "Book not found" });

  book.title = req.body.title || book.title;
  book.author = req.body.author || book.author;

  res.json(book);
});

// DELETE
router.delete("/:id", (req, res) => {
  books = books.filter(b => b.id != req.params.id);
  res.json({ message: "Book removed" });
});

module.exports = router;
