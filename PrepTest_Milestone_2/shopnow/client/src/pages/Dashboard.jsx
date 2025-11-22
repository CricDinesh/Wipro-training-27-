import React, { useState } from "react";

export default function Dashboard() {
  const [token, setToken] = useState("");
  const [data, setData] = useState(null);

  // Request token from backend
  const handleLogin = async () => {
    try {
      const res = await fetch("http://localhost:4000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: "admin@test.com",
          password: "12345",
        }),
      });

      const json = await res.json();

      if (json.token) {
        setToken(json.token);
        alert("Token generated successfully!");
      } else {
        alert("Invalid credentials");
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Access protected route with token
  const fetchDashboard = async () => {
    try {
      const res = await fetch("http://localhost:4000/dashboard", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const json = await res.json();
      setData(json);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="card" style={{ maxWidth: "600px", margin: "auto" }}>
      <h2 style={{ marginTop: 0 }}>Dashboard (Protected Route)</h2>

      {/* Button Row */}
      <div style={{ display: "flex", gap: "12px", marginBottom: "20px" }}>
        <button onClick={handleLogin}>Generate Token</button>

        <button onClick={fetchDashboard} disabled={!token}>
          Load Dashboard Data
        </button>
      </div>

      {/* Output Box */}
      <div
        style={{
          background: "#fff",
          padding: "15px 20px",
          borderRadius: "10px",
          boxShadow: "0 4px 14px rgba(0,0,0,0.08)",
        }}
      >
        {data ? (
          <pre style={{ margin: 0 }}>
            {JSON.stringify(data, null, 2)}
          </pre>
        ) : (
          <p style={{ margin: 0, color: "#777" }}>
            No data loaded yet
          </p>
        )}
      </div>
    </div>
  );
}
