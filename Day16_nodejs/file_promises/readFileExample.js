const fs = require('fs').promises; // Import promise-based fs module

// Define an async function
async function readFileExample() {
  try {
    // Read file asynchronously (UTF-8 encoding)
    const data = await fs.readFile('example.txt', 'utf8');
    console.log(data);
  } catch (err) {
    // Handle errors (like file not found)
    console.error('Error reading file:', err.message);
  }
}

// Call the function
readFileExample();
