import React from "react";
import "./Common.css";

export default function CourseDetails() {
  // Simulate heavy component (but synchronous). Real app would import data or heavy modules.
  return (
    <div className="module">
      <h4>React Advanced Patterns</h4>
      <p>A compact course about lazy loading, code splitting, and performance optimizations.</p>
      <ul>
        <li>Code splitting with <code>React.lazy</code> &amp; <code>Suspense</code></li>
        <li>Performance patterns</li>
        <li>Testing and tools</li>
      </ul>
    </div>
  );
}
