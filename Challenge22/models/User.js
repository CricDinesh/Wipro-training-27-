// This file defines the user schema and model for storing user data in MongoDB.

const mongoose = require("mongoose");

// Creating a simple schema for storing registration and login users
const userSchema = new mongoose.Schema({
    fullName: String,
    email: String,
    password: String,  // Hashed password
    role: {
        type: String,
        default: "user" // By default every registered user is a normal user
    }
});

// Exporting the model so it can be used in other files
module.exports = mongoose.model("User", userSchema);
