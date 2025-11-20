// This is the main entry point of the application.
// It connects to MongoDB, sets up sessions, passport, views, and routes.

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const path = require("path");

// Load environment variables
dotenv.config();

// Connecting to MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB connected successfully"))
    .catch(err => console.log(err));

// Body parser to read form data
app.use(bodyParser.urlencoded({ extended: true }));

// Setting EJS as view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Configuring session for authentication
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}));

// Initialize passport
app.use(passport.initialize());
app.use(passport.session());
require("./config/passportConfig")(passport);

// Routes
app.use("/", require("./routes/authRoutes"));
app.use("/", require("./routes/adminRoutes"));

// Starting the server
app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});
