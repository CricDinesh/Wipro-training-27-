import React, { useState } from "react";

{/* Interface for number items */}
function NumberItem(value) {
  this.value = value;
}

{/* Component: NumberList - Displays list of numbers */}
function NumberList({ numbers }) {
  return (
    <div>
      <h3>Number List</h3>
      <ul>
        {numbers.map((item, index) => (
          <li key={index}>{item.value}</li>
        ))}
      </ul>
    </div>
  );
}

{/* Component: FilterControls - Handles filtering and mapping */}
function FilterControls({ onFilter, onMap }) {
  return (
    <div>
      <button onClick={onFilter}>Show Even Numbers</button>
      <button onClick={onMap}>Double Numbers</button>
    </div>
  );
}

{/* Component: Logger - Iterates and logs numbers to console */}
function Logger({ numbers }) {
  const handleLog = () => {
    numbers.forEach((item) => console.log("Number:", item.value));
  };

  return <button onClick={handleLog}>Log Numbers</button>;
}

{/* Component: HoistingDemo - Demonstrates variable and function hoisting */}
function HoistingDemo() {
  {/* Variable hoisting demo */}
  console.log("Before declaration:", x);
  var x = 10;
  console.log("After declaration:", x);

  {/* Function hoisting demo */}
  sayHello();
  function sayHello() {
    console.log("Hello from hoisted function!");
  }

  return (
    <div>
      <h3>Hoisting Demo (Check Console)</h3>
    </div>
  );
}

{/* Component: ConstructorDemo - Demonstrates constructor usage */}
function ConstructorDemo() {
  function Person(name, age) {
    this.name = name;
    this.age = age;
    this.greet = function () {
      return `Hi, I'm ${this.name} and I'm ${this.age} years old.`;
    };
  }

  const person = new Person("Dinesh", 22);

  return (
    <div>
      <h3>Constructor Demo</h3>
      <p>{person.greet()}</p>
    </div>
  );
}

{/* Main App component combining all */}
function App() {
  const [numbers, setNumbers] = useState([
    new NumberItem(1),
    new NumberItem(2),
    new NumberItem(3),
    new NumberItem(4),
    new NumberItem(5),
  ]);

  {/* Function to filter even numbers */}
  const handleFilter = () => {
    const filtered = numbers.filter((item) => item.value % 2 === 0);
    setNumbers(filtered);
  };

  {/* Function to map numbers to double */}
  const handleMap = () => {
    const mapped = numbers.map((item) => new NumberItem(item.value * 2));
    setNumbers(mapped);
  };

  return (
    <div style={{ textAlign: "center", marginTop: "30px" }}>
      <h2>JSX and JavaScript Concepts Sprint</h2>
      <FilterControls onFilter={handleFilter} onMap={handleMap} />
      <NumberList numbers={numbers} />
      <Logger numbers={numbers} />
      <HoistingDemo />
      <ConstructorDemo />
    </div>
  );
}

export default App;
