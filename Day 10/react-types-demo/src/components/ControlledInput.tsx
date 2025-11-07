import React, { useState } from "react";

const ControlledInput: React.FC = () => {
  const [value, setValue] = useState("");

  return (
    <div>
      <label>Controlled Input: </label>
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <p>Current Value: {value}</p>
    </div>
  );
};

export default ControlledInput;
