// Importing chalk (v4 version works with require)
const chalk = require("chalk");

// Importing figlet for ASCII art
const figlet = require("figlet");

// Generate ASCII banner text
figlet("Welcome to Node.js", (err, data) => {
    // If figlet faces any error, show real error
    if (err) {
        console.log("Figlet Error:", err);
        return;
    }

    // Print the ASCII text in green color
    console.log(chalk.green(data));
});
