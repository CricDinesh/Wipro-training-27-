import React, { useState, useEffect } from "react";

export default function Counter() {
  const [count, setCount] = useState(0);

  // useEffect updates the page title whenever count changes
  useEffect(() => {
    document.title = `You clicked ${count} times`;
  }, [count]);

  return (
    <div style={{ padding: 20 }}>
      <h2>Counter Example</h2>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click Me</button>
    </div>
  );
}
