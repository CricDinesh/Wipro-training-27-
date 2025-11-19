import React from "react";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import API from "../api/api";

const Register = () => {
  const schema = Yup.object({ name: Yup.string().required(), email: Yup.string().email().required(), password: Yup.string().min(6).required() });

  const submit = async (vals, { setSubmitting, resetForm }) => {
    try {
      await API.post("/users", { ...vals, role: "customer" });
      alert("Registered. Please login.");
      resetForm();
    } catch (err) { alert("Failed to register"); }
    setSubmitting(false);
  };

  return (
    <div className="container my-4" style={{ maxWidth: 640 }}>
      <h2>Register</h2>
      <Formik initialValues={{ name: "", email: "", password: "" }} validationSchema={schema} onSubmit={submit}>
        {({ errors, touched }) => (
          <Form>
            <div className="mb-3"><label>Name</label><Field name="name" className="form-control" />{errors.name && touched.name && <div className="text-danger small">{errors.name}</div>}</div>
            <div className="mb-3"><label>Email</label><Field name="email" className="form-control" />{errors.email && touched.email && <div className="text-danger small">{errors.email}</div>}</div>
            <div className="mb-3"><label>Password</label><Field name="password" type="password" className="form-control" />{errors.password && touched.password && <div className="text-danger small">{errors.password}</div>}</div>
            <button className="btn btn-primary">Create Account</button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Register;
