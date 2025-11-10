import React, { useState } from "react";

function ExplodingChild() {
  const [crash, setCrash] = useState(false);
  if (crash) throw new Error("Oops! Something broke.");
  return (
    <div>
      <h3>Click below to simulate an error:</h3>
      <button className="btn-close" onClick={() => setCrash(true)}>
        Trigger Error
      </button>
    </div>
  );
}

export default ExplodingChild;
