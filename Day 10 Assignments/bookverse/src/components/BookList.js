import React, { useState } from "react";
import BookCard from "./BookCard";
import "./BookList.css";

const BookList = () => {
  const [viewMode, setViewMode] = useState("grid");
  const [searchTerm, setSearchTerm] = useState("");

  const books = [
    { id: 1, title: "The Alchemist", author: "Paulo Coelho", price: 15 },
    { id: 2, title: "1984", author: "George Orwell", price: 12 },
    { id: 3, title: "The Hobbit", author: "J.R.R. Tolkien", price: 18 },
    { id: 4, title: "To Kill a Mockingbird", author: "Harper Lee", price: 14 },
    { id: 5, title: "Pride and Prejudice", author: "Jane Austen", price: 16 },
  ];

  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="book-list">
      <h2>Featured Books</h2>

      <div className="controls">
        <input
          type="text"
          placeholder="Search by title..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <div className="view-buttons">
          <button
            className={viewMode === "grid" ? "active" : ""}
            onClick={() => setViewMode("grid")}
          >
            Grid View
          </button>
          <button
            className={viewMode === "list" ? "active" : ""}
            onClick={() => setViewMode("list")}
          >
            List View
          </button>
        </div>
      </div>

      <div className={`books-container ${viewMode}`}>
        {filteredBooks.map((book) => (
          <BookCard
            key={book.id}
            title={book.title}
            author={book.author}
            price={book.price}
            viewMode={viewMode}
          />
        ))}
      </div>
    </div>
  );
};

export default BookList;
