import React from "react";
import PropTypes from "prop-types";
import "./BookCard.css";

const BookCard = ({ title, author, price, onClick, viewMode }) => {
  return (
    <div
      className={`card mb-3 shadow-sm book-card ${viewMode}`}
      onClick={onClick}
      style={{ cursor: "pointer" }}
    >
      <div className="card-body">
        <h5 className="card-title text-primary">{title}</h5>
        <p className="card-text">
          <strong>Author:</strong> {author}
        </p>
        <p className="card-text">
          <strong>Price:</strong> ${price}
        </p>
      </div>
    </div>
  );
};

BookCard.propTypes = {
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
  viewMode: PropTypes.string.isRequired,
};

export default BookCard;
