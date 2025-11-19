// src/components/Header.js
// ⭐ Navbar with Role-Based Tabs
// ⭐ Admin sees: Admin Dashboard
// ⭐ Customer sees: My Bookings
// ⭐ Guests see: Login & Register
// ⭐ Both see: Home, Packages

import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

const Header = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark" style={{ background: "#0056b3" }}>
      <div className="container">

        {/* WEBSITE BRAND */}
        <Link className="navbar-brand fw-bold" to="/">TravelMini</Link>

        {/* TOGGLER */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* MENU ITEMS */}
        <div className="collapse navbar-collapse" id="navbarNav">

          {/* LEFT SIDE LINKS */}
          <ul className="navbar-nav me-auto">

            <li className="nav-item">
              <Link className="nav-link" to="/">Home</Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/packages">Packages</Link>
            </li>

            {/* ⭐ CUSTOMER ONLY TAB */}
            {user?.role === "customer" && (
              <li className="nav-item">
                <Link className="nav-link" to="/dashboard">My Bookings</Link>
              </li>
            )}

            {/* ⭐ ADMIN ONLY TAB */}
            {user?.role === "admin" && (
              <li className="nav-item">
                <Link className="nav-link" to="/admin">Admin Dashboard</Link>
              </li>
            )}

          </ul>

          {/* RIGHT SIDE AUTH OPTIONS */}
          <ul className="navbar-nav">

            {/* IF LOGGED IN */}
            {user ? (
              <>
                {/* USER NAME */}
                <li className="nav-item">
                  <span className="nav-link fw-semibold">Hi, {user.name}</span>
                </li>

                {/* LOGOUT BUTTON */}
                <li className="nav-item">
                  <button
                    onClick={logout}
                    className="btn btn-outline-light btn-sm ms-2"
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                {/* IF LOGGED OUT */}
                <li className="nav-item">
                  <Link className="nav-link" to="/login">Login</Link>
                </li>

                <li className="nav-item">
                  <Link className="nav-link" to="/register">Register</Link>
                </li>
              </>
            )}

          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
