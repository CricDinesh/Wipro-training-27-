import React from "react";

interface FunctionalProps {
  name: string;
}

const FunctionalComponent: React.FC<FunctionalProps> = ({ name }) => {
  return <p> Hello from Functional Component, {name}!</p>;
};

export default FunctionalComponent;
