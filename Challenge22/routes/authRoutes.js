// This file contains routes for registration and login operations.

const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const passport = require("passport");

// Display registration form
router.get("/register", (req, res) => {
    res.render("register");
});

// Handle registration form submission
router.post("/register", async (req, res) => {
    const { fullName, email, password } = req.body;

    // Hashing password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Creating and saving user
    const newUser = new User({ fullName, email, password: hashedPassword });
    await newUser.save();

    console.log("User saved to DB successfully");

    // Showing success message
    res.render("success", { name: fullName });
});

// Display login form
router.get("/login", (req, res) => {
    res.render("login");
});

// Handle login form
router.post("/login",
    passport.authenticate("local", {
        successRedirect: "/admin",
        failureRedirect: "/access-denied"
    })
);

module.exports = router;
