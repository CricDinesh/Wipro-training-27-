import React, { useRef } from "react";

const UncontrolledInput: React.FC = () => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleShowValue = () => {
    alert(`Uncontrolled Value: ${inputRef.current?.value}`);
  };

  return (
    <div>
      <label>Uncontrolled Input: </label>
      <input type="text" ref={inputRef} />
      <button onClick={handleShowValue}>Show Value</button>
    </div>
  );
};

export default UncontrolledInput;
