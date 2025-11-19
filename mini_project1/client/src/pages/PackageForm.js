// src/pages/PackageForm.js
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../api/api";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";

const PackageForm = () => {
  const { id } = useParams();
  const [initial, setInitial] = useState({
    title: "",
    price: "",
    duration: "",
    image: "",
    description: ""
  });

  const navigate = useNavigate();

  // Load package for editing
  useEffect(() => {
    if (id) {
      API.get(`/packages/${id}`)
        .then((res) => setInitial(res.data))
        .catch(console.error);
    }
  }, [id]);

  // ⭐ FIXED: VALIDATION MUST INCLUDE ALL FIELDS
  const schema = Yup.object({
    title: Yup.string().required("Title required"),
    price: Yup.number().required("Price required"),
    duration: Yup.string().required("Duration required"),
    image: Yup.string().required("Image path required"),   // ⭐ Added
    description: Yup.string().required("Description required"), // ⭐ Added
  });

  // Submit function
  const submit = async (vals) => {
    if (id) await API.put(`/packages/${id}`, vals);
    else await API.post("/packages", vals);

    navigate("/admin/packages");
  };

  return (
    <div className="container my-4">
      <h2>{id ? "Edit" : "Add"} Package</h2>

      <Formik
        enableReinitialize
        initialValues={initial}
        validationSchema={schema}
        onSubmit={submit}
      >
        {({ errors, touched }) => (
          <Form>
            <div className="mb-2">
              <label>Title</label>
              <Field name="title" className="form-control" />
              {errors.title && touched.title && <div className="text-danger">{errors.title}</div>}
            </div>

            <div className="mb-2">
              <label>Price</label>
              <Field name="price" type="number" className="form-control" />
              {errors.price && touched.price && <div className="text-danger">{errors.price}</div>}
            </div>

            <div className="mb-2">
              <label>Duration</label>
              <Field name="duration" className="form-control" />
              {errors.duration && touched.duration && <div className="text-danger">{errors.duration}</div>}
            </div>

            <div className="mb-2">
              <label>Image Path (e.g. /images/goa.jpg)</label>
              <Field name="image" className="form-control" />
              {errors.image && touched.image && <div className="text-danger">{errors.image}</div>}
            </div>

            <div className="mb-2">
              <label>Description</label>
              <Field as="textarea" name="description" className="form-control" />
              {errors.description && touched.description && <div className="text-danger">{errors.description}</div>}
            </div>

            <button type="submit" className="btn btn-primary">Save</button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default PackageForm;
