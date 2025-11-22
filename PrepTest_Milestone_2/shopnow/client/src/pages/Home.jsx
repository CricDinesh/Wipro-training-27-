import React from "react";
import ProductCard from "../components/ProductCard";
import WidthDemo from "../components/WidthDemo";
import UserCard from "../components/UserCard";   

export default function Home() {
  return (
    <div>

      {/* ====== HERO SECTION ====== */}
      <section
        style={{
          textAlign: "center",
          padding: "60px 20px",
          background: "linear-gradient(135deg, #edeaff, #ffffff)",
          borderRadius: "16px",
          marginBottom: "40px",
          boxShadow: "0 10px 25px rgba(0,0,0,0.08)"
        }}
      >
        <h1 style={{ fontSize: "38px", color: "#5c39ff", marginBottom: "10px" }}>
          Welcome to ShopNow
        </h1>
        <p style={{ fontSize: "18px", color: "#555" }}>
          A beautifully crafted React Demo Application
        </p>
      </section>

      <h2 style={{ marginBottom: "20px" }}>ShopNow - Home</h2>

      {/* ====== PRODUCT SECTION ====== */}
      <div style={{ display: "flex", justifyContent: "center" }}>
        <ProductCard title="Sample Product" price={200} discount={50} />
      </div>

      <h2 style={{ marginTop: "50px" }}>Demonstrations</h2>

      {/* ====== DEMO CARDS WRAPPER ====== */}
      <div style={{ display: "flex", flexDirection: "column", gap: "25px" }}>
        <UserCard id={101} status="Active User" />   {/* ✅ Now UserCard works */}
        <WidthDemo />
      </div>
    </div>
  );
}
