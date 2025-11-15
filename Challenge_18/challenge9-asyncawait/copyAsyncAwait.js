/**
 * Challenge 9 - Using Async/Await
 * Goal:
 *   - Same file copy as previous challenge
 *   - Use async/await for cleaner syntax
 *   - Add a simulated delay to mimic a slow operation
 */

const fs = require("fs").promises;

// Artificial delay function
function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function copyFile() {
  try {
    // Step 1: Read input.txt
    const data = await fs.readFile("input.txt", "utf8");

    // Step 2: Simulate slow operation (Bonus)
    await wait(1000);

    // Step 3: Write into output.txt
    await fs.writeFile("output.txt", data, "utf8");

    console.log("File copied successfully using async/await!");
  } catch (error) {
    console.log("Error in async/await operation:", error);
  }
}

// Run the async function
copyFile();
