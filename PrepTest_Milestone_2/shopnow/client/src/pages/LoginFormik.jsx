import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const schema = Yup.object({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().min(4, "Too short").required("Required"),
});

export default function LoginFormik() {
  return (
    <div className="card" style={{ maxWidth: 420, margin: "auto" }}>
      <h3>Login (Formik + Yup)</h3>

      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={schema}
        onSubmit={(values) => {
          console.log(values);
          alert("Form submitted");
        }}
      >
        {({ errors, touched }) => (
          <Form>
            <label>Email</label>
            <Field
              type="email"
              name="email"
              placeholder="Enter your email"
              className={errors.email && touched.email ? "error-input" : ""}
            />
            <div className="error">
              <ErrorMessage name="email" />
            </div>

            <label>Password</label>
            <Field
              type="password"
              name="password"
              placeholder="Enter your password"
              className={errors.password && touched.password ? "error-input" : ""}
            />
            <div className="error">
              <ErrorMessage name="password" />
            </div>

            <button type="submit" style={{ marginTop: "15px", width: "100%" }}>
              Login
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}