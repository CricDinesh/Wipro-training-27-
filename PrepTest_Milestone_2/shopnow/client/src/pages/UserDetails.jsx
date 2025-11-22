import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function UserDetails() {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setUser({
        name: "Dinesh Kumar",
        email: "dinesh@example.com",
        role: "Student"
      });
      setLoading(false);
    }, 1500);
  }, [id]);

  return (
    <div className="card">
      <h2>User Details</h2>

      {loading && (
        <div className="loader-container">
          <div className="loader"></div>
          <p>Loading user details...</p>
        </div>
      )}

      {!loading && user && (
        <>
          <p><strong>ID:</strong> {id}</p>
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Role:</strong> {user.role}</p>
        </>
      )}
    </div>
  );
}
