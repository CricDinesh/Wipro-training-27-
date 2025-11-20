// Main entry point of the application.
// This file configures EJS template rendering and defines routes.

const express = require('express');
const path = require('path');
const app = express();

// Set EJS as the template engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views')); 

// Route to render the home page template
app.get('/', (req, res) => {
    res.render('home', {
        name: 'Dinesh Kumar D',               // value passed to the EJS template
        year: new Date().getFullYear()
    });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
