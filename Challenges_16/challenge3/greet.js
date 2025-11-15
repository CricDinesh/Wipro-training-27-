// This small program greets the user with their name and the current date/time.
// The name is taken from the command line when running the program.

const moment = require("moment");

// process.argv[2] gives the first value typed after the file name
const userName = process.argv[2];

// If user forgets to type their name, show a friendly message
if (!userName) {
  console.log("Please provide your name. Example: node greet.js John");
  process.exit();
}

// moment() gives the current date and time in a readable format
const currentTime = moment().format("dddd, MMMM Do YYYY, h:mm A");

// Final output message to the user
console.log(`Hello, ${userName}! Today is ${currentTime}.`);
