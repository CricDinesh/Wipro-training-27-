import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api/api";
import { AuthContext } from "../contexts/AuthContext";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import PaymentModal from "../components/PaymentModal";

const BookingForm = () => {
  const { id } = useParams();
  const [pkg, setPkg] = useState(null);
  const [showPayment, setShowPayment] = useState(false);
  const [bookingPayload, setBookingPayload] = useState(null);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    API.get(`/packages/${id}`).then(res => setPkg(res.data)).catch(() => setPkg(null));
  }, [id]);

  if (!user) return <div className="container p-4 text-center"><h4>Please login to book your trip.</h4></div>;

  const validationSchema = Yup.object({
    name: Yup.string().required("Required"),
    phone: Yup.string().required("Required"),
    travellers: Yup.number().min(1).required("Required"),
    date: Yup.string().required("Required")
  });

  const handleSubmit = (values) => {
    const booking = {
      userId: user.id,
      packageId: pkg.id,
      travellers: values.travellers,
      date: values.date,
      status: "pending",
      payment: { method: null, amount: pkg.price * values.travellers, paid: false, receipt: null },
      contact: { name: values.name, phone: values.phone }
    };
    // create booking first then open payment
    API.post("/bookings", booking).then(res => {
      setBookingPayload(res.data);
      setShowPayment(true);
    }).catch(() => alert("Failed to create booking"));
  };

  const handlePaymentSuccess = async (receipt) => {
    // update booking with payment
    if (!bookingPayload) return;
    const updated = { ...bookingPayload, payment: { ...bookingPayload.payment, paid: true, receipt }, status: "confirmed" };
    await API.put(`/bookings/${bookingPayload.id}`, updated);
    alert("Payment success — receipt: " + receipt);
    navigate("/dashboard");
  };

  return (
    <div className="container my-4">
      <h2>Book: {pkg?.title}</h2>
      <div className="row">
        <div className="col-md-5 mb-3">
          {pkg ? (
            <>
              <img src={pkg.image} alt={pkg.title} className="img-fluid rounded mb-3" style={{ objectFit: "cover", height: 260, width: "100%" }} onError={e=>e.currentTarget.src='/images/placeholder.png'} />
              <h4>{pkg.title}</h4>
              <p>{pkg.description}</p>
              <p><strong>Price/person:</strong> ₹{pkg.price}</p>
            </>
          ) : <div>Loading package...</div>}
        </div>

        <div className="col-md-7">
          <div className="card p-3 shadow-sm">
            <Formik initialValues={{ name: "", phone: "", travellers: 1, date: "" }} validationSchema={validationSchema} onSubmit={handleSubmit}>
              {({ errors, touched }) => (
                <Form>
                  <label className="form-label">Name</label>
                  <Field name="name" className="form-control" />
                  {errors.name && touched.name && <div className="text-danger small">{errors.name}</div>}

                  <label className="form-label mt-3">Phone</label>
                  <Field name="phone" className="form-control" />
                  {errors.phone && touched.phone && <div className="text-danger small">{errors.phone}</div>}

                  <label className="form-label mt-3">Travellers</label>
                  <Field name="travellers" type="number" className="form-control" />
                  {errors.travellers && touched.travellers && <div className="text-danger small">{errors.travellers}</div>}

                  <label className="form-label mt-3">Start Date</label>
                  <Field name="date" type="date" className="form-control" />
                  {errors.date && touched.date && <div className="text-danger small">{errors.date}</div>}

                  <button className="btn btn-primary w-100 mt-4" type="submit">Proceed to Payment</button>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>

      <PaymentModal show={showPayment} onClose={() => setShowPayment(false)} onSuccess={handlePaymentSuccess} amount={bookingPayload?.payment?.amount || pkg?.price} />
    </div>
  );
};

export default BookingForm;
