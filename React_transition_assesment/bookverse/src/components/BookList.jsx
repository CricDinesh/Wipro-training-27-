import React from "react";
import { Link } from "react-router-dom";

export default function BookList({ books, onDelete }) {
  return (
    <div className="table-container">
      <table className="book-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Title</th>
            <th>Author</th>
            <th>Category</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {books.length > 0 ? (
            books.map((book, index) => (
              <tr key={book.id}>
                <td>{index + 1}</td>
                <td>{book.title}</td>
                <td>{book.author}</td>
                <td>{book.category}</td>
                <td className="desc">{book.description}</td>
                <td>
                  <Link to={`/book/${book.id}`} className="btn small">View</Link>
                  <Link to={`/edit/${book.id}`} className="btn small outline">Edit</Link>
                  <button className="btn small danger" onClick={() => onDelete(book.id)}>Delete</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" style={{ textAlign: "center", padding: "20px" }}>No books found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
