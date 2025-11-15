// This program helps you understand basic Node.js features.
// Nothing complicated, just simple messages printed with timers.

// Shows the version of Node that is running this script
console.log("Running on Node.js version:", process.version);

// __filename gives the full path of this file
console.log("Current file name:", __filename);

// __dirname gives only the folder path of this file
console.log("Current directory:", __dirname);

// This message will repeat every 3 seconds.
// Think of setInterval like a little clock timer.
const intervalId = setInterval(() => {
  console.log(" Hello from Node.js! This is a repeating message...");
}, 3000);

// Stop the repeating timer after 10 seconds.
// This avoids infinite printing.
setTimeout(() => {
  clearInterval(intervalId);
  console.log(" Timer stopped after 10 seconds.");
}, 10000);
