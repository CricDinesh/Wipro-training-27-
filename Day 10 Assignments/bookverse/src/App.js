import React from "react";
import BookList from "./components/BookList";
import "./App.css";

function App() {
  return (
    <div className="App">
      <header>
        <h1>BookVerse</h1>
        <p>Explore our collection of featured books!</p>
      </header>
      <BookList />
    </div>
  );
}

export default App;
