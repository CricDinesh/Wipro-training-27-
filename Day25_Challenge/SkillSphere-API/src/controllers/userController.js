exports.registerUser = (req, res) => {
  const { username, email } = req.body;

  if (!username || !email) {
    return res.status(400).json({
      success: false,
      message: "Missing required fields"
    });
  }

  res.status(201).json({
    success: true,
    message: "User registered",
    data: { username, email }
  });
};
