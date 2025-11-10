import React, { useState, useEffect, memo } from "react";

const DisplayBox = memo(({ color, count }) => {
  console.log("🎨 PureDisplay Re-rendered");
  return (
    <div
      style={{
        backgroundColor: color,
        color: "#fff",
        borderRadius: "12px",
        padding: "20px",
        marginTop: "15px",
        fontWeight: "500",
      }}
    >
      <h3>Live Counter: {count}</h3>
    </div>
  );
});

function PureDisplay() {
  const [count, setCount] = useState(0);
  const [color, setColor] = useState("#2563eb");

  // Increment count automatically every second
  useEffect(() => {
    const timer = setInterval(() => setCount((prev) => prev + 1), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div>
      <DisplayBox color={color} count={count} />
      <button
        className="theme-btn"
        onClick={() =>
          setColor(color === "#2563eb" ? "#10b981" : "#2563eb")
        }
      >
        Toggle Color
      </button>
    </div>
  );
}

export default PureDisplay;
