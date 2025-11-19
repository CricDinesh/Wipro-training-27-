import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

const PackageCard = ({ pkg }) => {
  const { user } = useContext(AuthContext);

  return (
    <div className="card mb-4 shadow-sm border-0">

      {/* IMAGE FIX — No Flickering */}
      <div style={{ height: 200, overflow: "hidden" }}>
        <img
          src={pkg?.image}
          alt={pkg?.title}
          className="img-fluid w-100"
          style={{ objectFit: "cover", height: "200px" }}
          onError={(e) => (e.currentTarget.src = "/images/placeholder.png")}
        />
      </div>

      <div className="card-body">
        <h5 className="fw-bold">{pkg.title}</h5>
        <p className="text-muted text-truncate">{pkg.description}</p>

        <strong className="text-primary">₹{pkg.price}</strong>

        {/* BUTTONS */}
        <div className="mt-3 d-flex gap-2">

          {/* CUSTOMER BUTTONS */}
          {user?.role === "customer" && (
            <>
              <Link className="btn btn-warning btn-sm" to={`/book/${pkg.id}`}>
                Book
              </Link>

              <Link className="btn btn-outline-secondary btn-sm" to={`/packages/${pkg.id}`}>
                Details
              </Link>
            </>
          )}

          {/* ADMIN EDIT BUTTONS (Shown only inside ManagePackages page, not here) */}

        </div>
      </div>
    </div>
  );
};

export default PackageCard;
