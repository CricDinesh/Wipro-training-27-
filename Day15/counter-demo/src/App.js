import React from "react";
import Counter from "./components/Counter";
import Posts from "./components/Posts";

export default function App() {
  return (
    <div style={{ padding: 20 }}>
      <h1>React Hooks Demo</h1>
      <Counter />
      <hr />
      <Posts />
    </div>
  );
}
