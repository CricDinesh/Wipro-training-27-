import React from "react";
import "./BookCard.css";

const BookCard = ({ title, author, price, viewMode }) => {
  return (
    <div className={`book-card ${viewMode}`}>
      <h3>{title}</h3>
      <p><strong>Author:</strong> {author}</p>
      <p><strong>Price:</strong> ${price}</p>
    </div>
  );
};

export default BookCard;
