import React, { useState, lazy, Suspense } from "react";
import "./index.css";
import Loader from "./components/Loader"; // Spinner component you already have
import PureDisplay from "./components/PureDisplay";
import ErrorBoundary from "./components/ErrorBoundary";
import ExplodingChild from "./components/ExplodingChild";
import ModalPortal from "./components/ModalPortal";

// Lazy loaded component
const HeavyPage = lazy(() => import("./pages/HeavyPage"));

function App() {
  const [activeSection, setActiveSection] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showSpinner, setShowSpinner] = useState(false);

  // Handle button clicks with loader each time
  const handleSectionChange = (section) => {
    setShowSpinner(true);
    setActiveSection(""); // reset section for new render
    setTimeout(() => {
      setActiveSection(section);
      setShowSpinner(false);
    }, 800); // simulate loading delay
  };

  const renderSection = () => {
    if (showSpinner) return <Loader />;

    switch (activeSection) {
      case "lazy":
        return (
          <Suspense fallback={<Loader />}>
            <HeavyPage />
          </Suspense>
        );

      case "pure":
        return (
          <section className="pure-section">
            <h2>Pure Component Example</h2>
            <p>This demonstrates live updates with React.memo optimization.</p>
            <PureDisplay />
          </section>
        );

      case "error":
        return (
          <section className="error-section">
            <h2>Error Boundary Example</h2>
            <ErrorBoundary>
              <ExplodingChild />
            </ErrorBoundary>
          </section>
        );

      case "portal":
        return (
          <section className="portal-section">
            <h2>Portal Modal Example</h2>
            <button onClick={() => setIsModalOpen(true)}>Open Notification</button>
            <ModalPortal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
              <h3>Success!</h3>
              <p>This modal is rendered via React Portal.</p>
              <button className="btn-close" onClick={() => setIsModalOpen(false)}>
                Close
              </button>
            </ModalPortal>
          </section>
        );

      default:
        return (
          <section className="welcome-section">
            <h2>Welcome to React Concepts Live Demo</h2>
            <p>Click a button above to experience each React concept live.</p>
          </section>
        );
    }
  };

  return (
    <div className="app-container">
      <div className="nav-buttons">
        <button onClick={() => handleSectionChange("lazy")}>Lazy Load</button>
        <button onClick={() => handleSectionChange("pure")}>Pure Component</button>
        <button onClick={() => handleSectionChange("error")}>Error Boundary</button>
        <button onClick={() => handleSectionChange("portal")}>Portal (Modal)</button>
      </div>
      {renderSection()}
    </div>
  );
}

export default App;
