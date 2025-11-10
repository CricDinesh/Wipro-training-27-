import React, { useRef } from "react";
import { Routes, Route, Link, useLocation } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Users from "./pages/Users";
import "./index.css";

export default function App() {
  const location = useLocation();
  const nodeRef = useRef(null); // Important fix

  return (
    <div style={{ maxWidth: 800, margin: "36px auto", padding: "0 16px" }}>
      <h1 style={{ textAlign: "center", color: "#1d4ed8" }}>
         React Router Animated App
      </h1>

      <nav style={{ textAlign: "center", marginBottom: 20 }}>
        <Link to="/" style={{ marginRight: 12 }}>Home</Link>
        <Link to="/about" style={{ marginRight: 12 }}>About</Link>
        <Link to="/contact" style={{ marginRight: 12 }}>Contact</Link>
        <Link to="/users">Users</Link>
      </nav>

      <TransitionGroup component={null}>
        <CSSTransition
          key={location.pathname}
          classNames="page"
          timeout={300}
          nodeRef={nodeRef}  // required for React 18
          unmountOnExit
        >
          <div ref={nodeRef} className="route-wrapper">
            <Routes location={location}>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/users" element={<Users />} />
              <Route path="*" element={<h2>404 – Page Not Found </h2>} />
            </Routes>
          </div>
        </CSSTransition>
      </TransitionGroup>
    </div>
  );
}
