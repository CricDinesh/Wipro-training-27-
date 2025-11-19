import React from "react";
import { Link } from "react-router-dom";

const Home = ({ packages = [] }) => {
  return (
    <div className="container my-4">

      {/* HERO SECTION */}
      <section 
        className="hero p-5 rounded shadow-sm text-center"
        style={{ 
          background: "linear-gradient(90deg,#e3f2fd,#fff)",
          borderRadius: "20px"
        }}
      >
        <h1 className="fw-bold">Discover Your Next Adventure</h1>
        <p className="mt-2">Beautiful, safe & curated travel packages — book easily.</p>
        <Link className="btn btn-primary px-4 mt-2" to="/packages">
          Explore Packages
        </Link>
      </section>

      {/* FEATURED PACKAGES */}
      <section className="mt-5">
        <h2 className="mb-3 fw-semibold">Featured Packages</h2>

        <div className="row">
          {packages.slice(0, 3).map((p) => (
            <div className="col-md-4" key={p.id}>
              <div className="card mb-4 shadow-sm border-0">

                {/* IMAGE FIX ✔ NO FLICKER */}
                <div style={{ height: 200, overflow: "hidden" }}>
                  <img
                    src={p.image}
                    alt={p.title}
                    className="img-fluid w-100"
                    style={{ objectFit: "cover", height: "200px" }}
                    onError={(e) => (e.currentTarget.src = "/images/placeholder.png")}
                  />
                </div>

                <div className="card-body">
                  <h5 className="fw-bold">{p.title}</h5>
                  <p className="text-truncate">{p.description}</p>

                  <Link
                    to={`/packages/${p.id}`}
                    className="btn btn-outline-primary btn-sm"
                  >
                    View
                  </Link>
                </div>

              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};

export default Home;
