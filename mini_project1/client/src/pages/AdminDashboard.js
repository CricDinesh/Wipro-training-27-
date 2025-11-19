import React, { useEffect, useState } from "react";
import API from "../api/api";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  const [bookings, setBookings] = useState([]);

  const fetch = async () => {
    const res = await API.get("/bookings");
    setBookings(res.data);
  };

  useEffect(() => { fetch(); }, []);

  const updateStatus = async (id, status) => {
    const res = await API.get(`/bookings/${id}`);
    const booking = res.data;
    booking.status = status;
    await API.put(`/bookings/${id}`, booking);
    fetch();
  };

  return (
    <div className="container my-4">
      <div className="d-flex justify-content-between align-items-center">
        <h2>Admin Dashboard</h2>
        <Link to="/admin/packages" className="btn btn-success">Manage Packages</Link>
      </div>

      <h4 className="mt-3">Bookings</h4>
      {bookings.map(b => (
        <div key={b.id} className="card mb-2 p-2">
          <div className="d-flex justify-content-between">
            <div>
              <div><strong>Booking #{b.id}</strong> (User {b.userId})</div>
              <div>Package {b.packageId} — {b.travellers} travellers</div>
            </div>
            <div className="text-end">
              <div>Status: {b.status}</div>
              <div className="mt-2">
                <button className="btn btn-sm btn-success me-1" onClick={() => updateStatus(b.id, "approved")}>Approve</button>
                <button className="btn btn-sm btn-warning" onClick={() => updateStatus(b.id, "cancelled")}>Cancel</button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AdminDashboard;
