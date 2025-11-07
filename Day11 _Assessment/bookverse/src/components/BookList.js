import React, { useState, useRef } from "react";
import BookCard from "./BookCard";
import AuthorInfo from "./AuthorInfo";
import "./BookList.css";

const BookList = () => {
  const [selectedAuthor, setSelectedAuthor] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState("grid");
  const searchRef = useRef(null);

  const books = [
    { id: 1, title: "The Alchemist", author: "Paulo Coelho", price: 15 },
    { id: 2, title: "1984", author: "George Orwell", price: 12 },
    { id: 3, title: "The Hobbit", author: "J.R.R. Tolkien", price: 18 },
    { id: 4, title: "To Kill a Mockingbird", author: "Harper Lee", price: 14 },
    { id: 5, title: "Pride and Prejudice", author: "Jane Austen", price: 16 },
  ];

  const authorDetails = {
    "Paulo Coelho": {
      bio: "Brazilian novelist best known for The Alchemist.",
      topBooks: ["The Pilgrimage", "Brida", "The Valkyries"],
    },
    "George Orwell": {
      bio: "English novelist famous for dystopian works.",
      topBooks: ["Animal Farm", "Homage to Catalonia", "Down and Out in Paris and London"],
    },
    "J.R.R. Tolkien": {
      bio: "English author known for high fantasy works.",
      topBooks: ["The Lord of the Rings", "The Silmarillion", "Unfinished Tales"],
    },
    "Harper Lee": {
      bio: "American novelist best known for To Kill a Mockingbird.",
      topBooks: ["Go Set a Watchman", "The Mockingbird Next Door", "Love—In Other Words"],
    },
    "Jane Austen": {
      bio: "English novelist known for her romantic fiction.",
      topBooks: ["Emma", "Sense and Sensibility", "Mansfield Park"],
    },
  };

  const handleBookClick = (author) => {
    setSelectedAuthor(authorDetails[author]);
  };

  const handleFocusSearch = () => {
    if (searchRef.current) {
      searchRef.current.focus();
    }
  };

  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="book-list container">
      <div className="controls mb-3 d-flex flex-wrap justify-content-between align-items-center">
        <input
          type="text"
          ref={searchRef}
          placeholder="Search by title..."
          className="form-control w-50"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <div>
          <button className="btn btn-outline-primary mx-1" onClick={() => setViewMode("grid")}>
            Grid
          </button>
          <button className="btn btn-outline-secondary mx-1" onClick={() => setViewMode("list")}>
            List
          </button>
          <button className="btn btn-success mx-1" onClick={handleFocusSearch}>
            Focus Search
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
            onClick={() => handleBookClick(book.author)}
            viewMode={viewMode}
          />
        ))}
      </div>

      {selectedAuthor && <AuthorInfo author={selectedAuthor} />}
    </div>
  );
};

export default BookList;
