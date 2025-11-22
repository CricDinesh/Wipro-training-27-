import React, { useState, useRef } from "react";

export default function LoginControlled() {
  const [username, setUsername] = useState("");
  const passwordRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();

    const passwordValue = passwordRef.current
      ? passwordRef.current.value
      : "";

    console.log("Username:", username);
    console.log("Password:", passwordValue);

    alert("Form submitted! Check console.");
  };

  return (
    <div className="card" style={{ maxWidth: "420px", margin: "auto" }}>
      <h2 style={{ marginTop: 0 }}>Login (Controlled + Uncontrolled)</h2>

      <form onSubmit={handleSubmit}>
        <label>Username</label>
        <input
          type="text"
          placeholder="Enter your username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <label>Password</label>
        <input
          type="password"
          placeholder="Enter your password"
          ref={passwordRef}
        />

        <button type="submit" style={{ width: "100%" }}>
          Login
        </button>
      </form>
    </div>
  );
}
