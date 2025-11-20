// This file contains admin-only protected pages.

const express = require("express");
const router = express.Router();

// Middleware to check if user is admin
function isAdmin(req, res, next) {
    if (req.isAuthenticated() && req.user.role === "admin") {
        return next();
    }
    return res.redirect("/access-denied");
}

// Protected admin route
router.get("/admin", isAdmin, (req, res) => {
    res.render("admin", { name: req.user.fullName });
});

router.get("/access-denied", (req, res) => {
    res.render("accessDenied");
});

module.exports = router;
