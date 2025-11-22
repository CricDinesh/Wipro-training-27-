import React from "react";
import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <nav
      style={{
        background: "#ffffff",
        padding: "18px 30px",
        borderRadius: "14px",
        marginBottom: "30px",
        display: "flex",
        justifyContent: "center",
        gap: "40px",
        boxShadow: "0 6px 22px rgba(0,0,0,0.10)",
        position: "sticky",
        top: "10px",
        zIndex: 10,
      }}
    >
      <NavLink
        to="/"
        className={({ isActive }) =>
          isActive ? "nav-active" : "nav-link"
        }
      >
        Home
      </NavLink>

      <NavLink
        to="/dashboard"
        className={({ isActive }) =>
          isActive ? "nav-active" : "nav-link"
        }
      >
        Dashboard (Protected)
      </NavLink>

      <NavLink
        to="/login-controlled"
        className={({ isActive }) =>
          isActive ? "nav-active" : "nav-link"
        }
      >
        Login (Controlled)
      </NavLink>

      <NavLink
        to="/login-formik"
        className={({ isActive }) =>
          isActive ? "nav-active" : "nav-link"
        }
      >
        Login (Formik)
      </NavLink>
    </nav>
  );
}
