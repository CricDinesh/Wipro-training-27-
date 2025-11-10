import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const API = "http://localhost:3001/books";

export default function BookDetails() {
  const { id } = useParams();
  const [book, setBook] = useState(null);

  useEffect(() => {
    fetch(`${API}/${id}`)
      .then((res) => res.json())
      .then((data) => setBook(data));
  }, [id]);

  if (!book) return <p className="loading-text">Loading...</p>;

  return (
    <div className="container fade-in">
      <div className="details-card slide-up">
        <h2>{book.title}</h2>
        <p><strong>Author:</strong> {book.author}</p>
        <p><strong>Category:</strong> {book.category}</p>
        <p className="desc-full">{book.description}</p>

        <div className="btn-container">
          <Link to="/" className="btn outline back-btn">← Back</Link>
        </div>
      </div>
    </div>
  );
}
