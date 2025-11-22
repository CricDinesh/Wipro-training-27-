import React from "react";

export default function UserCard({ id, status }) {
  return (
    <div
      style={{
        padding: "20px",
        border: "1px solid #ccc",
        borderRadius: "12px",
        background: "#fafafa",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
      }}
    >
      <h2 style={{ marginBottom: "10px", color: "#5c39ff" }}>User Card</h2>
      <p style={{ fontSize: "18px" }}>
        <strong>User ID:</strong> {id}
      </p>
      <p style={{ fontSize: "18px" }}>
        <strong>Status:</strong> {status}
      </p>
    </div>
  );
}
