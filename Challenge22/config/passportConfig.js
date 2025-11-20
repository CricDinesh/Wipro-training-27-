// This file configures how Passport authenticates users using email + password.

const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/User");
const bcrypt = require("bcrypt");

module.exports = function(passport) {

    // This strategy checks if email & password match the database entry
    passport.use(new LocalStrategy(
        { usernameField: "email" }, 
        async (email, password, done) => {
            try {
                const user = await User.findOne({ email });

                if (!user) return done(null, false);

                // Compare password with hashed password
                const isMatch = await bcrypt.compare(password, user.password);
                if (!isMatch) return done(null, false);

                return done(null, user);

            } catch (err) {
                return done(err);
            }
        }
    ));

    // Save user ID in session
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    // Retrieve full user details using ID stored in session
    passport.deserializeUser(async (id, done) => {
        const user = await User.findById(id);
        done(null, user);
    });

};
