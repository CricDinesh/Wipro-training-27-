import React from "react";

const HeavyPage = () => {
  return (
    <div style={{ marginTop: "30px" }}>
      <h2>Heavy Page</h2>
      <p>This page was lazy-loaded dynamically!</p>
      <img
        src="https://picsum.photos/800/300"
        alt="Random Placeholder"
        style={{ borderRadius: "10px", marginTop: "20px" }}
      />
    </div>
  );
};

export default HeavyPage;
