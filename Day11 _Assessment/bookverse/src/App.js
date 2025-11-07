import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import BookList from "./components/BookList";
import "./App.css";

function App() {
  return (
    <div className="App container mt-4">
      <header className="mb-4">
        <h1 className="text-primary">BookVerse</h1>
        <p className="text-secondary">Discover books and their authors</p>
      </header>
      <BookList />
    </div>
  );
}

export default App;
