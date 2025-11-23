// for creating  clean code and modular structure we have created seprate schema.js file
//Here we will define schema :
const Joi = require('joi');

// defining schema for user registration
const registerSchema = Joi.object({
    username: Joi.string().alphanum().min(3).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().pattern(/^[a-zA-Z0-9]{3,30}$/).required(),
    confirmPassword: Joi.ref('password')
}).with('password', 'confirmPassword');

module.exports = { registerSchema };

//regular expression explanation:
// ^[a-zA-Z0-9]{3,30}$
// ^ asserts position at start of the string
// [a-zA-Z0-9] matches any alphanumeric character
// {3,30} specifies that the preceding element must occur between 3 and 30 times
// $ asserts position at end of the string