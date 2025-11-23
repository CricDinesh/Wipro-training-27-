// this file will extract validation errors from a request and format them into a more usable structure
//Step 1: Import necessary modules from express-validator.
//Step 2: Create a function that checks for validation errors in the request.
//Step 3: Format the errors into a structured object or array.
//Step 4: Export the function for use in route handlers.
const { validationResult } = require('express-validator');

module.exports = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            errors: errors.array().map(err => ({
                field: err.param,
                message: err.msg
            }))
        });
    }
    next();
};

// Explanation of the code:
// 1. We import the validationResult function from express-validator to check for validation errors.
// 2. We define a function getValidationResult that takes the request object as a parameter.
// 3. Inside the function, we extract validation errors and format them into an array of objects containing field names and error messages.
// 4. We export the getValidationResult function for use in route handlers to handle validation results.