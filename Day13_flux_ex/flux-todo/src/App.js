import React from "react";
import AddTodo from "./components/AddTodo";
import TodoList from "./components/TodoList";
import "./App.css";

const App = () => {
  return (
    <div className="app-container">
      <h1>Flux Todo App</h1>
      <AddTodo />
      <TodoList />
    </div>
  );
};

export default App;
