import React, { useEffect } from "react";
import FunctionalComponent from "./components/FunctionalComponent";
import ClassComponent from "./components/ClassComponent";
import PureComponentDemo from "./components/PureComponentDemo";
import withLogger from "./components/withLogger";
import ControlledInput from "./components/ControlledInput";
import UncontrolledInput from "./components/UncontrolledInput";
import ErrorBoundary from "./components/ErrorBoundary";
import "./App.css";

//  Wrapped component with logger HOC
const LoggedFunctional = withLogger(FunctionalComponent);

//  BuggyComponent now returns JSX (TypeScript-friendly)
function BuggyComponent() {
  useEffect(() => {
    // Simulate a crash after mount
    throw new Error("Simulated crash!");
  }, []);

  return <div>Buggy Component</div>;
}

function App() {
  return (
    <div className="App" style={{ padding: "20px", fontFamily: "Arial" }}>
      <h2>React Component Types Demo (TypeScript)</h2>

      {/* Different component types */}
      <FunctionalComponent name="Alice" />
      <ClassComponent name="Bob" />
      <PureComponentDemo message="This is a PureComponent demo" />
      <LoggedFunctional name="Charlie (via HOC)" />

      <hr />

      {/* Controlled vs Uncontrolled components */}
      <ControlledInput />
      <UncontrolledInput />

      <hr />

      {/* ErrorBoundary wrapping BuggyComponent */}
      <ErrorBoundary>
        <BuggyComponent />
      </ErrorBoundary>
    </div>
  );
}

export default App;
