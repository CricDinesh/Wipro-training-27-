import React from "react";
import WorkoutTracker from "./WorkoutTracker";
import ProductsPanel from "./ProductsPanel";

export default function Home() {
  return (
    <main className="home">
      <section className="card">
        <h2> Workout Tracker</h2>
        <WorkoutTracker />
      </section>

      <section className="card">
        <h2>Products (Redux)</h2>
        <ProductsPanel />
      </section>
    </main>
  );
}
