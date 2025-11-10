import React, { useState } from "react";
import TodoActions from "../actions/TodoActions";
import "./AddTodo.css";

const AddTodo = () => {
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim() !== "") {
      TodoActions.addTodo(text);
      setText("");
    }
  };

  return (
    <form className="add-todo" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter a new todo..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button type="submit">Add</button>
    </form>
  );
};

export default AddTodo;
