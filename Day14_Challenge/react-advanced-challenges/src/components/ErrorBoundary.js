import React from "react";
import "./Common.css";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    // Update state so next render shows fallback UI
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Log the error details (could be sent to monitoring)
    console.error("ErrorBoundary caught an error:", error, errorInfo);
    this.setState({ errorInfo });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-fallback">
          <h4>Something went wrong.</h4>
          <p>We captured the error and continue running the rest of the app.</p>
          <details style={{ whiteSpace: "pre-wrap" }}>
            {this.state.errorInfo ? this.state.errorInfo.componentStack : "No details"}
          </details>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
