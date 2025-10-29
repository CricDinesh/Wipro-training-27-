// Import Person and Student classes
import { Person, Student } from "./person.js";

// Clear page and add a title
document.body.innerHTML = `<h1>TypeScript Class Example</h1>`;

// Create a Person object
const person1 = new Person("Alice", 30, "Wonderland University");

// Display person details on webpage
document.body.innerHTML += `
  <h2>Person Details</h2>
  <p>${person1.greet()}</p>
  <p><b>Person ID:</b> ${person1.showId()}</p>
  <p><b>Person Counter:</b> ${Person.counter}</p>
  <hr>
`;

// Create a Student object
const student1 = new Student("Bob", 20, "Builder Institute", ["JavaScript", "TypeScript"]);

// Display student details
document.body.innerHTML += `
  <h2>Student Details</h2>
  <p>${student1.getStudentDetails()}</p>
`;

// Add new skill and display again
student1.addSkill("React");
student1.display();

document.body.innerHTML += `
  <p><b>Student ID:</b> ${student1.showId()}</p>
  <p><b>Person Counter after creating Student:</b> ${Person.counter}</p>
`;

// Optional: Add footer
document.body.innerHTML += `
  <hr>
  <footer style="text-align:center; font-size:14px; color:gray;">
    TypeScript Demo — Wipro Training Day 5
  </footer>
`;
