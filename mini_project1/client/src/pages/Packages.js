import React, { useEffect, useState, useContext } from "react";
import API from "../api/api";
import { Link } from "react-router-dom";
import PackageCard from "./PackageCard";
import { AuthContext } from "../contexts/AuthContext";

const Packages = () => {
  const [packages, setPackages] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    API.get("/packages").then((res) => setPackages(res.data));
  }, []);

  return (
    <div className="container my-4">

      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="fw-bold">All Packages</h2>

        {/* ONLY ADMIN CAN SEE ADD BUTTON */}
        {user?.role === "admin" && (
          <Link to="/admin/packages/new" className="btn btn-success px-3">
            Add Package
          </Link>
        )}
      </div>

      <div className="row">
        {packages.map((p) => (
          <div className="col-md-4" key={p.id}>
            <PackageCard pkg={p} />
          </div>
        ))}
      </div>
      
    </div>
  );
};

export default Packages;
