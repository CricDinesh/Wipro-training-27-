/**
 * Challenge 8 - Using Promises
 * Goal:
 *   - Read input.txt
 *   - Write its content into output.txt
 *   - Log a success message using .then()
 *   - Handle errors using .catch()
 */

const fs = require("fs").promises;

// Step 1: Read input.txt
fs.readFile("input.txt", "utf8")
  .then((data) => {
    // Step 2: Write to output.txt
    return fs.writeFile("output.txt", data, "utf8");
  })
  .then(() => {
    // Step 3: Final confirmation message
    console.log("File copied successfully!");
  })
  .catch((error) => {
    console.log("An error occurred:", error);
  });
