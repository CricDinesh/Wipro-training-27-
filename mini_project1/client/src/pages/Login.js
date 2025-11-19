// src/pages/Login.js
// ⭐ Handles login for BOTH admin & customer
// ⭐ Redirects admin → /admin
// ⭐ Redirects customer → /dashboard
// ⭐ Uses Yup validation + Formik
// ⭐ Uses json-server users table for authentication

import React, { useContext } from "react";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import API from "../api/api";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  // ------------ VALIDATION SCHEMA ------------
  const schema = Yup.object({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  // ------------ SUBMIT FUNCTION WITH ROLE REDIRECTION ------------
  const submit = async (vals, { setSubmitting }) => {
    try {
      // find user from json-server
      const res = await API.get(`/users?email=${vals.email}`);
      const user = res.data[0];

      // invalid login
      if (!user || user.password !== vals.password) {
        alert("Invalid credentials");
        setSubmitting(false);
        return;
      }

      // store logged-in user info
      login({
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role, // admin OR customer
      });

      // ⭐ REDIRECT BASED ON ROLE
      if (user.role === "admin") {
        navigate("/admin");       // ADMIN HOME
      } else {
        navigate("/dashboard");   // CUSTOMER DASHBOARD
      }

    } catch (err) {
      alert("Login failed");
      console.error(err);
    }

    setSubmitting(false);
  };

  return (
    <div className="container my-4" style={{ maxWidth: "500px" }}>
      <h2 className="mb-3 text-center">Login</h2>

      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={schema}
        onSubmit={submit}
      >
        {({ errors, touched, isSubmitting }) => (
          <Form className="card p-4 shadow-sm">

            {/* EMAIL */}
            <div className="mb-3">
              <label className="form-label">Email</label>
              <Field name="email" type="email" className="form-control" />
              {errors.email && touched.email && (
                <div className="text-danger small">{errors.email}</div>
              )}
            </div>

            {/* PASSWORD */}
            <div className="mb-3">
              <label className="form-label">Password</label>
              <Field name="password" type="password" className="form-control" />
              {errors.password && touched.password && (
                <div className="text-danger small">{errors.password}</div>
              )}
            </div>

            {/* SUBMIT BUTTON */}
            <button
              type="submit"
              className="btn btn-primary w-100"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Logging in..." : "Login"}
            </button>

          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Login;
