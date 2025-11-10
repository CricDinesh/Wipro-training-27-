import React, { useState, useEffect } from "react";
import { Routes, Route, Link, useNavigate, useParams } from "react-router-dom";
import BookList from "./components/BookList";
import BookDetails from "./components/BookDetails";
import RenderMessage from "./components/RenderMessage";
import withLoader from "./components/withLoader";

const API = "http://localhost:3001/books";

/* ---------- HOME PAGE ---------- */
function Home() {
  const [books, setBooks] = useState([]);
  const [query, setQuery] = useState("");

  const fetchBooks = async () => {
    const res = await fetch(API);
    const data = await res.json();
    setBooks(data);
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this book?")) {
      await fetch(`${API}/${id}`, { method: "DELETE" });
      fetchBooks();
    }
  };

  const filtered = books.filter(
    (b) =>
      b.title.toLowerCase().includes(query.toLowerCase()) ||
      b.author.toLowerCase().includes(query.toLowerCase()) ||
      b.category.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="container fade-in">
      <div className="top-bar">
        <Link to="/" className="logo">BookVerse</Link>
        <div className="tabs">
          <Link to="/" className="tab">Home</Link>
          <Link to="/add" className="tab">Add Book</Link>
        </div>
        <input
          type="text"
          className="search"
          placeholder="Search books..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      <RenderMessage>
        {({ message }) => <p className="info-text">{message}</p>}
      </RenderMessage>

      <BookList books={filtered} onDelete={handleDelete} />
    </div>
  );
}

/* ---------- ADD BOOK ---------- */
function AddBook() {
  const [form, setForm] = useState({ title: "", author: "", category: "", description: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch(API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    navigate("/");
  };

  return (
    <div className="container fade-in">
      <div className="form-card">
        <h2>Add Book</h2>
        <form onSubmit={handleSubmit} className="form">
          <input placeholder="Title" required onChange={(e) => setForm({ ...form, title: e.target.value })} />
          <input placeholder="Author" required onChange={(e) => setForm({ ...form, author: e.target.value })} />
          <input placeholder="Category" required onChange={(e) => setForm({ ...form, category: e.target.value })} />
          <textarea placeholder="Description" required onChange={(e) => setForm({ ...form, description: e.target.value })}></textarea>
          <div>
            <button type="submit" className="btn">Add</button>
            <Link to="/" className="btn outline">Cancel</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

/* ---------- EDIT BOOK ---------- */
function EditBook() {
  const { id } = useParams();
  const [form, setForm] = useState({ title: "", author: "", category: "", description: "" });
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${API}/${id}`)
      .then((res) => res.json())
      .then((data) => setForm(data));
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch(`${API}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    navigate("/");
  };

  return (
    <div className="container fade-in">
      <div className="form-card">
        <h2>Edit Book</h2>
        <form onSubmit={handleSubmit} className="form">
          <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
          <input value={form.author} onChange={(e) => setForm({ ...form, author: e.target.value })} />
          <input value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} />
          <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })}></textarea>
          <div>
            <button className="btn">Save</button>
            <Link to="/" className="btn outline">Cancel</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

const HomeWithLoader = withLoader(Home);

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomeWithLoader />} />
        <Route path="/book/:id" element={<BookDetails />} />
        <Route path="/add" element={<AddBook />} />
        <Route path="/edit/:id" element={<EditBook />} />
      </Routes>
      <footer>© 2025 BookVerse | Created by Student</footer>
    </>
  );
}
