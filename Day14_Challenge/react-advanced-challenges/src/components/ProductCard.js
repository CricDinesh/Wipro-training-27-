import React, { useState } from "react";
import "./Common.css";

/**
 * ProductCard demonstrates a component that may throw during rendering
 * (simulated via a "Crash" toggle). The ErrorBoundary above will catch it.
 */
export default function ProductCard() {
  const [shouldCrash, setShouldCrash] = useState(false);

  if (shouldCrash) {
    // Simulate a rendering error
    throw new Error("Simulated ProductCard render error");
  }

  return (
    <div className="product-card">
      <h4>Product — Clean UI Component</h4>
      <p>Everything is fine. Toggle below to simulate a crash and see ErrorBoundary.</p>
      <div className="row">
        <button onClick={() => setShouldCrash(true)}>Simulate Crash</button>
        <button onClick={() => setShouldCrash(false)} className="secondary">Reset</button>
      </div>
    </div>
  );
}
