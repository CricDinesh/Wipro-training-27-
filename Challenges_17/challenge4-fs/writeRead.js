/**
 * Challenge 4 - File System (fs) Module
 * Goal: Write user feedback into a file and then read it back.
 * This version uses fs.promises to avoid callback nesting.
 */

const fs = require("fs").promises;

// Name of the file we will write and read
const FILE_NAME = "feedback.txt";

// Async function to handle writing and reading operations
async function handleFeedback() {
  try {
    const userInput = "Node.js is awesome!"; // You can change this any time

    // Writing data to a file
    await fs.writeFile(FILE_NAME, userInput, "utf8");
    console.log("Data written successfully.");

    console.log("Reading file...");

    // Reading the file content
    const data = await fs.readFile(FILE_NAME, "utf8");
    console.log(data);

  } catch (error) {
    console.log("Something went wrong:", error);
  }
}

// Call the function
handleFeedback();
