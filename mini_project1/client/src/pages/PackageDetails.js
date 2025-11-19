import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import API from "../api/api";

const PackageDetails = () => {
  const { id } = useParams();
  const [pkg, setPkg] = useState(null);

  useEffect(() => {
    API.get(`/packages/${id}`).then(res => setPkg(res.data)).catch(() => setPkg(null));
  }, [id]);

  if (!pkg) return <div className="p-4 text-center">Loading...</div>;

  return (
    <div className="container my-4">
      <h2>{pkg.title}</h2>
      <div style={{ maxHeight: 420, overflow: "hidden" }}>
        <img src={pkg.image} alt={pkg.title} className="img-fluid rounded" style={{ objectFit: "cover", height: 360, width: "100%" }} onError={e=>e.currentTarget.src='/images/placeholder.png'} />
      </div>
      <p className="mt-3">{pkg.description}</p>
      <p><strong>Price:</strong> ₹{pkg.price}</p>
      <p><strong>Duration:</strong> {pkg.duration}</p>

      <Link to={`/book/${pkg.id}`} className="btn btn-primary me-2">Book Now</Link>
      <Link to="/packages" className="btn btn-secondary">Back</Link>
    </div>
  );
};

export default PackageDetails;
