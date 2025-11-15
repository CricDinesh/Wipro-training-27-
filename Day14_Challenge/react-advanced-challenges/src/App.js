import React, { useState, Suspense, useCallback } from "react";
import ErrorBoundary from "./components/ErrorBoundary";
import StatsCard from "./components/StatsCard";
import Spinner from "./components/Spinner";
import Modal from "./components/Modal";
import ProductCard from "./components/ProductCard";
import "./App.css";

// Lazy loaded components
const CourseDetails = React.lazy(() => import("./components/CourseDetails"));
const InstructorProfile = React.lazy(() => import("./components/InstructorProfile"));

function App() {
  // UI toggles
  const [showCourse, setShowCourse] = useState(false);
  const [showInstructor, setShowInstructor] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  // Stats pure components data
  const [stats, setStats] = useState([
    { id: 1, title: "Students", value: 1200, lastUpdated: "2025-11-01" },
    { id: 2, title: "Courses", value: 28, lastUpdated: "2025-11-02" },
    { id: 3, title: "Active", value: 532, lastUpdated: "2025-11-03" }
  ]);

  // Simulate update: changes only one card's value
  const simulateUpdate = useCallback((id) => {
    setStats(prev =>
      prev.map(s => (s.id === id ? { ...s, value: s.value + Math.floor(Math.random() * 10) + 1, lastUpdated: new Date().toISOString().slice(0,10) } : s))
    );
  }, []);

  return (
    <div className="app">
      <header className="app-header">
        <h1>React Advanced Concepts — Dashboard</h1>
        <div className="controls">
          <button onClick={() => setShowCourse(v => !v)}>{showCourse ? "Hide" : "View"} Course Details</button>
          <button onClick={() => setShowInstructor(v => !v)}>{showInstructor ? "Hide" : "View"} Instructor Profile</button>
          <button onClick={() => setModalOpen(true)}>Open Portal Modal</button>
        </div>
      </header>

      <main className="container">
        <section className="panel">
          <h2>Lazy-loaded Modules</h2>
          <p className="muted">Course Details and Instructor Profile are loaded only when opened.</p>
          <div className="lazy-grid">
            <div className="card">
              <h3>Course Details</h3>
              <Suspense fallback={<Spinner small />}>
                {showCourse ? <CourseDetails /> : <div className="hint">Click "View Course Details" to load</div>}
              </Suspense>
            </div>

            <div className="card">
              <h3>Instructor Profile</h3>
              <Suspense fallback={<Spinner small />}>
                {showInstructor ? <InstructorProfile /> : <div className="hint">Click "View Instructor Profile" to load</div>}
              </Suspense>
            </div>
          </div>
        </section>

        <section className="panel">
          <h2>Pure Components (Stats)</h2>
          <p className="muted">Each card is a pure component and logs re-renders to console.</p>
          <div className="stats-grid">
            {stats.map(s => (
              <div key={s.id} className="stat-wrapper">
                <StatsCard {...s} />
                <button className="small" onClick={() => simulateUpdate(s.id)}>Simulate Update</button>
              </div>
            ))}
          </div>
        </section>

        <section className="panel">
          <h2>Error Boundary</h2>
          <p className="muted">ProductCard may throw; ErrorBoundary will catch it and show fallback UI.</p>
          <ErrorBoundary>
            <ProductCard />
          </ErrorBoundary>
        </section>

        <section className="panel">
          <h2>Portal Modal</h2>
          <p className="muted">Modal is rendered via React Portal into <code>#modal-root</code>.</p>
        </section>
      </main>

      {modalOpen && (
        <Modal onClose={() => setModalOpen(false)}>
          <div className="modal-content">
            <h3>Portal Modal</h3>
            <p>This modal is rendered outside the main DOM hierarchy using a portal.</p>
            <button onClick={() => setModalOpen(false)}>Close</button>
          </div>
        </Modal>
      )}

      <footer className="app-footer">
        <small>This is an Implementation of ReactJS Advanced Concepts</small>
      </footer>
    </div>
  );
}

export default App;
