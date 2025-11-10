// src/App.js
import React, { useState, useEffect } from "react";
import Dispatcher from "./Dispatcher";
import "./App.css";

//  Store
const TodoStore = {
  todos: [],
  listeners: [],
  logListeners: [],

  getTodos() {
    return this.todos;
  },

  addChangeListener(callback) {
    this.listeners.push(callback);
  },

  emitChange() {
    this.listeners.forEach((callback) => callback());
  },

  addLogListener(callback) {
    this.logListeners.push(callback);
  },

  emitLog(message) {
    console.log(message);
    this.logListeners.forEach((cb) => cb(message));
  },

  handleAction(action) {
    this.emitLog("[Store] Received action: " + action.type);
    switch (action.type) {
      case "ADD_TODO":
        this.todos.push(action.payload);
        this.emitLog(`[Store] Todo added: "${action.payload}"`);
        this.emitChange();
        break;
      default:
        break;
    }
  },
};

// Register store with Dispatcher
Dispatcher.register(TodoStore.handleAction.bind(TodoStore));

//  Action
function addTodoAction(text) {
  TodoStore.emitLog(`[Action] Dispatching ADD_TODO: "${text}"`);
  Dispatcher.dispatch({
    type: "ADD_TODO",
    payload: text,
  });
}

//  Modify Dispatcher to also log
Dispatcher.dispatch = function (action) {
  TodoStore.emitLog("[Dispatcher] Broadcasting action: " + JSON.stringify(action));
  this.callbacks.forEach((callback) => callback(action));
};

//  React View
export default function App() {
  const [todos, setTodos] = useState(TodoStore.getTodos());
  const [input, setInput] = useState("");
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const addLog = (message) => setLogs((prev) => [...prev, message]);

    const updateTodos = () => {
      setTodos([...TodoStore.getTodos()]);
      addLog("[View] UI updated");
    };

    TodoStore.addChangeListener(updateTodos);
    TodoStore.addLogListener(addLog);
  }, []);

  const handleAdd = () => {
    if (input.trim() !== "") {
      addTodoAction(input);
      setInput("");
    }
  };

  return (
    <div className="app-container">
      <h1>Flux Todo List (Live Cycle)</h1>
      <div className="input-area">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter todo"
        />
        <button onClick={handleAdd}>Add</button>
      </div>

      <ul className="todo-list">
        {todos.map((todo, i) => (
          <li key={i}>{todo}</li>
        ))}
      </ul>

      <div className="log-box">
        <h3>Live Flux Cycle Log:</h3>
        <div className="log-content">
          {logs.map((msg, index) => (
            <div key={index}>{msg}</div>
          ))}
        </div>
      </div>
    </div>
  );
}
