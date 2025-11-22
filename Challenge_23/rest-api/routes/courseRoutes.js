// Course Routes
// All endpoints + middleware applied here
const express = require("express");
const router = express.Router();

const {
  getCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse
} = require("../controllers/courseController");

const { courseValidationRules, validateCourse } = require("../middleware/validateCourse");
const rateLimiter = require("../middleware/rateLimiter");

// Apply rate limiter to all routes
router.use(rateLimiter);

// CRUD Routes
router.get("/", getCourses);
router.get("/:id", getCourseById);
router.post("/", courseValidationRules, validateCourse, createCourse);
router.put("/:id", courseValidationRules, validateCourse, updateCourse);
router.delete("/:id", deleteCourse);

module.exports = router;
