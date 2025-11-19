// src/pages/ManagePackages.js
// ⭐ Admin-only package CRUD page
// ⭐ Clean layout, no errors, stable rendering

import React, { useEffect, useState } from "react";
import API from "../api/api";
import { Link } from "react-router-dom";

const ManagePackages = () => {
  const [data, setData] = useState([]);

  // Load all packages
  const loadPackages = () => {
    API.get("/packages")
      .then((res) => setData(res.data))
      .catch(console.error);
  };

  useEffect(() => {
    loadPackages();
  }, []);

  // Delete Package
  const del = async (id) => {
    if (!window.confirm("Delete package?")) return;

    await API.delete(`/packages/${id}`);
    loadPackages(); // reload list
  };

  return (
    <div className="container my-4">
      <div className="d-flex justify-content-between align-items-center">
        <h2 className="fw-bold">Manage Packages</h2>
        <Link to="/admin/packages/new" className="btn btn-success">
          + Add Package
        </Link>
      </div>

      {/* PACKAGE LIST */}
      <div className="mt-4">
        {data.length === 0 && <p>No packages found.</p>}

        {data.map((p) => (
          <div
            key={p.id}
            className="card shadow-sm mb-3 p-3 d-flex flex-row justify-content-between align-items-center"
          >
            <div>
              <h5 className="fw-bold">{p.title}</h5>
              <small className="text-muted">
                ₹{p.price} • {p.duration}
              </small>
            </div>

            <div>
              <Link
                to={`/admin/packages/edit/${p.id}`}
                className="btn btn-primary btn-sm me-2"
              >
                Edit
              </Link>

              <button
                onClick={() => del(p.id)}
                className="btn btn-danger btn-sm"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManagePackages;
