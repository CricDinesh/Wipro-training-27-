/**
 * Challenge 7 - Using Callbacks
 * Goal:
 *   - Read a file using fs.readFile()
 *   - Display a message only after reading is complete
 *   - Show asynchronous behaviour
 */

const fs = require("fs");

// Reading data.txt using callback-style async code
fs.readFile("data.txt", "utf8", (err, content) => {
  if (err) {
    console.log("Something went wrong while reading the file:", err);
    return;
  }

  console.log("File Content:", content);

  // Bonus: Adding an intentional delay to simulate slow operations
  setTimeout(() => {
    console.log("Read operation completed (after delay)");
  }, 1000);
});

console.log("Reading file... Please wait.");  // Executes immediately (async proof)
