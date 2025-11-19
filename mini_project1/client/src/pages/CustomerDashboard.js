import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import API from "../api/api";

const CustomerDashboard = () => {
  const { user } = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);

  const fetch = async () => {
    const res = await API.get(`/bookings?userId=${user.id}`);
    setBookings(res.data);
  };

  useEffect(() => { if (user) fetch(); }, [user]);

  const clearAll = async () => {
    if (!window.confirm("Clear all bookings?")) return;
    await Promise.all(bookings.map(b => API.delete(`/bookings/${b.id}`)));
    setBookings([]);
  };

  return (
    <div className="container my-4">
      <h2>My Bookings</h2>
      <button className="btn btn-danger mb-3" onClick={clearAll}>Clear History</button>
      {bookings.length === 0 && <p>No bookings yet.</p>}
      {bookings.map(b => (
        <div key={b.id} className="card mb-2 p-2">
          <div className="d-flex justify-content-between">
            <div>
              <div><strong>Package:</strong> {b.packageId}</div>
              <div><small>Date: {b.date} | Travellers: {b.travellers}</small></div>
            </div>
            <div className="text-end">
              <div>Status: <strong>{b.status}</strong></div>
              <div>Paid: {b.payment?.paid ? "Yes" : "No"}</div>
              {b.payment?.receipt && <div>Receipt: {b.payment.receipt}</div>}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CustomerDashboard;
