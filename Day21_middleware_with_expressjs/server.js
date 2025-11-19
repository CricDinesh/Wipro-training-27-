
// This file contains all server-related code:
// Express setup, global middlewares, routes, error handling,
// and server startup.


const express = require('express');
const app = express();

// Body parser middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Custom logger middleware
app.use((req, res, next) => {
    console.log(`${req.method} request for '${req.url}'`);
    next();
});

// ROUTES (Must be ABOVE error handler)

app.get('/', (req, res) => {
    res.send('Hello, World!');
});

app.get('/about', (req, res) => {
    res.send('About Route → Custom middleware is working!');
});

// ADD ERROR ROUTE HERE
app.get('/error', (req, res) => {
    throw new Error("Test error triggered!");
});


// ERROR-HANDLING MIDDLEWARE (Must be AFTER routes)

app.use((err, req, res, next) => {
    console.error("Error occurred:", err.stack);
    res.status(500).send('Something broke!');
});

// Start server

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
