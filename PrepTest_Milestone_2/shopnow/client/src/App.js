import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import LoginControlled from "./pages/LoginControlled";
import LoginFormik from "./pages/LoginFormik";
import Dashboard from "./pages/Dashboard";
import UserDetails from "./pages/UserDetails";

export default function App() {
  return (
    <div className="container">
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login-controlled" element={<LoginControlled />} />
        <Route path="/login-formik" element={<LoginFormik />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/user/:id" element={<UserDetails />} />
      </Routes>

      <Footer />
    </div>
  );
}