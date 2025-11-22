
// Validation Middleware Using express-validator
// Ensures that API receives valid input

const { body, validationResult } = require("express-validator");

exports.courseValidationRules = [
  body("name").notEmpty().withMessage("Course name is required"),
  body("duration").notEmpty().withMessage("Course duration is required")
];

exports.validateCourse = (req, res, next) => {
  const errors = validationResult(req);

  // If validation fails → send error response
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array()[0].msg });
  }

  next();
};
