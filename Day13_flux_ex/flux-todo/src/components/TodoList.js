import React, { useEffect, useState } from "react";
import TodoStore from "../stores/TodoStore";
import "./TodoList.css";

const TodoList = () => {
  const [todos, setTodos] = useState(TodoStore.getAll());

  useEffect(() => {
    const handleChange = () => setTodos([...TodoStore.getAll()]);
    TodoStore.on("change", handleChange);
    return () => TodoStore.removeListener("change", handleChange);
  }, []);

  return (
    <div className="todo-list">
      <h2>Todo List</h2>
      {todos.length === 0 ? (
        <p className="empty">No todos yet. Add one!</p>
      ) : (
        <ul>
          {todos.map((todo) => (
            <li key={todo.id}>{todo.text}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TodoList;
