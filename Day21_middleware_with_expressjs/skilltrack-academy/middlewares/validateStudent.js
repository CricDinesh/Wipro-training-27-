// Validation middleware for student data
function validateStudent(req, res, next) {
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({
      success: false,
      message: "Name and Email are required fields."
    });
  }

  next();
}

module.exports = validateStudent;
