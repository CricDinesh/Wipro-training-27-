// src/AppRouter.js
// ⭐ Full routing system with admin-protected routes
// ⭐ Customers cannot access admin dashboard or package management
// ⭐ Uses PrivateRoute for role-based authentication

import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";
import Chatbot from "./components/Chatbot";

import Home from "./pages/Home";
import Packages from "./pages/Packages";
import PackageDetails from "./pages/PackageDetails";
import BookingForm from "./pages/BookingForm";

import Login from "./pages/Login";
import Register from "./pages/Register";

import CustomerDashboard from "./pages/CustomerDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import ManagePackages from "./pages/ManagePackages";
import PackageForm from "./pages/PackageForm";

import API from "./api/api";
import PrivateRoute from "./components/PrivateRoute";
import { AuthProvider } from "./contexts/AuthContext";

const AppRouter = () => {
  const [packages, setPackages] = useState([]);

  // load packages for Home page
  useEffect(() => {
    API.get("/packages")
      .then((res) => setPackages(res.data))
      .catch(() => setPackages([]));
  }, []);

  return (
    <AuthProvider>
      <BrowserRouter>

        <div className="d-flex flex-column min-vh-100">

          {/* NAVBAR */}
          <Header />

          {/* MAIN */}
          <main className="flex-grow-1">
            <Routes>

              {/* PUBLIC ROUTES */}
              <Route path="/" element={<Home packages={packages} />} />
              <Route path="/packages" element={<Packages />} />
              <Route path="/packages/:id" element={<PackageDetails />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />

              {/* CUSTOMER-PROTECTED ROUTES */}
              <Route
                path="/book/:id"
                element={
                  <PrivateRoute role="customer">
                    <BookingForm />
                  </PrivateRoute>
                }
              />

              <Route
                path="/dashboard"
                element={
                  <PrivateRoute role="customer">
                    <CustomerDashboard />
                  </PrivateRoute>
                }
              />

              {/* ADMIN-PROTECTED ROUTES */}
              <Route
                path="/admin"
                element={
                  <PrivateRoute role="admin">
                    <AdminDashboard />
                  </PrivateRoute>
                }
              />

              <Route
                path="/admin/packages"
                element={
                  <PrivateRoute role="admin">
                    <ManagePackages />
                  </PrivateRoute>
                }
              />

              <Route
                path="/admin/packages/new"
                element={
                  <PrivateRoute role="admin">
                    <PackageForm />
                  </PrivateRoute>
                }
              />

              <Route
                path="/admin/packages/edit/:id"
                element={
                  <PrivateRoute role="admin">
                    <PackageForm />
                  </PrivateRoute>
                }
              />

            </Routes>
          </main>

          {/* CHATBOT – floating (customer only, optional) */}
          <div style={{ position: "fixed", bottom: 90, right: 20, zIndex: 9999 }}>
            <Chatbot />
          </div>

          {/* FOOTER */}
          <Footer />

        </div>

      </BrowserRouter>
    </AuthProvider>
  );
};

export default AppRouter;
