// joi and express-validationator based validation middleware will be used in the routes

const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

const userRoutes = require('./routes/userRoutes'); 
const { registerValidationRules } = require('./express-validator/userValidation');
const validateResult = require('./express-validator/validateResult');

app.use(express.json());

// Default route
app.get('/', (req, res) => {
    res.send("Welcome to Validation Demo Server");
});

// FIXED: Joi validation route prefix
app.use('/api/users', userRoutes);

// Express-validator signup example
app.post('/signup', registerValidationRules, validateResult, (req, res) => {
    res.json({
        success: true,
        message: "Signup route validated using express-validator",
        data: req.body
    });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// Explanation of the code:
// 1. We import the Express package and the user routes defined in routes/userRoutes.js.
// 2. We create an Express application instance.
// 3. We set up middleware to parse JSON request bodies.
// 4. We use the user routes for the /routes endpoint.
// 5. We start the server and listen on the specified port. ie 3000 or from environment variable.

// After implementing both joi and express-validator based validation in the server.js file,
// we can now handle user input validation using either of the two libraries as needed in different routes.
//Explanation of the code:
// 1. We import the necessary validation middleware from both Joi and express-validator.
// 2. We define a /signup route that uses express-validator for input validation.
// 3. We send a success response if the validation passes and the route is accessed successfully.