import React, { useState } from "react";

function App() {
  const [message, setMessage] = useState("");

  const handlePrimaryClick = () => {
    setMessage(" You clicked the Primary Button!");
    setTimeout(() => setMessage(""), 3000); // message disappears after 3 seconds
  };

  const handleSuccessClick = () => {
    setMessage(" Success! You clicked the Success Button!");
    setTimeout(() => setMessage(""), 3000);
  };

  return (
    <div className="App">
      <div className="container py-4 text-center">
        <h1 className="mb-3">Bootstrap in React</h1>

        <button className="btn btn-primary me-2" onClick={handlePrimaryClick}>
          Primary Button
        </button>

        <button className="btn btn-success" onClick={handleSuccessClick}>
          Success Button
        </button>

        {message && (
          <div
            className="alert alert-info mt-4"
            style={{ fontWeight: "bold", fontSize: "18px" }}
          >
            {message}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
